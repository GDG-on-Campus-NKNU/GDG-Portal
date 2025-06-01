import express from 'express';
import {
  getAllGalleries,
  getGalleryById,
  getPopularGalleries,
  getLatestGalleries
} from '../controllers/galleryController.js';

const router = express.Router();

// 獲取所有照片集
router.get('/', getAllGalleries);

// 獲取熱門照片集
router.get('/popular', getPopularGalleries);

// 獲取最新照片集
router.get('/latest', getLatestGalleries);

// 獲取單個照片集詳情
router.get('/:id', getGalleryById);

export default router;
