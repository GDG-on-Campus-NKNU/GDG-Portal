-- ============================================
-- 更新 Users 表結構 - 密碼改為必填 SQL 腳本
-- 用途: 修改 users 表的 password 欄位為 NOT NULL
-- ============================================

-- 檢查目前的表結構
DESCRIBE users;

-- 開始事務
START TRANSACTION;

-- 首先為沒有密碼的使用者設定一個臨時密碼
-- 注意：這個密碼需要是 bcrypt 加密的格式
-- 這裡使用的是 "temppassword123" 的 bcrypt hash
UPDATE users 
SET password = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/hS3Kw3uIy'
WHERE password IS NULL OR password = '';

-- 修改 password 欄位為 NOT NULL
ALTER TABLE users 
MODIFY COLUMN password VARCHAR(255) NOT NULL 
COMMENT '使用者密碼 (bcrypt 加密)';

-- 提交事務
COMMIT;

-- 驗證修改結果
DESCRIBE users;

-- 檢查所有使用者都有密碼
SELECT 
    id,
    email,
    name,
    CASE 
        WHEN password IS NULL THEN '無密碼'
        WHEN password = '' THEN '空密碼'
        ELSE '有密碼'
    END as password_status,
    google_id,
    role
FROM users
ORDER BY id;
