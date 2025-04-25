import express from 'express';
import * as coreteamController from '../controllers/coreteamController.js';

const router = express.Router();

// GET 請求獲取所有幹部
router.get('/', coreteamController.getAllMembers);

// GET 請求獲取分類選項
router.get('/options/categories', coreteamController.getCategoryOptions);

// GET 請求獲取單一幹部
router.get('/:id', coreteamController.getMemberById);

export default router;
