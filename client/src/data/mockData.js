// 假資料系統 - 用於測試驗證流程和儀表板功能

// 假使用者資料
export const mockUsers = {
  // 管理員
  admin: {
    id: 'user_001',
    name: '管理員 Bernie',
    email: 'admin@gdg.dev.tw',
    password: 'Admin123!',
    role: 'admin',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_events', 'manage_announcements'],
    avatar: '/assets/members/member1.png',
    joinDate: '2023-01-15',
    isActive: true,
    profile: {
      title: '系統管理員',
      department: '技術部',
      bio: '負責 GDG Portal 系統管理與維護',
      skills: ['React', 'Node.js', 'MongoDB', 'System Administration'],
      social: {
        github: 'https://github.com/admin',
        linkedin: 'https://linkedin.com/in/admin'
      }
    },
    lastLogin: '2024-12-20T10:30:00Z'
  },

  // 核心團隊成員
  core: {
    id: 'user_002',
    name: '核心成員 Xavier',
    email: 'core@gdg.dev.tw',
    password: 'Core123!',
    role: 'core',
    permissions: ['read', 'write', 'manage_events', 'manage_announcements'],
    avatar: '/assets/members/member2.png',
    joinDate: '2023-03-20',
    isActive: true,
    profile: {
      title: '技術負責人',
      department: '開發團隊',
      bio: '專注於前端開發與使用者體驗設計',
      skills: ['React', 'Vue.js', 'UI/UX Design', 'TypeScript'],
      social: {
        github: 'https://github.com/coreteam',
        twitter: 'https://twitter.com/coreteam'
      }
    },
    lastLogin: '2024-12-19T15:45:00Z'
  },

  // 一般會員
  member: {
    id: 'user_003',
    name: '會員 Diasiver',
    email: 'member@gdg.dev.tw',
    password: 'Member123!',
    role: 'member',
    permissions: ['read'],
    avatar: null,
    joinDate: '2023-08-10',
    isActive: true,
    profile: {
      title: '學生',
      department: '資訊工程學系',
      bio: '熱愛學習新技術的大學生',
      skills: ['JavaScript', 'Python', 'Machine Learning'],
      social: {
        github: 'https://github.com/member'
      }
    },
    lastLogin: '2024-12-18T09:20:00Z'
  },

  // 訪客 (未登入時的模擬)
  guest: {
    id: null,
    name: '訪客',
    email: null,
    role: 'guest',
    permissions: ['read_public'],
    avatar: null,
    isActive: false
  }
};

// 假的角色定義
export const mockRoles = {
  admin: {
    name: 'admin',
    displayName: '系統管理員',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_events', 'manage_announcements', 'manage_system'],
    level: 100
  },
  core: {
    name: 'core',
    displayName: '核心團隊',
    permissions: ['read', 'write', 'manage_events', 'manage_announcements'],
    level: 50
  },
  member: {
    name: 'member',
    displayName: '一般會員',
    permissions: ['read', 'comment', 'join_events'],
    level: 10
  },
  guest: {
    name: 'guest',
    displayName: '訪客',
    permissions: ['read_public'],
    level: 0
  }
};

// 假的活動資料
export const mockEvents = [
  {
    id: 'event_001',
    title: 'React 18 新功能深度解析',
    description: '探討 React 18 的並發功能、Suspense 改進和新的 Hook',
    date: '2024-12-25T19:00:00Z',
    endDate: '2024-12-25T21:00:00Z',
    location: '台北市信義區松仁路100號',
    status: 'upcoming',
    attendeeCount: 45,
    maxAttendees: 60,
    speaker: '林技術長',
    tags: ['React', 'Frontend', 'JavaScript'],
    image: '/assets/events/react-workshop.jpg'
  },
  {
    id: 'event_002',
    title: 'AI 與機器學習入門工作坊',
    description: '從零開始學習 AI 和機器學習的基本概念與實作',
    date: '2024-12-30T14:00:00Z',
    endDate: '2024-12-30T17:00:00Z',
    location: '線上活動',
    status: 'upcoming',
    attendeeCount: 120,
    maxAttendees: 150,
    speaker: '王 AI 專家',
    tags: ['AI', 'Machine Learning', 'Python'],
    image: '/assets/events/ai-workshop.jpg'
  }
];

// 假的公告資料
export const mockAnnouncements = [
  {
    id: 'announce_001',
    title: '歡迎來到 GDG Portal！',
    content: '我們很高興宣布 GDG Portal 正式上線！這個平台將成為我們技術社群的中心...',
    author: 'admin',
    authorName: '管理員 林小明',
    date: '2024-12-15T10:00:00Z',
    isPinned: true,
    tags: ['重要', '公告'],
    status: 'published'
  },
  {
    id: 'announce_002',
    title: '新年技術分享會即將開始報名',
    content: '2025 年新年技術分享會即將開放報名，敬請期待精彩的技術分享...',
    author: 'core',
    authorName: '核心成員 王小華',
    date: '2024-12-18T15:30:00Z',
    isPinned: false,
    tags: ['活動', '報名'],
    status: 'published'
  }
];

// 假的統計資料
export const mockStats = {
  totalMembers: 1250,
  activeMembers: 890,
  totalEvents: 45,
  upcomingEvents: 3,
  totalAnnouncements: 12,
  recentActivity: [
    {
      id: 'activity_001',
      type: 'user_joined',
      message: '新會員 李小明 加入了社群',
      timestamp: '2024-12-20T14:30:00Z'
    },
    {
      id: 'activity_002',
      type: 'event_created',
      message: '新活動「React 18 深度解析」已發布',
      timestamp: '2024-12-20T11:15:00Z'
    },
    {
      id: 'activity_003',
      type: 'announcement_posted',
      message: '新公告「新年技術分享會」已發布',
      timestamp: '2024-12-18T15:30:00Z'
    }
  ]
};

// 本地存儲的鍵名
export const STORAGE_KEYS = {
  CURRENT_USER: 'gdg_portal_current_user',
  AUTH_TOKEN: 'gdg_portal_auth_token',
  USER_PREFERENCES: 'gdg_portal_user_preferences'
};

// 工具函數：從本地存儲獲取當前使用者
export function getCurrentUser() {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('獲取使用者資料失敗:', error);
    return null;
  }
}

// 工具函數：設置當前使用者
export function setCurrentUser(user) {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `mock_token_${user.id}_${Date.now()}`);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
  } catch (error) {
    console.error('設置使用者資料失敗:', error);
  }
}

// 工具函數：驗證使用者憑證
export function validateCredentials(email, password) {
  const users = Object.values(mockUsers);
  return users.find(user => user.email === email && user.password === password);
}

// 工具函數：檢查權限
export function hasPermission(user, permission) {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
}

// 工具函數：檢查角色
export function hasRole(user, role) {
  if (!user) return false;
  return user.role === role;
}

// 工具函數：模擬 API 延遲
export function simulateApiDelay(ms = 500) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
