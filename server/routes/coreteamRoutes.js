import express from 'express';
import * as coreteamController from '../controllers/coreteamController.js';
import { authenticateJWT, requireAdmin, requireCore, optionalAuth } from '../middlewares/auth.js';
import { 
  validateCoreTeamMember, 
  validateCoreTeamMemberUpdate, 
  validatePaginationAndSearch 
} from '../middlewares/validation.js';

const router = express.Router();

// 公開路由 - GET 請求獲取所有幹部 (可選認證，用於個人化內容)
router.get('/', optionalAuth, validatePaginationAndSearch, coreteamController.getAllMembers);

// GET 請求獲取分類選項
router.get('/options/categories', coreteamController.getCategoryOptions);

// GET 請求獲取單一幹部 (可選認證，用於個人化內容)
router.get('/:id', optionalAuth, coreteamController.getMemberById);

// 管理員路由 - POST 請求新增核心成員
router.post('/', authenticateJWT, requireAdmin, validateCoreTeamMember, coreteamController.createMember);

// 管理員路由 - PATCH 請求更新核心成員 (核心團隊成員也可以編輯)
router.patch('/:id', authenticateJWT, requireCore, validateCoreTeamMemberUpdate, coreteamController.updateMember);

// 管理員路由 - DELETE 請求刪除核心成員
router.delete('/:id', authenticateJWT, requireAdmin, coreteamController.deleteMember);

export default router;
