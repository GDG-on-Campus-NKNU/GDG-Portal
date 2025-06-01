-- ============================================
-- GDG Portal 完整資料庫初始化 SQL 腳本
-- 生成時間: 2025-06-01T16:37:11.941Z
-- 用途: 一次性插入所有樣本資料
-- 包含: Core Team, Categories, Announcements, Events, Gallery
-- ============================================

-- 開始總事務
START TRANSACTION;

-- ============================================
-- Core Team 成員資料
-- ============================================

INSERT INTO core_team (name, title, photo, department, year, skills, description, full_bio, achievements, contact_email, social_links, additional_photos, is_active, sort_order, created_at, updated_at) VALUES
('顏榕嶙', 'Technical Education Lead', '/assets/members/yen_profile.jpg', '軟體工程與管理學系', '大三', '["JavaScript","TypeScript","React","Vue.js","Node.js","Python","Git/GitHub","Workshop Design","Technical Writing","Public Speaking"]', 'Technical Education Lead - 負責技術教育規劃、工作坊設計與技術分享活動推廣', '技術教育專家，致力於推廣現代 Web 開發技術與最佳實踐。擁有豐富的前端框架經驗，特別專精於 React 和 Vue.js 開發。熱衷於教學分享，希望能透過技術傳授幫助更多同學成長。', '["組織 15+ 場技術工作坊","指導 50+ 位學生程式設計","在 5 場技術研討會擔任講者","發表 20+ 篇技術文章","建立校園技術學習社群","推動開源專案參與文化"]', 'technical.education@gdg.nknu.edu.tw', '{"linkedin":"https://linkedin.com/in/yen-jung-lin","github":"https://github.com/yen-jung-lin","twitter":"https://twitter.com/yen_jung_lin","facebook":"https://facebook.com/yen.jung.lin"}', '["/assets/members/yen_workshop_1.jpg","/assets/members/yen_workshop_2.jpg","/assets/members/yen_team_photo.jpg"]', true, 1, NOW(), NOW());

-- ============================================
-- 分類資料
-- ============================================

INSERT INTO categories (name, title, description, created_at, updated_at) VALUES
('member', '成員', '社群成員相關', NOW(), NOW());

INSERT INTO categories (name, title, description, created_at, updated_at) VALUES
('event', '活動', '社群活動分類', NOW(), NOW());

INSERT INTO categories (name, title, description, created_at, updated_at) VALUES
('announcement', '公告', '重要公告通知', NOW(), NOW());

INSERT INTO categories (name, title, description, created_at, updated_at) VALUES
('frontend', 'Frontend', '前端開發技術', NOW(), NOW());

INSERT INTO categories (name, title, description, created_at, updated_at) VALUES
('backend', 'Backend', '後端開發技術', NOW(), NOW());

INSERT INTO categories (name, title, description, created_at, updated_at) VALUES
('mobile', 'Mobile', '行動應用開發', NOW(), NOW());

INSERT INTO categories (name, title, description, created_at, updated_at) VALUES
('cloud', 'Cloud', '雲端服務與部署', NOW(), NOW());

INSERT INTO categories (name, title, description, created_at, updated_at) VALUES
('ai', 'AI/ML', '人工智慧與機器學習', NOW(), NOW());

INSERT INTO categories (name, title, description, created_at, updated_at) VALUES
('workshop', 'Workshop', '工作坊活動', NOW(), NOW());

INSERT INTO categories (name, title, description, created_at, updated_at) VALUES
('lecture', 'Lecture', '講座活動', NOW(), NOW());

-- ============================================
-- Core Team 與 Categories 關聯
-- ============================================

INSERT INTO core_team_categories (member_id, category_id, created_at, updated_at) VALUES
(1, 1, NOW(), NOW());

-- ============================================
-- 公告資料
-- ============================================

INSERT INTO announcements (title, content, author, category_id, is_featured, is_published, created_at, updated_at) VALUES
('歡迎加入 GDG on Campus NKNU！', '歡迎所有對 Google 技術充滿熱忱的同學加入我們的社群！我們致力於創造一個開放、包容的學習環境，讓每個人都能在這裡成長。', '顏榕嶙', 3, true, true, NOW(), NOW());

INSERT INTO announcements (title, content, author, category_id, is_featured, is_published, created_at, updated_at) VALUES
('技術分享會報名開始', '本月的技術分享會將聚焦於現代前端開發技術，包含 React Hooks、狀態管理最佳實踐等主題。名額有限，敬請把握機會！', '顏榕嶙', 3, false, true, NOW(), NOW());

