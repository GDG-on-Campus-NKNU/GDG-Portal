/**
 * 實際後端測試伺服器
 * 用於驗證 Message Passing 在真實環境中的運作
 */

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// 創建 Express 應用
const app = express();
const PORT = 3001;

// 中介軟體設定
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // 前端網址
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// 模擬資料庫資料
const mockData = {
  events: [
    {
      id: 1,
      title: "GDG DevFest 2024",
      description: "年度開發者節慶活動，匯聚世界各地的開發者",
      date: "2024-12-15T09:00:00Z",
      location: "台北國際會議中心",
      is_featured: true,
      registration_url: "https://example.com/register",
      created_at: "2024-10-01T10:00:00Z",
      speakers: [
        { id: 1, name: "張三", bio: "Google Developer Expert in Android", avatar_url: null },
        { id: 2, name: "李四", bio: "Firebase 專家", avatar_url: null }
      ],
      tags: [
        { id: 1, name: "Android" },
        { id: 2, name: "Web" },
        { id: 3, name: "Firebase" }
      ]
    },
    {
      id: 2,
      title: "Flutter Workshop",
      description: "實作 Flutter 跨平台應用程式開發",
      date: "2024-11-20T14:00:00Z",
      location: "線上活動",
      is_featured: false,
      registration_url: "https://example.com/flutter",
      created_at: "2024-09-15T10:00:00Z",
      speakers: [
        { id: 3, name: "王五", bio: "Flutter 專家", avatar_url: null }
      ],
      tags: [
        { id: 4, name: "Flutter" },
        { id: 5, name: "Mobile" }
      ]
    },
    {
      id: 3,
      title: "Web Development with React",
      description: "學習現代 React 開發技巧",
      date: "2024-10-30T19:00:00Z",
      location: "台北科技大學",
      is_featured: true,
      registration_url: "https://example.com/react",
      created_at: "2024-09-01T10:00:00Z",
      speakers: [
        { id: 4, name: "陳六", bio: "前端專家", avatar_url: null }
      ],
      tags: [
        { id: 2, name: "Web" },
        { id: 6, name: "React" }
      ]
    }
  ],
  announcements: [
    {
      id: 1,
      title: "重要：GDG DevFest 2024 報名開始",
      content: "年度最大的開發者活動即將開始報名！請把握機會。\n\n活動亮點：\n- 國際級講師陣容\n- 實作 Workshop\n- 技術交流",
      is_pinned: true,
      created_at: "2024-10-15T10:00:00Z",
      tags: [{ id: 1, name: "重要" }, { id: 2, name: "活動" }]
    },
    {
      id: 2,
      title: "新成員招募",
      content: "GDG Taipei 正在招募新的組織成員，歡迎有熱忱的開發者加入我們！",
      is_pinned: false,
      created_at: "2024-10-10T15:00:00Z",
      tags: [{ id: 3, name: "招募" }]
    }
  ],
  coreTeam: [
    {
      id: 1,
      name: "王小明",
      bio: "GDG Taipei 主辦人，專精於 Android 開發與社群經營",
      avatar_url: null,
      github_url: "https://github.com/example1",
      linkedin_url: "https://linkedin.com/in/example1",
      categories: [{ id: 1, name: "Organizer" }, { id: 2, name: "Android" }]
    },
    {
      id: 2,
      name: "李小華",
      bio: "Web 開發專家，負責 GDG 技術分享與教學",
      avatar_url: null,
      github_url: "https://github.com/example2",
      linkedin_url: null,
      categories: [{ id: 3, name: "Speaker" }, { id: 4, name: "Web" }]
    }
  ],
  gallery: [
    {
      id: 1,
      title: "DevFest 2023 精彩回顧",
      cover_image: "/assets/gallery/devfest2023-cover.jpg",
      photos: [
        "/assets/gallery/devfest2023-1.jpg",
        "/assets/gallery/devfest2023-2.jpg",
        "/assets/gallery/devfest2023-3.jpg"
      ],
      created_at: "2023-12-20T10:00:00Z"
    }
  ]
};

// 模擬認證中介軟體
const mockAuth = (req, res, next) => {
  // 檢查 Authorization header 或 cookie
  const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;
  
  if (token && token === 'valid-token') {
    req.user = { id: 1, role: 'admin', name: '測試管理員' };
  }
  
  next();
};

// 模擬驗證中介軟體
const mockValidation = (req, res, next) => {
  console.log(`🔒 驗證請求: ${req.method} ${req.path}`);
  console.log(`📋 參數:`, req.query);
  if (Object.keys(req.body).length > 0) {
    console.log(`📝 請求體:`, req.body);
  }
  next();
};

// API 路由

