import express from 'express';
import * as announcementController from '../controllers/announcementController.js';
import { authenticateJWT, requireAdmin, optionalAuth } from '../middlewares/auth.js';
import { 
  validateAnnouncement, 
  validateAnnouncementUpdate, 
  validatePaginationAndSearch 
} from '../middlewares/validation.js';

const router = express.Router();

// 公開路由 - GET 請求獲取所有公告 (可選認證，用於個人化內容)
router.get('/', optionalAuth, validatePaginationAndSearch, announcementController.getAllAnnouncements);

// GET 請求獲取置頂公告
router.get('/pinned', announcementController.getPinnedAnnouncements);

// GET 請求獲取單個公告詳情 (可選認證，用於個人化內容)
router.get('/:id', optionalAuth, announcementController.getAnnouncementById);

// 管理員路由 - POST 請求新增公告
router.post('/', authenticateJWT, requireAdmin, validateAnnouncement, announcementController.createAnnouncement);

// 管理員路由 - PATCH 請求更新公告
router.patch('/:id', authenticateJWT, requireAdmin, validateAnnouncementUpdate, announcementController.updateAnnouncement);

// 管理員路由 - DELETE 請求刪除公告
router.delete('/:id', authenticateJWT, requireAdmin, announcementController.deleteAnnouncement);

export default router;
