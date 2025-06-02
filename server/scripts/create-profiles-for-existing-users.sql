-- ============================================
-- 為現有使用者建立 Profile 資料 SQL 腳本
-- 用途: 為已存在的使用者建立對應的 profile 記錄
-- ============================================

-- 開始事務
START TRANSACTION;

-- 為現有的管理員使用者建立 profile
INSERT IGNORE INTO profiles (
    user_id, 
    bio, 
    location, 
    company, 
    website, 
    phone, 
    linkedin_url, 
    github_url, 
    twitter_url, 
    skills, 
    interests, 
    created_at, 
    updated_at
) 
SELECT 
    u.id as user_id,
    'GDG NKNU 社群管理員，致力於推廣 Google 技術與促進校園技術交流。' as bio,
    '高雄市, 台灣' as location,
    'GDG on Campus NKNU' as company,
    'https://gdg.nknu.edu.tw' as website,
    '+886-7-123-4567' as phone,
    'https://linkedin.com/in/gdg-nknu-admin' as linkedin_url,
    'https://github.com/gdg-nknu' as github_url,
    'https://twitter.com/gdg_nknu' as twitter_url,
    '["Community Management", "Google Technologies", "Event Organization", "Technical Leadership", "Student Mentoring"]' as skills,
    '["Web Development", "Cloud Computing", "AI/ML", "Mobile Development", "Open Source"]' as interests,
    NOW() as created_at,
    NOW() as updated_at
FROM users u 
WHERE u.email = 'admin@gdg.nknu.edu.tw' 
AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.user_id = u.id);

-- 為測試使用者建立 profile
INSERT IGNORE INTO profiles (
    user_id, 
    bio, 
    location, 
    company, 
    website, 
    phone, 
    linkedin_url, 
    github_url, 
    twitter_url, 
    skills, 
    interests, 
    created_at, 
    updated_at
) 
SELECT 
    u.id as user_id,
    '測試帳號使用者，對程式開發和技術學習充滿熱忱的學生。' as bio,
    '高雄市, 台灣' as location,
    '國立高雄師範大學' as company,
    'https://github.com/testuser' as website,
    '+886-912-345-678' as phone,
    'https://linkedin.com/in/test-user' as linkedin_url,
    'https://github.com/testuser' as github_url,
    'https://twitter.com/test_user' as twitter_url,
    '["JavaScript", "Python", "React", "Node.js", "Database Design"]' as skills,
    '["Frontend Development", "Backend Development", "Mobile Apps", "Game Development"]' as interests,
    NOW() as created_at,
    NOW() as updated_at
FROM users u 
WHERE u.email = 'test@gdg.nknu.edu.tw' 
AND NOT EXISTS (SELECT 1 FROM profiles p WHERE p.user_id = u.id);

-- 為所有沒有 profile 的使用者建立預設 profile
INSERT IGNORE INTO profiles (
    user_id, 
    bio, 
    location, 
    company, 
    skills, 
    interests, 
    created_at, 
    updated_at
) 
SELECT 
    u.id as user_id,
    CONCAT('GDG NKNU 社群成員，角色：', u.role) as bio,
    '高雄市, 台灣' as location,
    '國立高雄師範大學' as company,
    '["Web Development", "Programming"]' as skills,
    '["Technology", "Learning", "Community"]' as interests,
    NOW() as created_at,
    NOW() as updated_at
FROM users u 
WHERE NOT EXISTS (SELECT 1 FROM profiles p WHERE p.user_id = u.id);

-- 提交事務
COMMIT;

-- 驗證結果
SELECT 
    u.id,
    u.email,
    u.name,
    u.role,
    CASE WHEN p.id IS NOT NULL THEN '已建立' ELSE '未建立' END as profile_status
FROM users u 
LEFT JOIN profiles p ON u.id = p.user_id
ORDER BY u.id;
