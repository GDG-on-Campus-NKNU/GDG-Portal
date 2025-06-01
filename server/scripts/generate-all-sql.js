#!/usr/bin/env node
// filepath: /workspaces/GDG-Portal/scripts/generate-all-sql.js

/**
 * 生成完整的 GDG Portal 資料庫初始化 SQL 腳本
 * 包含所有表格的樣本資料
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 樣本 Core Team 成員資料
const sampleCoreTeamData = [
  {
    name: '顏榕嶙',
    title: 'Technical Education Lead',
    photo: '/assets/members/yen_profile.jpg',
    department: '軟體工程與管理學系',
    year: '大三',
    skills: [
      'JavaScript',
      'TypeScript', 
      'React',
      'Vue.js',
      'Node.js',
      'Python',
      'Git/GitHub',
      'Workshop Design',
      'Technical Writing',
      'Public Speaking'
    ],
    description: 'Technical Education Lead - 負責技術教育規劃、工作坊設計與技術分享活動推廣',
    full_bio: '技術教育專家，致力於推廣現代 Web 開發技術與最佳實踐。擁有豐富的前端框架經驗，特別專精於 React 和 Vue.js 開發。熱衷於教學分享，希望能透過技術傳授幫助更多同學成長。',
    achievements: [
      '組織 15+ 場技術工作坊',
      '指導 50+ 位學生程式設計', 
      '在 5 場技術研討會擔任講者',
      '發表 20+ 篇技術文章',
      '建立校園技術學習社群',
      '推動開源專案參與文化'
    ],
    contact_email: 'technical.education@gdg.nknu.edu.tw',
    social_links: {
      linkedin: 'https://linkedin.com/in/yen-jung-lin',
      github: 'https://github.com/yen-jung-lin',
      twitter: 'https://twitter.com/yen_jung_lin',
      facebook: 'https://facebook.com/yen.jung.lin'
    },
    additional_photos: [
      '/assets/members/yen_workshop_1.jpg',
      '/assets/members/yen_workshop_2.jpg',
      '/assets/members/yen_team_photo.jpg'
    ],
    is_active: true,
    sort_order: 1
  }
];

// 樣本分類資料
const sampleCategories = [
  { name: 'member', title: '成員', description: '社群成員相關' },
  { name: 'event', title: '活動', description: '社群活動分類' },
  { name: 'announcement', title: '公告', description: '重要公告通知' },
  { name: 'frontend', title: 'Frontend', description: '前端開發技術' },
  { name: 'backend', title: 'Backend', description: '後端開發技術' },
  { name: 'mobile', title: 'Mobile', description: '行動應用開發' },
  { name: 'cloud', title: 'Cloud', description: '雲端服務與部署' },
  { name: 'ai', title: 'AI/ML', description: '人工智慧與機器學習' },
  { name: 'workshop', title: 'Workshop', description: '工作坊活動' },
  { name: 'lecture', title: 'Lecture', description: '講座活動' }
];

// 樣本公告資料
const sampleAnnouncements = [
  {
    title: '歡迎加入 GDG on Campus NKNU！',
    content: '歡迎所有對 Google 技術充滿熱忱的同學加入我們的社群！我們致力於創造一個開放、包容的學習環境，讓每個人都能在這裡成長。',
    excerpt: '歡迎所有對 Google 技術充滿熱忱的同學加入我們的社群！',
    author_id: 1, // 假設 ID 為 1 的用戶
    cover_image: null,
    is_pinned: true,
    view_count: 0,
    status: 'published',
    published_at: '2024-03-10 10:00:00'
  },
  {
    title: '技術分享會報名開始',
    content: '本月的技術分享會將聚焦於現代前端開發技術，包含 React Hooks、狀態管理最佳實踐等主題。名額有限，敬請把握機會！',
    excerpt: '本月的技術分享會將聚焦於現代前端開發技術',
    author_id: 1, // 假設 ID 為 1 的用戶
    cover_image: null,
    is_pinned: false,
    view_count: 0,
    status: 'published',
    published_at: '2024-03-15 14:30:00'
  }
];

// 樣本活動資料
const sampleEvents = [
  {
    title: 'React 進階工作坊',
    description: '深入學習 React 進階概念，包含 Context API、自訂 Hooks、效能優化等主題。適合有基礎 React 經驗的開發者參加。',
    excerpt: '這是一個為期半天的 React 進階工作坊，我們將探討現代 React 開發的最佳實踐。',
    start_date: '2024-04-20 14:00:00',
    end_date: '2024-04-20 17:30:00',
    location: '資訊大樓 A301',
    cover_image: '/assets/events/react_workshop.jpg',
    registration_url: 'https://forms.gle/example',
    max_attendees: 30,
    current_attendees: 25,
    status: 'published',
    is_featured: true,
    created_by: 1, // 假設 ID 為 1 的用戶
    event_type: 'workshop'
  },
  {
    title: 'Google Cloud Platform 入門講座',
    description: '從零開始學習 GCP 雲端服務，涵蓋計算、儲存、網路等核心服務介紹，以及實際部署範例。',
    excerpt: '全面介紹 Google Cloud Platform 的核心服務與應用場景。',
    start_date: '2024-05-10 19:00:00',
    end_date: '2024-05-10 21:00:00',
    location: '線上講座 (Google Meet)',
    cover_image: '/assets/events/gcp_lecture.jpg',
    registration_url: 'https://forms.gle/example2',
    max_attendees: 100,
    current_attendees: 67,
    status: 'published',
    is_featured: true,
    created_by: 1, // 假設 ID 為 1 的用戶
    event_type: 'lecture'
  }
];

// 樣本相簿資料
// 樣本相簿資料
const sampleGalleryData = [
  {
    event_id: null,
    title: 'GDG on Campus NKNU 成立活動',
    description: '記錄我們社群成立的珍貴時刻，成員們齊聚一堂共同見證這個重要里程碑。',
    cover_image: '/assets/gallery/founding_event/cover.jpg',
    images: [
      '/assets/gallery/founding_event/image1.jpg',
      '/assets/gallery/founding_event/image2.jpg',
      '/assets/gallery/founding_event/image3.jpg'
    ],
    tags: ['founding', 'community', 'milestone'],
    photographer: '社群攝影團隊',
    date_taken: '2024-03-15',
    view_count: 120,
    is_featured: true
  },
  {
    event_id: 1,
    title: 'React 工作坊活動花絮',
    description: '記錄同學們認真學習 React 進階技術的精彩瞬間，大家互相討論、實作練習的熱絡氣氛。',
    cover_image: '/assets/gallery/react_workshop/cover.jpg',
    images: [
      '/assets/gallery/react_workshop/image1.jpg',
      '/assets/gallery/react_workshop/image2.jpg',
      '/assets/gallery/react_workshop/image3.jpg',
      '/assets/gallery/react_workshop/image4.jpg'
    ],
    tags: ['workshop', 'react', 'frontend', 'learning'],
    photographer: '顏榕嶙',
    date_taken: '2024-04-20',
    view_count: 85,
    is_featured: true
  },
  {
    event_id: 2,
    title: 'Google Cloud Platform 講座紀錄',
    description: '線上講座的螢幕截圖與參與者互動畫面，展現同學們對雲端技術的學習熱忱。',
    cover_image: '/assets/gallery/gcp_lecture/cover.jpg',
    images: [
      '/assets/gallery/gcp_lecture/image1.jpg',
      '/assets/gallery/gcp_lecture/image2.jpg',
      '/assets/gallery/gcp_lecture/image3.jpg'
    ],
    tags: ['lecture', 'cloud', 'gcp', 'online'],
    photographer: '線上截圖',
    date_taken: '2024-05-10',
    view_count: 65,
    is_featured: false
  },
  {
    event_id: null,
    title: '團隊建設活動',
    description: '社群成員們的日常互動與團隊建設活動，增進彼此感情與合作默契。',
    cover_image: '/assets/gallery/team_building/cover.jpg',
    images: [
      '/assets/gallery/team_building/image1.jpg',
      '/assets/gallery/team_building/image2.jpg',
      '/assets/gallery/team_building/image3.jpg',
      '/assets/gallery/team_building/image4.jpg',
      '/assets/gallery/team_building/image5.jpg'
    ],
    tags: ['team-building', 'community', 'friendship'],
    photographer: '社群成員',
    date_taken: '2024-05-25',
    view_count: 42,
    is_featured: false
  }
];

/**
 * 主執行函數
 */
