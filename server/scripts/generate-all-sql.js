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

// 添加樣本用戶資料
const sampleUsers = [
  {
    google_id: '123456789012345678901',  // 這是一個假的 Google ID
    email: 'admin@gdg.nknu.edu.tw',
    name: 'GDG NKNU Admin',
    avatar_url: '/assets/users/admin_avatar.jpg',
    role: 'admin',
    is_active: true
  }
];

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
  },
  {
    name: '陳雅婷',
    title: 'Public Relations Manager',
    photo: '/assets/members/chen_profile.jpg',
    department: '資訊傳播學系',
    year: '大三',
    skills: [
      'Content Marketing',
      'Social Media Management',
      'Event Planning',
      'Graphic Design',
      'Community Management',
      'Photography',
      'Video Editing',
      'Adobe Creative Suite',
      'Public Speaking',
      'Media Relations'
    ],
    description: 'Public Relations Manager - 負責社群公關、社群媒體管理與對外宣傳活動規劃',
    full_bio: '公關專家，專精於數位行銷與社群經營。擁有豐富的活動企劃經驗，善於透過創意內容與視覺設計來提升社群影響力。致力於建立 GDG NKNU 的品牌形象，促進校內外合作交流。',
    achievements: [
      '管理 5+ 個社群媒體平台',
      '策劃 20+ 場宣傳活動',
      '建立校園媒體合作關係',
      '設計 50+ 張宣傳海報',
      '增加社群追蹤者 300%',
      '獲得最佳社群經營獎'
    ],
    contact_email: 'pr.manager@gdg.nknu.edu.tw',
    social_links: {
      linkedin: 'https://linkedin.com/in/chen-ya-ting',
      instagram: 'https://instagram.com/gdg_nknu_pr',
      facebook: 'https://facebook.com/chen.ya.ting',
      behance: 'https://behance.net/chen-ya-ting'
    },
    additional_photos: [
      '/assets/members/chen_event_1.jpg',
      '/assets/members/chen_design_work.jpg',
      '/assets/members/chen_team_meeting.jpg'
    ],
    is_active: true,
    sort_order: 2
  },
  {
    name: '李志明',
    title: 'Lead Organizer',
    photo: '/assets/members/li_profile.jpg',
    department: '電子工程學系',
    year: '大四',
    skills: [
      'Leadership',
      'Project Management',
      'Strategic Planning',
      'Team Coordination',
      'Event Organization',
      'Stakeholder Management',
      'Public Speaking',
      'Agile Methodology',
      'Risk Management',
      'Cross-functional Collaboration'
    ],
    description: 'Lead Organizer - 社群總召，負責整體營運策略、團隊協調與重大決策制定',
    full_bio: '領導力專家，擁有豐富的團隊管理與專案執行經驗。致力於打造高效能團隊文化，推動社群長期發展策略。在跨領域協作與資源整合方面具有卓越能力，是團隊的核心決策者。',
    achievements: [
      '領導 30+ 人核心團隊',
      '執行年度預算 50萬+',
      '建立完整組織架構',
      '推動 10+ 項重要倡議',
      '獲得校級優秀社團獎',
      '建立產學合作關係 5+'
    ],
    contact_email: 'lead.organizer@gdg.nknu.edu.tw',
    social_links: {
      linkedin: 'https://linkedin.com/in/li-zhi-ming',
      twitter: 'https://twitter.com/li_zhi_ming',
      facebook: 'https://facebook.com/li.zhi.ming',
      github: 'https://github.com/li-zhi-ming'
    },
    additional_photos: [
      '/assets/members/li_leadership_1.jpg',
      '/assets/members/li_meeting_2.jpg',
      '/assets/members/li_award_ceremony.jpg'
    ],
    is_active: true,
    sort_order: 3
  },
  {
    name: '王美華',
    title: 'UX/UI Design Lead',
    photo: '/assets/members/wang_profile.jpg',
    department: '視覺傳達設計學系',
    year: '大三',
    skills: [
      'UI/UX Design',
      'Adobe Creative Suite',
      'Figma',
      'Sketch',
      'Prototyping',
      'User Research',
      'Design Thinking',
      'Usability Testing',
      'Typography',
      'Color Theory',
      'Design Systems',
      'Frontend Basics'
    ],
    description: 'UX/UI Design Lead - 負責使用者體驗設計、視覺設計與品牌形象建立',
    full_bio: '設計專家，專精於使用者體驗設計與視覺傳達。具備完整的設計思維與實作能力，致力於創造直觀且美觀的數位體驗。在品牌識別設計與設計系統建立方面擁有豐富經驗。',
    achievements: [
      '設計 20+ 個數位產品介面',
      '建立完整品牌識別系統',
      '指導 15+ 位設計新手',
      '獲得設計競賽金獎 3 次',
      '建立設計規範文件',
      '推動無障礙設計倡議'
    ],
    contact_email: 'design.lead@gdg.nknu.edu.tw',
    social_links: {
      linkedin: 'https://linkedin.com/in/wang-mei-hua',
      behance: 'https://behance.net/wang-mei-hua',
      dribbble: 'https://dribbble.com/wang-mei-hua',
      instagram: 'https://instagram.com/wang_design'
    },
    additional_photos: [
      '/assets/members/wang_design_1.jpg',
      '/assets/members/wang_workshop_2.jpg',
      '/assets/members/wang_portfolio_3.jpg'
    ],
    is_active: true,
    sort_order: 4
  },
  {
    name: '張文傑',
    title: 'Operations Coordinator',
    photo: '/assets/members/zhang_profile.jpg',
    department: '企業管理學系',
    year: '大二',
    skills: [
      'Event Coordination',
      'Administrative Management',
      'Budget Planning',
      'Vendor Management',
      'Registration Systems',
      'Logistics Planning',
      'Time Management',
      'Documentation',
      'Process Optimization',
      'Customer Service',
      'Microsoft Office',
      'Data Analysis'
    ],
    description: 'Operations Coordinator - 負責活動行政協調、場地安排與日常營運事務管理',
    full_bio: '營運專家，擅長活動統籌與行政管理。具備優秀的組織協調能力，能夠處理複雜的多方溝通與資源調配。致力於建立高效的營運流程，確保每個活動都能順利執行。',
    achievements: [
      '協調 25+ 場大型活動',
      '管理活動預算 20萬+',
      '建立標準作業程序',
      '維護會員資料庫 500+',
      '優化報名流程效率 40%',
      '獲得最佳行政支援獎'
    ],
    contact_email: 'operations@gdg.nknu.edu.tw',
    social_links: {
      linkedin: 'https://linkedin.com/in/zhang-wen-jie',
      facebook: 'https://facebook.com/zhang.wen.jie',
      twitter: 'https://twitter.com/zhang_wen_jie'
    },
    additional_photos: [
      '/assets/members/zhang_event_1.jpg',
      '/assets/members/zhang_coordination_2.jpg',
      '/assets/members/zhang_team_3.jpg'
    ],
    is_active: true,
    sort_order: 5
  },
  {
    name: '林佳慧',
    title: 'Backend Development Lead',
    photo: '/assets/members/lin_profile.jpg',
    department: '資訊工程學系',
    year: '大四',
    skills: [
      'Python',
      'Java',
      'Node.js',
      'Database Design',
      'API Development',
      'Cloud Computing',
      'Docker',
      'Kubernetes',
      'System Architecture',
      'Performance Optimization',
      'Security',
      'DevOps',
      'AWS',
      'Google Cloud'
    ],
    description: 'Backend Development Lead - 負責後端系統開發、資料庫設計與雲端架構規劃',
    full_bio: '後端技術專家，專精於大型系統架構設計與效能優化。擁有豐富的雲端服務經驗，致力於建構穩定可靠的技術基礎設施。在 API 設計與資料庫優化方面具有深厚功力。',
    achievements: [
      '開發 10+ 個後端系統',
      '設計可擴展架構方案',
      '優化系統效能 60%',
      '建立 CI/CD 流程',
      '指導後端開發團隊',
      '獲得最佳技術貢獻獎'
    ],
    contact_email: 'backend.lead@gdg.nknu.edu.tw',
    social_links: {
      linkedin: 'https://linkedin.com/in/lin-jia-hui',
      github: 'https://github.com/lin-jia-hui',
      twitter: 'https://twitter.com/lin_jia_hui',
      medium: 'https://medium.com/@lin-jia-hui'
    },
    additional_photos: [
      '/assets/members/lin_coding_1.jpg',
      '/assets/members/lin_architecture_2.jpg',
      '/assets/members/lin_mentoring_3.jpg'
    ],
    is_active: true,
    sort_order: 6
  }
];

