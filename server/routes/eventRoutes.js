import express from 'express';
import * as eventController from '../controllers/eventController.js';

const router = express.Router();

// GET 請求獲取所有活動
router.get('/', eventController.getAllEvents);

// GET 請求獲取特定日期範圍內的活動
router.get('/range/date', eventController.getEventsByDateRange);

// GET 請求獲取單個活動詳情
router.get('/:id', eventController.getEventById);

export default router;
