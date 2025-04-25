import express from 'express';
import * as announcementController from '../controllers/announcementController.js';

const router = express.Router();

// GET 請求獲取所有公告
router.get('/', announcementController.getAllAnnouncements);

// GET 請求獲取置頂公告
router.get('/pinned', announcementController.getPinnedAnnouncements);

// GET 請求獲取單個公告詳情
router.get('/:id', announcementController.getAnnouncementById);

export default router;
