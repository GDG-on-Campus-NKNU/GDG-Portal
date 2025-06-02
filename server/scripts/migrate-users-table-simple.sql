-- ============================================
-- 簡化版 Users 表格認證欄位更新 SQL 腳本
-- 用途: 新增認證相關欄位
-- 注意: 如果欄位已存在會報錯，但不影響資料庫運行
-- ============================================

-- 新增密碼欄位
ALTER TABLE users ADD COLUMN password VARCHAR(255) NULL COMMENT '使用者密碼 (加密後)';

-- 新增電子郵件驗證狀態欄位
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE COMMENT '電子郵件是否已驗證';

-- 新增刷新令牌欄位
ALTER TABLE users ADD COLUMN refresh_token TEXT NULL COMMENT '刷新令牌';

-- 新增最後登入時間欄位
ALTER TABLE users ADD COLUMN last_login DATETIME NULL COMMENT '最後登入時間';

-- 查看結果
DESCRIBE users;
