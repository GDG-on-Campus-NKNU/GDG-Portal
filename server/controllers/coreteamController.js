import { CoreTeam, Category, CoreTeamCategory } from '../model/coreteamModel.js';
import { Op } from 'sequelize';

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
      through: { attributes: [] }
    }];

    // 關鍵字搜尋
    if (queryParams.keyword) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${queryParams.keyword}%` } },
        { title: { [Op.like]: `%${queryParams.keyword}%` } },
        { bio: { [Op.like]: `%${queryParams.keyword}%` } }
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
      order: [['position', 'ASC'], ['name', 'ASC']],
      distinct: true
    });

    const result = {
      members: rows,
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
        through: { attributes: [] }
      }]
    });

    if (!member) {
      return res.status(404).json({ message: '找不到該幹部' });
    }

    res.status(200).json(member);
  } catch (error) {
    console.error('Error in getMemberById:', error);
    res.status(500).json({ message: '獲取幹部資料失敗', error: error.message });
  }
};

// 獲取分類選項
export const getCategoryOptions = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']]
    });
    
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error in getCategoryOptions:', error);
    res.status(500).json({ message: '獲取分類選項失敗', error: error.message });
  }
};