async function main() {
  console.log('🚀 生成完整的 GDG Portal 資料庫初始化 SQL 腳本...');
  console.log('');
  
  let combinedSQL = '';
  
  // 添加總合標頭
  combinedSQL += `-- ============================================\n`;
  combinedSQL += `-- GDG Portal 完整資料庫初始化 SQL 腳本\n`;
  combinedSQL += `-- 生成時間: ${new Date().toISOString()}\n`;
  combinedSQL += `-- 用途: 一次性插入所有樣本資料\n`;
  combinedSQL += `-- 包含: Core Team, Categories, Announcements, Events, Gallery\n`;
  combinedSQL += `-- ============================================\n\n`;
  
  combinedSQL += `-- 開始總事務\n`;
  combinedSQL += `START TRANSACTION;\n\n`;
  
  // 先執行基本資料 (Core Team, Categories, Announcements, Events)
  console.log('📊 生成核心資料 SQL...');
  const coreSQL = generateCoreSQL();
  combinedSQL += coreSQL.replace(/START TRANSACTION;|COMMIT;/g, ''); // 移除個別事務
  
  // 再執行 Gallery 資料
  console.log('📸 生成相簿資料 SQL...');
  const gallerySQL = generateGallerySQL();
  combinedSQL += gallerySQL.replace(/START TRANSACTION;|COMMIT;/g, ''); // 移除個別事務
  
  // 提交總事務
  combinedSQL += `-- 提交總事務\n`;
  combinedSQL += `COMMIT;\n\n`;
  
  // 添加總合驗證查詢
  combinedSQL += `-- ============================================\n`;
  combinedSQL += `-- 完整資料庫驗證查詢\n`;
  combinedSQL += `-- ============================================\n\n`;
  combinedSQL += `-- 所有表格資料統計\n`;
  combinedSQL += `SELECT 'Users' as table_name, COUNT(*) as count FROM users\n`;
  combinedSQL += `UNION ALL\n`;
  combinedSQL += `SELECT 'Core Team' as table_name, COUNT(*) as count FROM core_team\n`;
  combinedSQL += `UNION ALL\n`;
  combinedSQL += `SELECT 'Categories' as table_name, COUNT(*) as count FROM categories\n`;
  combinedSQL += `UNION ALL\n`;
  combinedSQL += `SELECT 'Announcements' as table_name, COUNT(*) as count FROM announcements\n`;
  combinedSQL += `UNION ALL\n`;
  combinedSQL += `SELECT 'Events' as table_name, COUNT(*) as count FROM events\n`;
  combinedSQL += `UNION ALL\n`;
  combinedSQL += `SELECT 'Gallery' as table_name, COUNT(*) as count FROM gallery\n`;
  combinedSQL += `ORDER BY table_name;\n\n`;
  
  // 寫入檔案
  const outputPath = path.join(__dirname, 'gdg_portal_complete_init.sql');
  fs.writeFileSync(outputPath, combinedSQL, 'utf8');
  
  console.log('✅ 完整 SQL 腳本生成完成！');
  console.log(`📁 檔案位置: ${outputPath}`);
  console.log('');
  console.log('📋 使用方法:');
  console.log('1. 複製 SQL 檔案到你的本地環境');
  console.log('2. 連接到你的 MySQL 資料庫');
  console.log('3. 執行以下命令:');
  console.log(`   mysql -u zerotier -p dev_gdg < ${path.basename(outputPath)}`);
  console.log('');
  console.log('🎯 包含的完整資料:');
  console.log('   👥 Core Team 成員: 1 位 (顏榕嶙)');
  console.log('   📋 分類: 10 個 (成員、活動、公告分類)');
  console.log('   📢 公告: 2 則 (歡迎訊息、技術分享會)');
  console.log('   🎉 活動: 2 個 (React 工作坊、GCP 講座)');
  console.log('   📸 相簿: 4 個 (成立活動、工作坊等)');
  console.log('');
  console.log('🌟 這是一個完整的資料庫初始化方案！');
}

