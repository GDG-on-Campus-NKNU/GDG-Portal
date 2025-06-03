import express from 'express';
import { Op } from 'sequelize';
import Gallery from '../model/galleryModel.js';
import {
  getAllGalleries,
  getGalleryById,
  getPopularGalleries,
  getLatestGalleries,
  createGallery,
  updateGallery,
  deleteGallery,
  getAllGalleriesAdmin
} from '../controllers/galleryController.js';
import { authenticateJWT, requireAdmin, optionalAuth } from '../middlewares/auth.js';
import {
  validateGallery,
  validateGalleryUpdate,
  validatePaginationAndSearch
} from '../middlewares/validation.js';

const router = express.Router();

// 公開路由 - 獲取所有照片集 (可選認證，用於個人化內容)
router.get('/', optionalAuth, validatePaginationAndSearch, getAllGalleries);

// 獲取熱門照片集 (對應前端的 featured)
router.get('/featured', getPopularGalleries);

// 獲取最新照片集
router.get('/latest', getLatestGalleries);

// 獲取熱門照片集
router.get('/popular', getPopularGalleries);

// 獲取相簿統計資料
router.get('/stats', async (req, res) => {
  try {
    // 獲取所有精選相簿
    const galleries = await Gallery.findAll({
      where: { is_featured: true },
      attributes: ['id', 'title', 'images', 'tags', 'date_taken'],
      order: [['date_taken', 'DESC']]
    });

    // 計算總相簿數和總圖片數
    const totalGalleries = galleries.length;
    let totalImages = 0;

    // 計算總圖片數
    galleries.forEach(gallery => {
      if (gallery.images && Array.isArray(gallery.images)) {
        totalImages += gallery.images.length;
      }
    });

    // 統計年份
    const years = [...new Set(galleries.map(gallery => {
      const date = new Date(gallery.date_taken);
      return date.getFullYear().toString();
    }))].sort((a, b) => b - a);

    // 統計活動類型
    const eventTypeCounts = {};
    galleries.forEach(gallery => {
      const tags = gallery.tags || [];
      let eventType = 'other';

      if (tags.includes('workshop')) eventType = 'workshop';
      else if (tags.includes('lecture') || tags.includes('talk')) eventType = 'talk';
      else if (tags.includes('community') || tags.includes('team-building')) eventType = 'social';
      else if (tags.includes('hackathon')) eventType = 'hackathon';

      eventTypeCounts[eventType] = (eventTypeCounts[eventType] || 0) + 1;
    });

    // 格式化活動類型數據
    const eventTypeLabels = {
      workshop: '工作坊',
      talk: '技術講座',
      social: '社群聚會',
      hackathon: '黑客松',
      other: '其他'
    };

    const eventTypes = Object.entries(eventTypeCounts).map(([type, count]) => ({
      value: type,
      label: eventTypeLabels[type] || type,
      count: count
    }));

    res.status(200).json({
      totalGalleries,
      totalImages,
      eventTypes,
      years,
      recentGalleries: galleries.slice(0, 5).map(gallery => ({
        id: gallery.id,
        title: gallery.title,
        date: gallery.date_taken
      }))
    });
  } catch (error) {
    console.error('獲取統計資料錯誤:', error);
    res.status(500).json({ message: '獲取統計資料失敗', error: error.message });
  }
});

// 管理員路由 - POST 請求新增照片集
router.post('/', authenticateJWT, requireAdmin, validateGallery, createGallery);

// 管理員路由 - 獲取所有照片集（包含未發布）
router.get('/admin/all', authenticateJWT, requireAdmin, validatePaginationAndSearch, getAllGalleriesAdmin);

// 增加瀏覽次數
router.patch('/:id/view', async (req, res) => {
  try {
    const galleryId = parseInt(req.params.id);
    // 這個功能在 getGalleryById 中已經實現
    res.status(200).json({ message: '瀏覽次數已更新' });
  } catch (error) {
    res.status(500).json({ message: '更新瀏覽次數失敗', error: error.message });
  }
});

// 管理員路由 - PATCH 請求更新照片集
router.patch('/:id', authenticateJWT, requireAdmin, validateGalleryUpdate, updateGallery);

// 管理員路由 - DELETE 請求刪除照片集
router.delete('/:id', authenticateJWT, requireAdmin, deleteGallery);

// 獲取單個照片集詳情 (可選認證，用於個人化內容)
router.get('/:id', optionalAuth, getGalleryById);

export default router;
