import express from 'express';
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
    // TODO: 實現統計邏輯
    res.status(200).json({
      totalGalleries: 0,
      totalImages: 0,
      eventTypes: [],
      years: []
    });
  } catch (error) {
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
