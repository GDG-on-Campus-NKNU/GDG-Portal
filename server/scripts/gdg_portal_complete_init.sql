-- ============================================
-- GDG Portal 完整資料庫初始化 SQL 腳本
-- 生成時間: 2025-06-01T17:42:39.783Z
-- 用途: 一次性插入所有樣本資料
-- 包含: Core Team, Categories, Announcements, Events, Gallery
-- ============================================

-- 開始總事務
START TRANSACTION;

-- ============================================
-- 用戶資料
-- ============================================

INSERT INTO users (google_id, email, name, avatar_url, role, is_active, created_at, updated_at) VALUES
('123456789012345678901', 'admin@gdg.nknu.edu.tw', 'GDG NKNU Admin', '/assets/users/admin_avatar.jpg', 'admin', true, NOW(), NOW());

-- ============================================
-- Core Team 成員資料
-- ============================================

INSERT INTO core_team (name, title, photo, department, year, skills, description, full_bio, achievements, contact_email, social_links, additional_photos, is_active, sort_order, created_at, updated_at) VALUES
('顏榕嶙', 'Technical Education Lead', '/assets/members/yen_profile.jpg', '軟體工程與管理學系', '大三', '["JavaScript","TypeScript","React","Vue.js","Node.js","Python","Git/GitHub","Workshop Design","Technical Writing","Public Speaking"]', 'Technical Education Lead - 負責技術教育規劃、工作坊設計與技術分享活動推廣', '技術教育專家，致力於推廣現代 Web 開發技術與最佳實踐。擁有豐富的前端框架經驗，特別專精於 React 和 Vue.js 開發。熱衷於教學分享，希望能透過技術傳授幫助更多同學成長。', '["組織 15+ 場技術工作坊","指導 50+ 位學生程式設計","在 5 場技術研討會擔任講者","發表 20+ 篇技術文章","建立校園技術學習社群","推動開源專案參與文化"]', 'technical.education@gdg.nknu.edu.tw', '{"linkedin":"https://linkedin.com/in/yen-jung-lin","github":"https://github.com/yen-jung-lin","twitter":"https://twitter.com/yen_jung_lin","facebook":"https://facebook.com/yen.jung.lin"}', '["/assets/members/yen_workshop_1.jpg","/assets/members/yen_workshop_2.jpg","/assets/members/yen_team_photo.jpg"]', true, 1, NOW(), NOW()),

('陳雅婷', 'Public Relations Manager', '/assets/members/chen_profile.jpg', '資訊傳播學系', '大三', '["Content Marketing","Social Media Management","Event Planning","Graphic Design","Community Management","Photography","Video Editing","Adobe Creative Suite","Public Speaking","Media Relations"]', 'Public Relations Manager - 負責社群公關、社群媒體管理與對外宣傳活動規劃', '公關專家，專精於數位行銷與社群經營。擁有豐富的活動企劃經驗，善於透過創意內容與視覺設計來提升社群影響力。致力於建立 GDG NKNU 的品牌形象，促進校內外合作交流。', '["管理 5+ 個社群媒體平台","策劃 20+ 場宣傳活動","建立校園媒體合作關係","設計 50+ 張宣傳海報","增加社群追蹤者 300%","獲得最佳社群經營獎"]', 'pr.manager@gdg.nknu.edu.tw', '{"linkedin":"https://linkedin.com/in/chen-ya-ting","instagram":"https://instagram.com/gdg_nknu_pr","facebook":"https://facebook.com/chen.ya.ting","behance":"https://behance.net/chen-ya-ting"}', '["/assets/members/chen_event_1.jpg","/assets/members/chen_design_work.jpg","/assets/members/chen_team_meeting.jpg"]', true, 2, NOW(), NOW()),