// 事件相關 API
app.get('/api/events', mockValidation, (req, res) => {
  console.log('📊 處理事件列表請求');
  
  let { page = 1, limit = 10, keyword = '', tags = '', future = '', sort = 'desc' } = req.query;
  
  page = parseInt(page);
  limit = parseInt(limit);
  
  let events = [...mockData.events];
  
  // 關鍵字搜尋
  if (keyword) {
    events = events.filter(event => 
      event.title.toLowerCase().includes(keyword.toLowerCase()) ||
      event.description.toLowerCase().includes(keyword.toLowerCase()) ||
      event.location.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  
  // 標籤篩選
  if (tags) {
    const tagList = tags.split(',');
    events = events.filter(event => 
      event.tags.some(tag => tagList.includes(tag.name))
    );
  }
  
  // 時間篩選
  if (future === 'true') {
    const now = new Date();
    events = events.filter(event => new Date(event.date) >= now);
  } else if (future === 'false') {
    const now = new Date();
    events = events.filter(event => new Date(event.date) < now);
  }
  
  // 排序
  events.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sort === 'asc' ? dateA - dateB : dateB - dateA;
  });
  
  // 分頁
  const total = events.length;
  const startIndex = (page - 1) * limit;
  const paginatedEvents = events.slice(startIndex, startIndex + limit);
  
  const response = {
    events: paginatedEvents,
    totalCount: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    hasNext: page * limit < total,
    hasPrevious: page > 1
  };
  
  console.log(`✅ 回應 ${paginatedEvents.length}/${total} 個事件`);
  res.json(response);
});

app.get('/api/events/:id', mockValidation, (req, res) => {
  const id = parseInt(req.params.id);
  const event = mockData.events.find(e => e.id === id);
  
  if (!event) {
    return res.status(404).json({ message: '找不到該活動' });
  }
  
  console.log(`✅ 回應事件詳情: ${event.title}`);
  res.json({ event });
});

// 公告相關 API
app.get('/api/announcements', mockValidation, (req, res) => {
  console.log('📊 處理公告列表請求');
  
  let { page = 1, limit = 10, pinned = '' } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  
  let announcements = [...mockData.announcements];
  
  // 置頂篩選
  if (pinned === 'true') {
    announcements = announcements.filter(a => a.is_pinned);
  }
  
  // 排序（置頂優先，然後按時間）
  announcements.sort((a, b) => {
    if (a.is_pinned !== b.is_pinned) {
      return b.is_pinned - a.is_pinned;
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });
  
  const total = announcements.length;
  const startIndex = (page - 1) * limit;
  const paginatedAnnouncements = announcements.slice(startIndex, startIndex + limit);
  
  console.log(`✅ 回應 ${paginatedAnnouncements.length}/${total} 個公告`);
  res.json({
    announcements: paginatedAnnouncements,
    totalCount: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  });
});

// 核心團隊 API
app.get('/api/coreteam', mockValidation, (req, res) => {
  console.log('📊 處理核心團隊請求');
  res.json({
    members: mockData.coreTeam,
    totalCount: mockData.coreTeam.length,
    totalPages: 1,
    currentPage: 1
  });
});

// 相簿 API
app.get('/api/gallery', mockValidation, (req, res) => {
  console.log('📊 處理相簿請求');
  res.json({
    galleries: mockData.gallery,
    totalCount: mockData.gallery.length,
    totalPages: 1,
    currentPage: 1
  });
});

// 需要認證的 API（示範）
app.post('/api/events', mockAuth, mockValidation, (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: '需要管理員權限' });
  }
  
  const newEvent = {
    id: mockData.events.length + 1,
    ...req.body,
    created_at: new Date().toISOString(),
    speakers: [],
    tags: []
  };
  
  mockData.events.push(newEvent);
  
  console.log(`✅ 建立新事件: ${newEvent.title}`);
  res.status(201).json({ event: newEvent, message: '事件建立成功' });
});

// 健康檢查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'GDG Portal 測試伺服器運行中'
  });
});

// 404 處理
app.use('/api/*', (req, res) => {
  console.log(`❌ 404: ${req.method} ${req.path}`);
  res.status(404).json({ message: `找不到路由: ${req.path}` });
});

// 錯誤處理
app.use((err, req, res, next) => {
  console.error('❌ 伺服器錯誤:', err);
  res.status(500).json({ 
    message: '伺服器內部錯誤', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log('\n🚀 GDG Portal 測試伺服器啟動成功！');
  console.log(`📊 伺服器網址: http://localhost:${PORT}`);
  console.log('\n📋 可用的 API 端點:');
  console.log('  GET  /api/health - 健康檢查');
  console.log('  GET  /api/events - 活動列表');
  console.log('  GET  /api/events/:id - 活動詳情');
  console.log('  GET  /api/announcements - 公告列表');
  console.log('  GET  /api/coreteam - 核心團隊');
  console.log('  GET  /api/gallery - 相簿');
  console.log('  POST /api/events - 建立活動 (需要認證)');
  
  console.log('\n🔍 測試範例:');
  console.log(`  curl "http://localhost:${PORT}/api/health"`);
  console.log(`  curl "http://localhost:${PORT}/api/events"`);
  console.log(`  curl "http://localhost:${PORT}/api/events?keyword=flutter"`);
  console.log(`  curl "http://localhost:${PORT}/api/events?page=1&limit=2"`);
  console.log(`  curl "http://localhost:${PORT}/api/announcements?pinned=true"`);
  
  console.log('\n✅ 伺服器已準備好接受請求！');
});

export default app;
