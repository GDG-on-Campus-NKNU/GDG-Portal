import Gallery from '../model/galleryModel.js';
import { Event } from '../model/eventModel.js';
import { Op } from 'sequelize';
import { transformGallery } from '../utils/dataTransform.js';

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
        attributes: ['id', 'title', 'start_date']
      }],
      limit: queryParams.limit,
      offset: offset,
      order: [['photo_date', 'DESC']],
      distinct: true
    });

    // 轉換資料格式
    const transformedGalleries = rows.map(gallery => transformGallery(gallery));

    const result = {
      galleries: transformedGalleries,
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
        attributes: ['id', 'title', 'start_date', 'location']
      }]
    });

    if (!gallery) {
      return res.status(404).json({ message: '找不到該照片集' });
    }

    // 增加瀏覽次數
    await gallery.increment('view_count');

    // 轉換資料格式
    const transformedGallery = transformGallery(gallery);

    res.status(200).json(transformedGallery);
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
        attributes: ['id', 'title', 'start_date']
      }],
      limit: limit,
      order: [['view_count', 'DESC'], ['photo_date', 'DESC']]
    });

    // 轉換資料格式
    const transformedGalleries = galleries.map(gallery => transformGallery(gallery));

    res.status(200).json({ galleries: transformedGalleries });
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
        attributes: ['id', 'title', 'start_date']
      }],
      limit: limit,
      order: [['created_at', 'DESC']]
    });

    // 轉換資料格式
    const transformedGalleries = galleries.map(gallery => transformGallery(gallery));

    res.status(200).json({ galleries: transformedGalleries });
  } catch (error) {
    console.error('Error in getLatestGalleries:', error);
    res.status(500).json({ message: '獲取最新照片集失敗', error: error.message });
  }
};

// 創建新照片集
export const createGallery = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      cover_image_url, 
      image_urls, 
      photographer, 
      photo_date,
      event_id,
      is_published 
    } = req.body;

    // 創建照片集
    const gallery = await Gallery.create({
      title,
      description,
      cover_image: cover_image_url,
      photos: Array.isArray(image_urls) ? image_urls : [],
      photographer,
      photo_date: photo_date ? new Date(photo_date) : new Date(),
      event_id: event_id ? parseInt(event_id) : null,
      is_published: is_published !== undefined ? is_published : true,
      view_count: 0,
      created_by: req.user.id, // 從認證中間件獲取用戶 ID
      created_at: new Date(),
      updated_at: new Date()
    });

    // 獲取完整的照片集資料（包含關聯的活動）
    const createdGallery = await Gallery.findByPk(gallery.id, {
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'start_date', 'location']
      }]
    });

    // 轉換資料格式
    const transformedGallery = transformGallery(createdGallery);

    res.status(201).json({
      message: '照片集創建成功',
      gallery: transformedGallery
    });
  } catch (error) {
    console.error('Error in createGallery:', error);
    res.status(500).json({ message: '創建照片集失敗', error: error.message });
  }
};

// 更新照片集
export const updateGallery = async (req, res) => {
  try {
    const galleryId = parseInt(req.params.id);
    const { 
      title, 
      description, 
      cover_image_url, 
      image_urls, 
      photographer, 
      photo_date,
      event_id,
      is_published 
    } = req.body;

    // 查找照片集
    const gallery = await Gallery.findByPk(galleryId);
    if (!gallery) {
      return res.status(404).json({ message: '找不到該照片集' });
    }

    // 更新照片集資料
    const updateData = {
      updated_at: new Date()
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (cover_image_url !== undefined) updateData.cover_image = cover_image_url;
    if (image_urls !== undefined) updateData.photos = Array.isArray(image_urls) ? image_urls : [];
    if (photographer !== undefined) updateData.photographer = photographer;
    if (photo_date !== undefined) updateData.photo_date = new Date(photo_date);
    if (event_id !== undefined) updateData.event_id = event_id ? parseInt(event_id) : null;
    if (is_published !== undefined) updateData.is_published = is_published;

    await gallery.update(updateData);

    // 獲取更新後的完整資料
    const updatedGallery = await Gallery.findByPk(galleryId, {
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'start_date', 'location']
      }]
    });

    // 轉換資料格式
    const transformedGallery = transformGallery(updatedGallery);

    res.status(200).json({
      message: '照片集更新成功',
      gallery: transformedGallery
    });
  } catch (error) {
    console.error('Error in updateGallery:', error);
    res.status(500).json({ message: '更新照片集失敗', error: error.message });
  }
};

// 刪除照片集
export const deleteGallery = async (req, res) => {
  try {
    const galleryId = parseInt(req.params.id);

    // 查找照片集
    const gallery = await Gallery.findByPk(galleryId);
    if (!gallery) {
      return res.status(404).json({ message: '找不到該照片集' });
    }

    // 刪除照片集
    await gallery.destroy();

    res.status(200).json({ message: '照片集刪除成功' });
  } catch (error) {
    console.error('Error in deleteGallery:', error);
    res.status(500).json({ message: '刪除照片集失敗', error: error.message });
  }
};

// 獲取所有照片集（包含未發布的，管理員用）
export const getAllGalleriesAdmin = async (req, res) => {
  try {
    const queryParams = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 12,
      keyword: req.query.keyword || '',
      eventId: req.query.eventId,
      isPublished: req.query.isPublished
    };

    // 構建查詢條件
    const whereClause = {};

    // 關鍵字搜尋
    if (queryParams.keyword) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${queryParams.keyword}%` } },
        { description: { [Op.like]: `%${queryParams.keyword}%` } },
        { photographer: { [Op.like]: `%${queryParams.keyword}%` } }
      ];
    }

    // 發布狀態篩選
    if (queryParams.isPublished === 'true') {
      whereClause.is_published = true;
    } else if (queryParams.isPublished === 'false') {
      whereClause.is_published = false;
    }

    // 計算偏移量
    const offset = (queryParams.page - 1) * queryParams.limit;

    // 執行查詢
    const { count, rows } = await Gallery.findAndCountAll({
      where: whereClause,
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'start_date']
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
    console.error('Error in getAllGalleriesAdmin:', error);
    res.status(500).json({ message: '獲取照片集失敗', error: error.message });
  }
};