('李志明', 'Lead Organizer', '/assets/members/li_profile.jpg', '電子工程學系', '大四', '["Leadership","Project Management","Strategic Planning","Team Coordination","Event Organization","Stakeholder Management","Public Speaking","Agile Methodology","Risk Management","Cross-functional Collaboration"]', 'Lead Organizer - 社群總召，負責整體營運策略、團隊協調與重大決策制定', '領導力專家，擁有豐富的團隊管理與專案執行經驗。致力於打造高效能團隊文化，推動社群長期發展策略。在跨領域協作與資源整合方面具有卓越能力，是團隊的核心決策者。', '["領導 30+ 人核心團隊","執行年度預算 50萬+","建立完整組織架構","推動 10+ 項重要倡議","獲得校級優秀社團獎","建立產學合作關係 5+"]', 'lead.organizer@gdg.nknu.edu.tw', '{"linkedin":"https://linkedin.com/in/li-zhi-ming","twitter":"https://twitter.com/li_zhi_ming","facebook":"https://facebook.com/li.zhi.ming","github":"https://github.com/li-zhi-ming"}', '["/assets/members/li_leadership_1.jpg","/assets/members/li_meeting_2.jpg","/assets/members/li_award_ceremony.jpg"]', true, 3, NOW(), NOW()),

('王美華', 'UX/UI Design Lead', '/assets/members/wang_profile.jpg', '視覺傳達設計學系', '大三', '["UI/UX Design","Adobe Creative Suite","Figma","Sketch","Prototyping","User Research","Design Thinking","Usability Testing","Typography","Color Theory","Design Systems","Frontend Basics"]', 'UX/UI Design Lead - 負責使用者體驗設計、視覺設計與品牌形象建立', '設計專家，專精於使用者體驗設計與視覺傳達。具備完整的設計思維與實作能力，致力於創造直觀且美觀的數位體驗。在品牌識別設計與設計系統建立方面擁有豐富經驗。', '["設計 20+ 個數位產品介面","建立完整品牌識別系統","指導 15+ 位設計新手","獲得設計競賽金獎 3 次","建立設計規範文件","推動無障礙設計倡議"]', 'design.lead@gdg.nknu.edu.tw', '{"linkedin":"https://linkedin.com/in/wang-mei-hua","behance":"https://behance.net/wang-mei-hua","dribbble":"https://dribbble.com/wang-mei-hua","instagram":"https://instagram.com/wang_design"}', '["/assets/members/wang_design_1.jpg","/assets/members/wang_workshop_2.jpg","/assets/members/wang_portfolio_3.jpg"]', true, 4, NOW(), NOW()),

('張文傑', 'Operations Coordinator', '/assets/members/zhang_profile.jpg', '企業管理學系', '大二', '["Event Coordination","Administrative Management","Budget Planning","Vendor Management","Registration Systems","Logistics Planning","Time Management","Documentation","Process Optimization","Customer Service","Microsoft Office","Data Analysis"]', 'Operations Coordinator - 負責活動行政協調、場地安排與日常營運事務管理', '營運專家，擅長活動統籌與行政管理。具備優秀的組織協調能力，能夠處理複雜的多方溝通與資源調配。致力於建立高效的營運流程，確保每個活動都能順利執行。', '["協調 25+ 場大型活動","管理活動預算 20萬+","建立標準作業程序","維護會員資料庫 500+","優化報名流程效率 40%","獲得最佳行政支援獎"]', 'operations@gdg.nknu.edu.tw', '{"linkedin":"https://linkedin.com/in/zhang-wen-jie","facebook":"https://facebook.com/zhang.wen.jie","twitter":"https://twitter.com/zhang_wen_jie"}', '["/assets/members/zhang_event_1.jpg","/assets/members/zhang_coordination_2.jpg","/assets/members/zhang_team_3.jpg"]', true, 5, NOW(), NOW()),

('林佳慧', 'Backend Development Lead', '/assets/members/lin_profile.jpg', '資訊工程學系', '大四', '["Python","Java","Node.js","Database Design","API Development","Cloud Computing","Docker","Kubernetes","System Architecture","Performance Optimization","Security","DevOps","AWS","Google Cloud"]', 'Backend Development Lead - 負責後端系統開發、資料庫設計與雲端架構規劃', '後端技術專家，專精於大型系統架構設計與效能優化。擁有豐富的雲端服務經驗，致力於建構穩定可靠的技術基礎設施。在 API 設計與資料庫優化方面具有深厚功力。', '["開發 10+ 個後端系統","設計可擴展架構方案","優化系統效能 60%","建立 CI/CD 流程","指導後端開發團隊","獲得最佳技術貢獻獎"]', 'backend.lead@gdg.nknu.edu.tw', '{"linkedin":"https://linkedin.com/in/lin-jia-hui","github":"https://github.com/lin-jia-hui","twitter":"https://twitter.com/lin_jia_hui","medium":"https://medium.com/@lin-jia-hui"}', '["/assets/members/lin_coding_1.jpg","/assets/members/lin_architecture_2.jpg","/assets/members/lin_mentoring_3.jpg"]', true, 6, NOW(), NOW());

