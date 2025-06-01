import Gallery from '../model/galleryModel.js';
import { Event } from '../model/eventModel.js';
import { Op } from 'sequelize';

// 獲取所有照片集
export const getAllGalleries = async (req, res) => {
  try {
    const queryParams = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 12,
      keyword: req.query.keyword || '',
      eventId: req.query.eventId
    };

    // 構建查詢條件
    const whereClause = {
      is_published: true
    };

    // 關鍵字搜尋
    if (queryParams.keyword) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${queryParams.keyword}%` } },
        { description: { [Op.like]: `%${queryParams.keyword}%` } },
        { photographer: { [Op.like]: `%${queryParams.keyword}%` } }
      ];
    }

    // 特定活動篩選
    if (queryParams.eventId) {
      whereClause.event_id = parseInt(queryParams.eventId);
    }

    // 計算偏移量
    const offset = (queryParams.page - 1) * queryParams.limit;

    // 執行查詢
    const { count, rows } = await Gallery.findAndCountAll({
      where: whereClause,
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'date']
      }],
      limit: queryParams.limit,
      offset: offset,
      order: [['photo_date', 'DESC']],
      distinct: true
    });

    const result = {
      galleries: rows,
      totalCount: count,
      totalPages: Math.ceil(count / queryParams.limit),
      currentPage: queryParams.page,
      hasNext: queryParams.page * queryParams.limit < count,
      hasPrevious: queryParams.page > 1
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Error in getAllGalleries:', error);
    res.status(500).json({ message: '獲取照片集失敗', error: error.message });
  }
};

// 獲取單個照片集詳情
export const getGalleryById = async (req, res) => {
  try {
    const galleryId = parseInt(req.params.id);
    
    const gallery = await Gallery.findOne({
      where: {
        id: galleryId,
        is_published: true
      },
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'date', 'location']
      }]
    });

    if (!gallery) {
      return res.status(404).json({ message: '找不到該照片集' });
    }

    // 增加瀏覽次數
    await gallery.increment('view_count');

    res.status(200).json(gallery);
  } catch (error) {
    console.error('Error in getGalleryById:', error);
    res.status(500).json({ message: '獲取照片集詳情失敗', error: error.message });
  }
};

// 獲取熱門照片集
export const getPopularGalleries = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const galleries = await Gallery.findAll({
      where: {
        is_published: true
      },
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'date']
      }],
      limit: limit,
      order: [['view_count', 'DESC'], ['photo_date', 'DESC']]
    });

    res.status(200).json({ galleries });
  } catch (error) {
    console.error('Error in getPopularGalleries:', error);
    res.status(500).json({ message: '獲取熱門照片集失敗', error: error.message });
  }
};

// 獲取最新照片集
export const getLatestGalleries = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const galleries = await Gallery.findAll({
      where: {
        is_published: true
      },
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'date']
      }],
      limit: limit,
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({ galleries });
  } catch (error) {
    console.error('Error in getLatestGalleries:', error);
    res.status(500).json({ message: '獲取最新照片集失敗', error: error.message });
  }
};
