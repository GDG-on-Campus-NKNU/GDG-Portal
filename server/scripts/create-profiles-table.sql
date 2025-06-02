-- ============================================
-- 創建 Profiles 表格 SQL 腳本
-- 用途: 建立使用者個人資料表，與 users 表 1:1 關聯
-- ============================================

-- 創建 profiles 表
CREATE TABLE IF NOT EXISTS profiles (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主鍵',
    user_id INT UNIQUE NOT NULL COMMENT '使用者ID (外鍵)',
    bio TEXT NULL COMMENT '個人簡介',
    location VARCHAR(255) NULL COMMENT '所在地點',
    company VARCHAR(255) NULL COMMENT '公司/組織',
    website VARCHAR(255) NULL COMMENT '個人網站',
    phone VARCHAR(20) NULL COMMENT '聯絡電話',
    linkedin_url VARCHAR(255) NULL COMMENT 'LinkedIn 連結',
    github_url VARCHAR(255) NULL COMMENT 'GitHub 連結',
    twitter_url VARCHAR(255) NULL COMMENT 'Twitter 連結',
    skills JSON NULL COMMENT '技能標籤',
    interests JSON NULL COMMENT '興趣領域',
    education JSON NULL COMMENT '教育背景',
    experience JSON NULL COMMENT '工作經驗',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '建立時間',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新時間',
    
    -- 外鍵約束
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    -- 索引
    INDEX idx_user_id (user_id)
) COMMENT='使用者個人資料表';

-- 查看建立的表結構
DESCRIBE profiles;
