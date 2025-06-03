import Gallery from '../model/galleryModel.js';
import { Event } from '../model/eventModel.js';
import { Op } from 'sequelize';
import sequelize from '../config/database.js'; // 添加這個import
import { transformGallery } from '../utils/dataTransform.js';
import { saveBase64Image } from '../utils/imageHandler.js';

// 獲取所有照片集
export const getAllGalleries = async (req, res) => {
  try {
    const { page = 1, limit = 12, keyword, eventType, year, tags } = req.query;
    const offset = (page - 1) * limit;

    // 基礎查詢條件 - 重新加入 featured 篩選
    let whereClause = {
      is_featured: true  // 只顯示 featured 的相簿
    };

    // 關鍵字搜尋
    if (keyword) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
        { photographer: { [Op.like]: `%${keyword}%` } }
      ];
    }

    // 年份篩選
    if (year) {
      whereClause.date_taken = {
        [Op.between]: [`${year}-01-01`, `${year}-12-31`]
      };
    }

    // 標籤篩選 - 修復這個部分
    let tagArray = [];
    if (tags) {
      tagArray = Array.isArray(tags) ? tags : [tags];
    }

    // 如果有標籤篩選，先獲取符合條件的gallery IDs
    if (tagArray.length > 0) {
      try {
        const galleryIds = await sequelize.query(
          `SELECT DISTINCT gallery_id FROM gallery_tags WHERE tag_name IN (${tagArray.map(() => '?').join(',')})`,
          {
            replacements: tagArray,
            type: sequelize.QueryTypes.SELECT
          }
        );

        const ids = galleryIds.map(row => row.gallery_id);
        if (ids.length > 0) {
          whereClause.id = { [Op.in]: ids };
        } else {
          // 如果沒有符合條件的gallery，返回空結果
          return res.json({
            galleries: [],
            totalPages: 0,
            currentPage: parseInt(page),
            totalCount: 0
          });
        }
      } catch (tagError) {
        console.error('標籤篩選錯誤:', tagError);
        // 如果標籤篩選失敗，忽略標籤條件繼續查詢
      }
    }

    // 查詢相簿
    const { count, rows: galleries } = await Gallery.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Event,
          as: 'event',
          required: false,
          attributes: ['id', 'title']
        }
      ],
      order: [['date_taken', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const transformedGalleries = galleries.map(gallery => transformGallery(gallery));

    res.json({
      galleries: transformedGalleries,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalCount: count
    });

  } catch (error) {
    console.error('獲取相簿錯誤:', error);
    res.status(500).json({ message: '獲取相簿失敗', error: error.message });
  }
};

// 獲取單個照片集詳情
export const getGalleryById = async (req, res) => {
  try {
    const galleryId = parseInt(req.params.id);

    const gallery = await Gallery.findOne({
      where: {
        id: galleryId,
        is_featured: true
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
        is_featured: true
      },
      include: [{
        model: Event,
        as: 'event',
        attributes: ['id', 'title', 'start_date']
      }],
      limit: limit,
      order: [['view_count', 'DESC'], ['date_taken', 'DESC']]
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
        is_featured: true
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
      is_featured
    } = req.body;

    // 處理 Base64 封面圖片
    let coverImagePath = cover_image_url;
    if (cover_image_url && cover_image_url.startsWith('data:image')) {
      coverImagePath = await saveBase64Image(cover_image_url, 'gallery');
      if (!coverImagePath) {
        return res.status(400).json({ message: '封面圖片處理失敗' });
      }
    }

    // 處理 Base64 圖庫圖片
    let processedImages = [];
    if (Array.isArray(image_urls) && image_urls.length > 0) {
      for (const img of image_urls) {
        if (img && img.startsWith('data:image')) {
          const imgUrl = await saveBase64Image(img, 'gallery');
          if (imgUrl) {
            processedImages.push(imgUrl);
          }
        } else {
          processedImages.push(img);
        }
      }
    }

    // 創建照片集
    const gallery = await Gallery.create({
      title,
      description,
      cover_image: coverImagePath,
      images: processedImages.length > 0 ? processedImages : (Array.isArray(image_urls) ? image_urls : []),
      photographer,
      date_taken: photo_date ? new Date(photo_date) : new Date(),
      event_id: event_id ? parseInt(event_id) : null,
      is_featured: is_featured !== undefined ? is_featured : true,
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
      is_featured
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

    // 處理 Base64 封面圖片
    if (cover_image_url !== undefined) {
      let coverImagePath = cover_image_url;
      if (cover_image_url && cover_image_url.startsWith('data:image')) {
        coverImagePath = await saveBase64Image(cover_image_url, 'gallery');
        if (!coverImagePath) {
          return res.status(400).json({ message: '封面圖片處理失敗' });
        }
      }
      updateData.cover_image = coverImagePath;
    }

    // 處理 Base64 圖庫圖片
    if (image_urls !== undefined) {
      let processedImages = [];
      if (Array.isArray(image_urls) && image_urls.length > 0) {
        for (const img of image_urls) {
          if (img && img.startsWith('data:image')) {
            const imgUrl = await saveBase64Image(img, 'gallery');
            if (imgUrl) {
              processedImages.push(imgUrl);
            }
          } else {
            processedImages.push(img);
          }
        }
        updateData.images = processedImages;
      } else {
        updateData.images = [];
      }
    }

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (photographer !== undefined) updateData.photographer = photographer;
    if (photo_date !== undefined) updateData.date_taken = new Date(photo_date);
    if (event_id !== undefined) updateData.event_id = event_id ? parseInt(event_id) : null;
    if (is_featured !== undefined) updateData.is_featured = is_featured;

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
      whereClause.is_featured = true;
    } else if (queryParams.isPublished === 'false') {
      whereClause.is_featured = false;
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
      order: [['date_taken', 'DESC']],
      distinct: true
    });

    const result = {
      galleries: rows.map(gallery => transformGallery(gallery)),
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