/**
 * 生成核心資料 SQL（複製自 generate-sql.js 的邏輯）
 */
function generateCoreSQL() {
  let sql = '';
  
  // Core Team 資料
  sql += `-- ============================================\n`;
  sql += `-- Core Team 成員資料\n`;
  sql += `-- ============================================\n\n`;
  
  sampleCoreTeamData.forEach(member => {
    // 處理 JSON 欄位的轉換
    const skillsJson = JSON.stringify(member.skills).replace(/'/g, "\\'");
    const achievementsJson = JSON.stringify(member.achievements).replace(/'/g, "\\'");
    const socialLinksJson = JSON.stringify(member.social_links).replace(/'/g, "\\'");
    const additionalPhotosJson = JSON.stringify(member.additional_photos).replace(/'/g, "\\'");
    
    sql += `INSERT INTO core_team (name, title, photo, department, year, skills, description, full_bio, achievements, contact_email, social_links, additional_photos, is_active, sort_order, created_at, updated_at) VALUES\n`;
    sql += `('${member.name}', '${member.title}', '${member.photo}', '${member.department}', '${member.year}', '${skillsJson}', '${member.description}', '${member.full_bio}', '${achievementsJson}', '${member.contact_email}', '${socialLinksJson}', '${additionalPhotosJson}', ${member.is_active}, ${member.sort_order}, NOW(), NOW());\n\n`;
  });
  
  // Categories 資料
  sql += `-- ============================================\n`;
  sql += `-- 分類資料\n`;
  sql += `-- ============================================\n\n`;
  
  sampleCategories.forEach(category => {
    sql += `INSERT INTO categories (name, title, description, created_at, updated_at) VALUES\n`;
    sql += `('${category.name}', '${category.title}', '${category.description}', NOW(), NOW());\n\n`;
  });
  
  // Core Team Categories 關聯
  sql += `-- ============================================\n`;
  sql += `-- Core Team 與 Categories 關聯\n`;
  sql += `-- ============================================\n\n`;
  
  sql += `INSERT INTO core_team_categories (member_id, category_id, created_at, updated_at) VALUES\n`;
  sql += `(1, 1, NOW(), NOW());\n\n`; // 顏榕嶙 關聯到 member category
  
  // Announcements 資料
  sql += `-- ============================================\n`;
  sql += `-- 公告資料\n`;
  sql += `-- ============================================\n\n`;
  
  sampleAnnouncements.forEach(announcement => {
    sql += `INSERT INTO announcements (title, content, excerpt, author_id, cover_image, is_pinned, view_count, status, published_at, created_at, updated_at) VALUES\n`;
    sql += `('${announcement.title}', '${announcement.content}', '${announcement.excerpt}', ${announcement.author_id}, ${announcement.cover_image ? `'${announcement.cover_image}'` : 'NULL'}, ${announcement.is_pinned}, ${announcement.view_count}, '${announcement.status}', '${announcement.published_at}', NOW(), NOW());\n\n`;
  });
  
  // Events 資料
  sql += `-- ============================================\n`;
  sql += `-- 活動資料\n`;
  sql += `-- ============================================\n\n`;
  
  sampleEvents.forEach(event => {
    sql += `INSERT INTO events (title, description, excerpt, start_date, end_date, location, cover_image, registration_url, max_attendees, current_attendees, status, is_featured, created_by, event_type, created_at, updated_at) VALUES\n`;
    sql += `('${event.title}', '${event.description}', '${event.excerpt}', '${event.start_date}', '${event.end_date}', '${event.location}', '${event.cover_image}', '${event.registration_url}', ${event.max_attendees}, ${event.current_attendees}, '${event.status}', ${event.is_featured}, ${event.created_by}, '${event.event_type}', NOW(), NOW());\n\n`;
  });
  
  // Announcement Tags
  sql += `-- ============================================\n`;
  sql += `-- 公告標籤關聯\n`;
  sql += `-- ============================================\n\n`;
  
  sql += `INSERT INTO announcement_tags (announcement_id, tag_name) VALUES\n`;
  sql += `(1, 'welcome'),\n`; // 歡迎訊息 -> welcome 標籤
  sql += `(1, 'community'),\n`; // 歡迎訊息 -> community 標籤
  sql += `(2, 'event'),\n`; // 技術分享會 -> event 標籤
  sql += `(2, 'frontend');\n\n`; // 技術分享會 -> frontend 標籤
  
  // Event Tags  
  sql += `-- ============================================\n`;
  sql += `-- 活動標籤關聯\n`;
  sql += `-- ============================================\n\n`;
  
  sql += `INSERT INTO event_tags (event_id, tag_name) VALUES\n`;
  sql += `(1, 'frontend'),\n`; // React 工作坊 -> frontend
  sql += `(1, 'workshop'),\n`; // React 工作坊 -> workshop
  sql += `(1, 'react'),\n`; // React 工作坊 -> react
  sql += `(2, 'cloud'),\n`; // GCP 講座 -> cloud
  sql += `(2, 'lecture'),\n`; // GCP 講座 -> lecture
  sql += `(2, 'google');\n\n`; // GCP 講座 -> google
  
  return sql;
}

/**
 * 生成相簿 SQL
 */
function generateGallerySQL() {
  let sql = '';
  
  sql += `-- ============================================\n`;
  sql += `-- Gallery 相簿資料\n`;
  sql += `-- ============================================\n\n`;
  
  sampleGalleryData.forEach(gallery => {
    const eventId = gallery.event_id ? gallery.event_id : 'NULL';
    const imagesJson = JSON.stringify(gallery.images).replace(/'/g, "\\'");
    const tagsJson = JSON.stringify(gallery.tags).replace(/'/g, "\\'");
    
    sql += `INSERT INTO gallery (event_id, title, description, cover_image, images, tags, photographer, date_taken, view_count, is_featured, created_at, updated_at) VALUES\n`;
    sql += `(${eventId}, '${gallery.title}', '${gallery.description}', '${gallery.cover_image}', '${imagesJson}', '${tagsJson}', '${gallery.photographer}', '${gallery.date_taken}', ${gallery.view_count}, ${gallery.is_featured}, NOW(), NOW());\n\n`;
  });
  
  return sql;
}

// 執行腳本
main().catch(console.error);