-- ============================================
-- 分類資料
-- ============================================

-- Member categories
INSERT INTO categories (name, type, color, is_active, created_at, updated_at) VALUES
('tech', 'member', '#4F46E5', true, NOW(), NOW());

INSERT INTO categories (name, type, color, is_active, created_at, updated_at) VALUES
('pr', 'member', '#059669', true, NOW(), NOW());

INSERT INTO categories (name, type, color, is_active, created_at, updated_at) VALUES
('core', 'member', '#DC2626', true, NOW(), NOW());

INSERT INTO categories (name, type, color, is_active, created_at, updated_at) VALUES
('design', 'member', '#7C3AED', true, NOW(), NOW());

INSERT INTO categories (name, type, color, is_active, created_at, updated_at) VALUES
('affairs', 'member', '#EA580C', true, NOW(), NOW());

-- Base type categories
INSERT INTO categories (name, type, color, is_active, created_at) VALUES
('event', 'event', '#10B981', true, NOW());

INSERT INTO categories (name, type, color, is_active, created_at) VALUES
('announcement', 'announcement', '#F59E0B', true, NOW());

INSERT INTO categories (name, type, color, is_active, created_at) VALUES
('frontend', 'event', '#3B82F6', true, NOW());

INSERT INTO categories (name, type, color, is_active, created_at) VALUES
('backend', 'event', '#10B981', true, NOW());

INSERT INTO categories (name, type, color, is_active, created_at) VALUES
('mobile', 'event', '#F59E0B', true, NOW());

INSERT INTO categories (name, type, color, is_active, created_at) VALUES
('cloud', 'event', '#6366F1', true, NOW());

INSERT INTO categories (name, type, color, is_active, created_at) VALUES
('ai', 'event', '#EC4899', true, NOW());

INSERT INTO categories (name, type, color, is_active, created_at) VALUES
('workshop', 'event', '#14B8A6', true, NOW());

INSERT INTO categories (name, type, color, is_active, created_at) VALUES
('lecture', 'event', '#8B5CF6', true, NOW());

-- ============================================
-- Core Team 與 Categories 關聯
-- ============================================

INSERT INTO core_team_categories (member_id, category_id) VALUES
(1, 1), -- 顏榕嶙 - tech (技術教學)
(2, 2), -- 陳雅婷 - pr (公關宣傳)
(3, 3), -- 李志明 - core (核心領導)
(4, 4), -- 王美華 - design (設計)
(5, 5), -- 張文傑 - affairs (事務)
(6, 1); -- 林佳慧 - tech (後端技術)

-- ============================================
-- 公告資料
-- ============================================

INSERT INTO announcements (title, content, excerpt, author_id, cover_image, is_pinned, view_count, status, published_at, created_at, updated_at) VALUES
('歡迎加入 GDG on Campus NKNU！', '歡迎所有對 Google 技術充滿熱忱的同學加入我們的社群！我們致力於創造一個開放、包容的學習環境，讓每個人都能在這裡成長。', '歡迎所有對 Google 技術充滿熱忱的同學加入我們的社群！', 1, NULL, true, 0, 'published', '2024-03-10 10:00:00', NOW(), NOW());

INSERT INTO announcements (title, content, excerpt, author_id, cover_image, is_pinned, view_count, status, published_at, created_at, updated_at) VALUES
('技術分享會報名開始', '本月的技術分享會將聚焦於現代前端開發技術，包含 React Hooks、狀態管理最佳實踐等主題。名額有限，敬請把握機會！', '本月的技術分享會將聚焦於現代前端開發技術', 1, NULL, false, 0, 'published', '2024-03-15 14:30:00', NOW(), NOW());

-- ============================================
-- 活動資料
-- ============================================

INSERT INTO events (title, description, excerpt, start_date, end_date, location, cover_image, registration_url, max_attendees, current_attendees, status, is_featured, created_by, created_at, updated_at) VALUES
('React 進階工作坊', '深入學習 React 進階概念，包含 Context API、自訂 Hooks、效能優化等主題。適合有基礎 React 經驗的開發者參加。', '這是一個為期半天的 React 進階工作坊，我們將探討現代 React 開發的最佳實踐。', '2024-04-20 14:00:00', '2024-04-20 17:30:00', '資訊大樓 A301', '/assets/events/react_workshop.jpg', 'https://forms.gle/example', 30, 25, 'published', true, 1, NOW(), NOW());