-- ============================================
-- 活動資料
-- ============================================

INSERT INTO events (title, content, description, event_date, location, max_attendees, current_attendees, registration_deadline, speaker_name, speaker_bio, category_id, is_featured, is_published, event_type, created_at, updated_at) VALUES
('React 進階工作坊', '深入學習 React 進階概念，包含 Context API、自訂 Hooks、效能優化等主題。適合有基礎 React 經驗的開發者參加。', '這是一個為期半天的 React 進階工作坊，我們將探討現代 React 開發的最佳實踐。', '2024-04-20 14:00:00', '資訊大樓 A301', 30, 25, '2024-04-18 23:59:59', '顏榕嶙', 'Frontend 技術專家，專精於 React 生態系統', 2, true, true, 'workshop', NOW(), NOW());

INSERT INTO events (title, content, description, event_date, location, max_attendees, current_attendees, registration_deadline, speaker_name, speaker_bio, category_id, is_featured, is_published, event_type, created_at, updated_at) VALUES
('Google Cloud Platform 入門講座', '從零開始學習 GCP 雲端服務，涵蓋計算、儲存、網路等核心服務介紹，以及實際部署範例。', '全面介紹 Google Cloud Platform 的核心服務與應用場景。', '2024-05-10 19:00:00', '線上講座 (Google Meet)', 100, 67, '2024-05-08 23:59:59', '顏榕嶙', 'Cloud Architecture 專家，擁有多項 GCP 認證', 7, true, true, 'lecture', NOW(), NOW());

-- ============================================
-- 公告標籤關聯
-- ============================================

INSERT INTO announcement_tags (announcement_id, category_id, created_at, updated_at) VALUES
(1, 1, NOW(), NOW()),
(2, 4, NOW(), NOW());

-- ============================================
-- 活動標籤關聯
-- ============================================

INSERT INTO event_tags (event_id, category_id, created_at, updated_at) VALUES
(1, 4, NOW(), NOW()),
(1, 9, NOW(), NOW()),
(2, 7, NOW(), NOW()),
(2, 10, NOW(), NOW());

-- ============================================
-- Gallery 相簿資料
-- ============================================

INSERT INTO gallery (event_id, title, description, cover_image, date_taken, photographer, location, is_featured, sort_order, created_at, updated_at) VALUES
(NULL, 'GDG on Campus NKNU 成立活動', '記錄我們社群成立的珍貴時刻，成員們齊聚一堂共同見證這個重要里程碑。', '/assets/gallery/founding_event/cover.jpg', '2024-03-15', '社群攝影團隊', '高雄師範大學', true, 1, NOW(), NOW());

INSERT INTO gallery (event_id, title, description, cover_image, date_taken, photographer, location, is_featured, sort_order, created_at, updated_at) VALUES
(1, 'React 工作坊活動花絮', '記錄同學們認真學習 React 進階技術的精彩瞬間，大家互相討論、實作練習的熱絡氣氛。', '/assets/gallery/react_workshop/cover.jpg', '2024-04-20', '顏榕嶙', '資訊大樓 A301', true, 2, NOW(), NOW());

INSERT INTO gallery (event_id, title, description, cover_image, date_taken, photographer, location, is_featured, sort_order, created_at, updated_at) VALUES
(2, 'Google Cloud Platform 講座紀錄', '線上講座的螢幕截圖與參與者互動畫面，展現同學們對雲端技術的學習熱忱。', '/assets/gallery/gcp_lecture/cover.jpg', '2024-05-10', '線上截圖', '線上講座', false, 3, NOW(), NOW());

INSERT INTO gallery (event_id, title, description, cover_image, date_taken, photographer, location, is_featured, sort_order, created_at, updated_at) VALUES
(NULL, '團隊建設活動', '社群成員們的日常互動與團隊建設活動，增進彼此感情與合作默契。', '/assets/gallery/team_building/cover.jpg', '2024-05-25', '社群成員', '高雄師範大學校園', false, 4, NOW(), NOW());

-- 提交總事務
COMMIT;

-- ============================================
-- 完整資料庫驗證查詢
-- ============================================

-- 所有表格資料統計
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Core Team' as table_name, COUNT(*) as count FROM core_team
UNION ALL
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Announcements' as table_name, COUNT(*) as count FROM announcements
UNION ALL
SELECT 'Events' as table_name, COUNT(*) as count FROM events
UNION ALL
SELECT 'Gallery' as table_name, COUNT(*) as count FROM gallery
ORDER BY table_name;