// 樣本分類資料
const sampleCategories = [
  // Member categories - 對應前端的 getCategoryLabel 映射
  { name: 'tech', type: 'member', color: '#4F46E5' }, // 技術教學
  { name: 'pr', type: 'member', color: '#059669' }, // 公關行銷
  { name: 'core', type: 'member', color: '#DC2626' }, // 核心幹部
  { name: 'design', type: 'member', color: '#7C3AED' }, // 美術設計
  { name: 'affairs', type: 'member', color: '#EA580C' }, // 總務攝影
  
  // Base type categories
  { name: 'event', type: 'event', color: '#10B981' },
  { name: 'announcement', type: 'announcement', color: '#F59E0B' },
  
  // Event categories
  { name: 'frontend', type: 'event', color: '#3B82F6' },
  { name: 'backend', type: 'event', color: '#10B981' },
  { name: 'mobile', type: 'event', color: '#F59E0B' },
  { name: 'cloud', type: 'event', color: '#6366F1' },
  { name: 'ai', type: 'event', color: '#EC4899' },
  { name: 'workshop', type: 'event', color: '#14B8A6' },
  { name: 'lecture', type: 'event', color: '#8B5CF6' }
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

  // 先插入用戶資料
  sql += `-- ============================================\n`;
  sql += `-- 用戶資料\n`;
  sql += `-- ============================================\n\n`;

  sampleUsers.forEach(user => {
    sql += `INSERT INTO users (google_id, email, name, avatar_url, role, is_active, created_at, updated_at) VALUES\n`;
    sql += `('${user.google_id}', '${user.email}', '${user.name}', '${user.avatar_url}', '${user.role}', ${user.is_active}, NOW(), NOW());\n\n`;
  });

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
    sql += `INSERT INTO categories (name, type, color, is_active, created_at) VALUES\n`;
    sql += `('${category.name}', '${category.type}', '${category.color}', true, NOW());\n\n`;
  });

  // Core Team Categories 關聯
  sql += `-- ============================================\n`;
  sql += `-- Core Team 與 Categories 關聯\n`;
  sql += `-- ============================================\n\n`;

  sql += `INSERT INTO core_team_categories (member_id, category_id) VALUES\n`;
  sql += `(1, 1), -- 顏榕嶙 - tech (技術教學)\n`;
  sql += `(2, 2), -- 陳雅婷 - pr (公關宣傳)\n`;
  sql += `(3, 3), -- 李志明 - core (核心領導)\n`;
  sql += `(4, 4), -- 王美華 - design (設計)\n`;
  sql += `(5, 5), -- 張文傑 - affairs (事務)\n`;
  sql += `(6, 1);\n\n`; // 林佳慧 - tech (後端技術)

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
    sql += `INSERT INTO events (title, description, excerpt, start_date, end_date, location, cover_image, registration_url, max_attendees, current_attendees, status, is_featured, created_by, created_at, updated_at) VALUES\n`;
    sql += `('${event.title}', '${event.description}', '${event.excerpt}', '${event.start_date}', '${event.end_date}', '${event.location}', '${event.cover_image}', '${event.registration_url}', ${event.max_attendees}, ${event.current_attendees}, '${event.status}', ${event.is_featured}, ${event.created_by}, NOW(), NOW());\n\n`;
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
