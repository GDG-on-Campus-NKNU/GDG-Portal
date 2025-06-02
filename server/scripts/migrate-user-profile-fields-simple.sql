-- ============================================
-- 簡化版 Users 表格新增個人資料欄位 SQL 腳本
-- 用途: 新增 bio, location, company, website 欄位
-- 注意: 如果欄位已存在會報錯，但不影響資料庫運行
-- ============================================

-- 添加個人簡介欄位
ALTER TABLE users ADD COLUMN bio TEXT NULL COMMENT '個人簡介';

-- 添加地點欄位
ALTER TABLE users ADD COLUMN location VARCHAR(255) NULL COMMENT '所在地點';

-- 添加公司欄位
ALTER TABLE users ADD COLUMN company VARCHAR(255) NULL COMMENT '公司/組織';

-- 添加網站欄位
ALTER TABLE users ADD COLUMN website VARCHAR(255) NULL COMMENT '個人網站';

-- 查看結果
DESCRIBE users;
