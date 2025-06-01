import { Announcement, AnnouncementTag } from '../model/announcementModel.js';
import { Op } from 'sequelize';

// 獲取所有公告
export const getAllAnnouncements = async (req, res) => {
  try {
    const queryParams = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      keyword: req.query.keyword || '',
      tags: req.query.tags ? req.query.tags.split(',') : [],
      isPinned: req.query.isPinned
    };

    // 構建查詢條件
    const whereClause = {};
    const includeClause = [{
      model: AnnouncementTag,
      as: 'tags'
    }];

    // 關鍵字搜尋
    if (queryParams.keyword) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${queryParams.keyword}%` } },
        { content: { [Op.like]: `%${queryParams.keyword}%` } }
      ];
    }

    // 置頂篩選
    if (queryParams.isPinned === 'true') {
      whereClause.is_pinned = true;
    } else if (queryParams.isPinned === 'false') {
      whereClause.is_pinned = false;
    }

    // 標籤篩選
    if (queryParams.tags.length > 0) {
      includeClause[0].where = {
        name: { [Op.in]: queryParams.tags }
      };
    }

    // 計算偏移量
    const offset = (queryParams.page - 1) * queryParams.limit;

    // 執行查詢
    const { count, rows } = await Announcement.findAndCountAll({
      where: whereClause,
      include: includeClause,
      limit: queryParams.limit,
      offset: offset,
      order: [
        ['is_pinned', 'DESC'],
        ['created_at', 'DESC']
      ],
      distinct: true
    });

    const result = {
      announcements: rows,
      totalCount: count,
      totalPages: Math.ceil(count / queryParams.limit),
      currentPage: queryParams.page,
      hasNext: queryParams.page * queryParams.limit < count,
      hasPrevious: queryParams.page > 1
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getAllAnnouncements:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 獲取置頂公告
export const getPinnedAnnouncements = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const announcements = await Announcement.findAll({
      where: {
        is_pinned: true
      },
      include: [{
        model: AnnouncementTag,
        as: 'tags'
      }],
      limit: limit,
      order: [['created_at', 'DESC']]
    });

    const result = {
      announcements,
      totalCount: announcements.length,
      totalPages: 1,
      currentPage: 1,
      hasNext: false,
      hasPrevious: false
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getPinnedAnnouncements:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};

// 獲取單個公告
export const getAnnouncementById = async (req, res) => {
  try {
    const announcementId = parseInt(req.params.id);
    
    const announcement = await Announcement.findByPk(announcementId, {
      include: [{
        model: AnnouncementTag,
        as: 'tags'
      }]
    });

    if (!announcement) {
      return res.status(404).json({ message: '找不到此公告' });
    }

    res.status(200).json(announcement);
  } catch (error) {
    console.error('Error in getAnnouncementById:', error);
    res.status(500).json({ message: '發生錯誤', error: error.message });
  }
};
