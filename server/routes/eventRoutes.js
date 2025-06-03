import express from 'express';
import * as eventController from '../controllers/eventController.js';
import { authenticateJWT, requireAdmin, optionalAuth } from '../middlewares/auth.js';
import { 
  validateEvent, 
  validateEventUpdate, 
  validatePaginationAndSearch 
} from '../middlewares/validation.js';

const router = express.Router();

// 公開路由 - GET 請求獲取所有活動 (可選認證，用於個人化內容)
router.get('/', optionalAuth, validatePaginationAndSearch, eventController.getAllEvents);

// GET 請求獲取特定日期範圍內的活動
router.get('/range/date', optionalAuth, eventController.getEventsByDateRange);

// 獲取歷史活動
router.get('/historical', optionalAuth, validatePaginationAndSearch, eventController.getHistoricalEvents);

// 獲取活動標籤
router.get('/tags', eventController.getEventTags);

// 管理員路由 - 新增活動
router.post('/', authenticateJWT, requireAdmin, validateEvent, eventController.createEvent);

// GET 請求獲取單個活動詳情 (可選認證，用於個人化內容)
router.get('/:id', optionalAuth, eventController.getEventById);

// 管理員路由 - 更新活動
router.patch('/:id', authenticateJWT, requireAdmin, validateEventUpdate, eventController.updateEvent);

// 管理員路由 - 刪除活動
router.delete('/:id', authenticateJWT, requireAdmin, eventController.deleteEvent);

export default router;