INSERT INTO events (title, description, excerpt, start_date, end_date, location, cover_image, registration_url, max_attendees, current_attendees, status, is_featured, created_by, created_at, updated_at) VALUES
('Google Cloud Platform 入門講座', '從零開始學習 GCP 雲端服務，涵蓋計算、儲存、網路等核心服務介紹，以及實際部署範例。', '全面介紹 Google Cloud Platform 的核心服務與應用場景。', '2024-05-10 19:00:00', '2024-05-10 21:00:00', '線上講座 (Google Meet)', '/assets/events/gcp_lecture.jpg', 'https://forms.gle/example2', 100, 67, 'published', true, 1, NOW(), NOW());

-- ============================================
-- 公告標籤關聯
-- ============================================

INSERT INTO announcement_tags (announcement_id, tag_name) VALUES
(1, 'welcome'),
(1, 'community'),
(2, 'event'),
(2, 'frontend');

-- ============================================
-- 活動標籤關聯
-- ============================================

INSERT INTO event_tags (event_id, tag_name) VALUES
(1, 'frontend'),
(1, 'workshop'),
(1, 'react'),
(2, 'cloud'),
(2, 'lecture'),
(2, 'google');

-- ============================================
-- Gallery 相簿資料
-- ============================================

INSERT INTO gallery (event_id, title, description, cover_image, images, tags, photographer, date_taken, view_count, is_featured, created_at, updated_at) VALUES
(NULL, 'GDG on Campus NKNU 成立活動', '記錄我們社群成立的珍貴時刻，成員們齊聚一堂共同見證這個重要里程碑。', '/assets/gallery/founding_event/cover.jpg', '["/assets/gallery/founding_event/image1.jpg","/assets/gallery/founding_event/image2.jpg","/assets/gallery/founding_event/image3.jpg"]', '["founding","community","milestone"]', '社群攝影團隊', '2024-03-15', 120, true, NOW(), NOW());

INSERT INTO gallery (event_id, title, description, cover_image, images, tags, photographer, date_taken, view_count, is_featured, created_at, updated_at) VALUES
(1, 'React 工作坊活動花絮', '記錄同學們認真學習 React 進階技術的精彩瞬間，大家互相討論、實作練習的熱絡氣氛。', '/assets/gallery/react_workshop/cover.jpg', '["/assets/gallery/react_workshop/image1.jpg","/assets/gallery/react_workshop/image2.jpg","/assets/gallery/react_workshop/image3.jpg","/assets/gallery/react_workshop/image4.jpg"]', '["workshop","react","frontend","learning"]', '顏榕嶙', '2024-04-20', 85, true, NOW(), NOW());

INSERT INTO gallery (event_id, title, description, cover_image, images, tags, photographer, date_taken, view_count, is_featured, created_at, updated_at) VALUES
(2, 'Google Cloud Platform 講座紀錄', '線上講座的螢幕截圖與參與者互動畫面，展現同學們對雲端技術的學習熱忱。', '/assets/gallery/gcp_lecture/cover.jpg', '["/assets/gallery/gcp_lecture/image1.jpg","/assets/gallery/gcp_lecture/image2.jpg","/assets/gallery/gcp_lecture/image3.jpg"]', '["lecture","cloud","gcp","online"]', '線上截圖', '2024-05-10', 65, false, NOW(), NOW());

INSERT INTO gallery (event_id, title, description, cover_image, images, tags, photographer, date_taken, view_count, is_featured, created_at, updated_at) VALUES
(NULL, '團隊建設活動', '社群成員們的日常互動與團隊建設活動，增進彼此感情與合作默契。', '/assets/gallery/team_building/cover.jpg', '["/assets/gallery/team_building/image1.jpg","/assets/gallery/team_building/image2.jpg","/assets/gallery/team_building/image3.jpg","/assets/gallery/team_building/image4.jpg","/assets/gallery/team_building/image5.jpg"]', '["team-building","community","friendship"]', '社群成員', '2024-05-25', 42, false, NOW(), NOW());

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

