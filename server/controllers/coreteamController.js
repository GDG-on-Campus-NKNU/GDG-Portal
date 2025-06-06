import { CoreTeam, Category, CoreTeamCategory } from '../model/coreteamModel.js';
import { User } from '../model/index.js'; // 導入 User 模型以建立關聯
import { Op } from 'sequelize';
import { transformCoreTeamMember } from '../utils/dataTransform.js';
import { saveBase64Image } from '../utils/imageHandler.js';

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
    const includeClause = [
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] }
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'avatar_url'], // 只選擇需要的欄位
        required: false // LEFT JOIN，允許沒有關聯使用者的 CoreTeam 成員
      }
    ];

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
      include: [
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] }
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar_url'],
          required: false
        }
      ]
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
    const { 
      user_id, 
      name, 
      title, 
      photo, 
      department, 
      year, 
      skills, 
      description, 
      full_bio, 
      achievements, 
      contact_email, 
      social_links, 
      additional_photos, 
      sort_order, 
      categories 
    } = req.body;

    // 如果指定了 user_id，檢查該使用者是否存在
    if (user_id) {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({ message: '指定的使用者不存在' });
      }
      
      // 檢查該使用者是否已經有 CoreTeam 記錄
      const existingMember = await CoreTeam.findOne({ where: { user_id } });
      if (existingMember) {
        return res.status(400).json({ message: '該使用者已經是核心團隊成員' });
      }
    }

    // 處理 Base64 圖片
    let photoUrl = photo;
    if (photo && photo.startsWith('data:image')) {
      photoUrl = await saveBase64Image(photo, 'coreteam');
      if (!photoUrl) {
        return res.status(400).json({ message: '圖片處理失敗' });
      }
    }

    // 處理額外圖片的 Base64
    let processedAdditionalPhotos = additional_photos || [];
    if (additional_photos && Array.isArray(additional_photos)) {
      const processedPhotos = [];
      for (const img of additional_photos) {
        if (img && img.startsWith('data:image')) {
          const imgUrl = await saveBase64Image(img, 'coreteam');
          if (imgUrl) {
            processedPhotos.push(imgUrl);
          }
        } else {
          processedPhotos.push(img);
        }
      }
      processedAdditionalPhotos = processedPhotos;
    }
    
    // 創建幹部
    const member = await CoreTeam.create({
      user_id: user_id || null,
      name,
      title,
      photo: photoUrl,
      department,
      year,
      skills: skills || [],
      description,
      full_bio,
      achievements: achievements || [],
      contact_email,
      social_links: social_links || {},
      additional_photos: processedAdditionalPhotos,
      sort_order: sort_order || 0
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

    // 獲取完整的幹部資料（包含分類和使用者資料）
    const createdMember = await CoreTeam.findByPk(member.id, {
      include: [
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] }
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar_url'],
          required: false
        }
      ]
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
    const { 
      user_id, 
      name, 
      title, 
      photo, 
      department, 
      year, 
      skills, 
      description, 
      full_bio, 
      achievements, 
      contact_email, 
      social_links, 
      additional_photos, 
      sort_order, 
      categories 
    } = req.body;

    // 查找幹部
    const member = await CoreTeam.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ message: '找不到該幹部' });
    }

    // 如果要更新 user_id，檢查該使用者是否存在且未被其他 CoreTeam 使用
    if (user_id !== undefined) {
      if (user_id !== null) {
        const user = await User.findByPk(user_id);
        if (!user) {
          return res.status(400).json({ message: '指定的使用者不存在' });
        }
        
        // 檢查該使用者是否已經被其他 CoreTeam 成員使用
        const existingMember = await CoreTeam.findOne({ 
          where: { 
            user_id,
            id: { [Op.ne]: memberId } // 排除當前成員
          } 
        });
        if (existingMember) {
          return res.status(400).json({ message: '該使用者已經是其他核心團隊成員' });
        }
      }
    }

    // 更新幹部基本資料
    const updateData = {};

    // 處理 Base64 圖片
    let photoUrl = photo;
    if (photo !== undefined && photo && photo.startsWith('data:image')) {
      photoUrl = await saveBase64Image(photo, 'coreteam');
      if (!photoUrl) {
        return res.status(400).json({ message: '圖片處理失敗' });
      }
    }

    // 處理額外圖片的 Base64
    let processedAdditionalPhotos = additional_photos;
    if (additional_photos !== undefined && Array.isArray(additional_photos)) {
      const processedPhotos = [];
      for (const img of additional_photos) {
        if (img && img.startsWith('data:image')) {
          const imgUrl = await saveBase64Image(img, 'coreteam');
          if (imgUrl) {
            processedPhotos.push(imgUrl);
          }
        } else {
          processedPhotos.push(img);
        }
      }
      processedAdditionalPhotos = processedPhotos;
    }

    if (user_id !== undefined) updateData.user_id = user_id;
    if (name !== undefined) updateData.name = name;
    if (title !== undefined) updateData.title = title;
    if (photo !== undefined) updateData.photo = photoUrl;
    if (department !== undefined) updateData.department = department;
    if (year !== undefined) updateData.year = year;
    if (skills !== undefined) updateData.skills = skills;
    if (description !== undefined) updateData.description = description;
    if (full_bio !== undefined) updateData.full_bio = full_bio;
    if (achievements !== undefined) updateData.achievements = achievements;
    if (contact_email !== undefined) updateData.contact_email = contact_email;
    if (social_links !== undefined) updateData.social_links = social_links;
    if (additional_photos !== undefined) updateData.additional_photos = processedAdditionalPhotos;
    if (sort_order !== undefined) updateData.sort_order = sort_order;

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
      include: [
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] }
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'avatar_url'],
          required: false
        }
      ]
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
