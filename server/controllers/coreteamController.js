import { CoreTeam, Category, CoreTeamCategory } from '../model/coreteamModel.js';
import { Op } from 'sequelize';
import { transformCoreTeamMember } from '../utils/dataTransform.js';

// 獲取所有幹部
export const getAllMembers = async (req, res) => {
  try {
    const queryParams = {
      keyword: req.query.keyword || '',
      categories: req.query.categories ? req.query.categories.split(',') : [],
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10
    };

    // 構建查詢條件
    const whereClause = {};
    const includeClause = [{
      model: Category,
      as: 'categories',
      through: { attributes: [] }
    }];

    // 關鍵字搜尋
    if (queryParams.keyword) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${queryParams.keyword}%` } },
        { title: { [Op.like]: `%${queryParams.keyword}%` } },
        { description: { [Op.like]: `%${queryParams.keyword}%` } },
        { full_bio: { [Op.like]: `%${queryParams.keyword}%` } }
      ];
    }

    // 分類篩選
    if (queryParams.categories.length > 0) {
      includeClause[0].where = {
        name: { [Op.in]: queryParams.categories }
      };
    }

    // 計算偏移量
    const offset = (queryParams.page - 1) * queryParams.limit;

    // 執行查詢
    const { count, rows } = await CoreTeam.findAndCountAll({
      where: whereClause,
      include: includeClause,
      limit: queryParams.limit,
      offset: offset,
      order: [['sort_order', 'ASC'], ['name', 'ASC']],
      distinct: true
    });

    // 轉換資料格式
    const transformedMembers = rows.map(member => transformCoreTeamMember(member));

    const result = {
      members: transformedMembers,
      totalCount: count,
      totalPages: Math.ceil(count / queryParams.limit),
      currentPage: queryParams.page,
      hasNext: queryParams.page * queryParams.limit < count,
      hasPrevious: queryParams.page > 1
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getAllMembers:', error);
    res.status(500).json({ message: '獲取幹部資料失敗', error: error.message });
  }
};

// 獲取單一幹部
export const getMemberById = async (req, res) => {
  try {
    const memberId = parseInt(req.params.id);
    
    const member = await CoreTeam.findByPk(memberId, {
      include: [{
        model: Category,
        as: 'categories',
        through: { attributes: [] }
      }]
    });

    if (!member) {
      return res.status(404).json({ message: '找不到該幹部' });
    }

    // 轉換資料格式
    const transformedMember = transformCoreTeamMember(member);

    res.status(200).json(transformedMember);
  } catch (error) {
    console.error('Error in getMemberById:', error);
    res.status(500).json({ message: '獲取幹部資料失敗', error: error.message });
  }
};

// 獲取分類選項
export const getCategoryOptions = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { type: 'member', is_active: true },
      order: [['name', 'ASC']]
    });
    
    // 轉換為前端需要的格式 { label, value }
    const categoryMap = {
      'core': '核心幹部',
      'tech': '技術教學',
      'pr': '公關行銷',
      'design': '美術設計',
      'affairs': '總務攝影'
    };
    
    const formattedCategories = categories.map(cat => ({
      label: categoryMap[cat.name] || cat.name,
      value: cat.name
    }));
    
    res.status(200).json({ categories: formattedCategories });
  } catch (error) {
    console.error('Error in getCategoryOptions:', error);
    res.status(500).json({ message: '獲取分類選項失敗', error: error.message });
  }
};

// 創建新幹部
export const createMember = async (req, res) => {
  try {
    const { name, title, bio, avatar_url, linkedin_url, github_url, position, categories } = req.body;

    // 創建幹部
    const member = await CoreTeam.create({
      name,
      title,
      bio,
      avatar_url,
      linkedin_url,
      github_url,
      position: position || 0,
      created_at: new Date(),
      updated_at: new Date()
    });

    // 如果有分類，處理分類關聯
    if (categories && Array.isArray(categories) && categories.length > 0) {
      // 查找分類
      const categoryInstances = await Category.findAll({
        where: { 
          id: { [Op.in]: categories.map(id => parseInt(id)) }
        }
      });

      // 建立關聯
      await member.setCategories(categoryInstances);
    }

    // 獲取完整的幹部資料（包含分類）
    const createdMember = await CoreTeam.findByPk(member.id, {
      include: [{
        model: Category,
        as: 'categories',
        through: { attributes: [] }
      }]
    });

    // 轉換資料格式
    const transformedMember = transformCoreTeamMember(createdMember);

    res.status(201).json({
      message: '幹部創建成功',
      member: transformedMember
    });
  } catch (error) {
    console.error('Error in createMember:', error);
    res.status(500).json({ message: '創建幹部失敗', error: error.message });
  }
};

// 更新幹部
export const updateMember = async (req, res) => {
  try {
    const memberId = parseInt(req.params.id);
    const { name, title, bio, avatar_url, linkedin_url, github_url, position, categories } = req.body;

    // 查找幹部
    const member = await CoreTeam.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ message: '找不到該幹部' });
    }

    // 更新幹部基本資料
    const updateData = {
      updated_at: new Date()
    };

    if (name !== undefined) updateData.name = name;
    if (title !== undefined) updateData.title = title;
    if (bio !== undefined) updateData.bio = bio;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url;
    if (linkedin_url !== undefined) updateData.linkedin_url = linkedin_url;
    if (github_url !== undefined) updateData.github_url = github_url;
    if (position !== undefined) updateData.position = position;

    await member.update(updateData);

    // 如果有分類更新，處理分類關聯
    if (categories !== undefined && Array.isArray(categories)) {
      if (categories.length === 0) {
        // 移除所有分類
        await member.setCategories([]);
      } else {
        // 查找分類
        const categoryInstances = await Category.findAll({
          where: { 
            id: { [Op.in]: categories.map(id => parseInt(id)) }
          }
        });

        // 更新關聯
        await member.setCategories(categoryInstances);
      }
    }

    // 獲取更新後的完整資料
    const updatedMember = await CoreTeam.findByPk(memberId, {
      include: [{
        model: Category,
        as: 'categories',
        through: { attributes: [] }
      }]
    });

    // 轉換資料格式
    const transformedMember = transformCoreTeamMember(updatedMember);

    res.status(200).json({
      message: '幹部更新成功',
      member: transformedMember
    });
  } catch (error) {
    console.error('Error in updateMember:', error);
    res.status(500).json({ message: '更新幹部失敗', error: error.message });
  }
};

// 刪除幹部
export const deleteMember = async (req, res) => {
  try {
    const memberId = parseInt(req.params.id);

    // 查找幹部
    const member = await CoreTeam.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ message: '找不到該幹部' });
    }

    // 移除分類關聯
    await member.setCategories([]);

    // 刪除幹部
    await member.destroy();

    res.status(200).json({ message: '幹部刪除成功' });
  } catch (error) {
    console.error('Error in deleteMember:', error);
    res.status(500).json({ message: '刪除幹部失敗', error: error.message });
  }
};
