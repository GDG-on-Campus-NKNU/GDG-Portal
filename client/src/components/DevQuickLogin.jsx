import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { mockUsers } from '../data/mockData';

// 開發模式下的快速登入組件
export default function DevQuickLogin() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [constraints, setConstraints] = useState({ left: 0, right: 1000, top: 0, bottom: 800 });
  
  const { login, logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 設定初始位置和拖曳限制
  useEffect(() => {
    const updateConstraints = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const componentWidth = 320; // 面板寬度
      const componentHeight = 100; // 大概的高度
      
      // 設定初始位置為左上角
      setPosition({
        x: 16,
        y: 16
      });
      
      // 設定拖曳限制
      setConstraints({
        left: 0,
        right: windowWidth - componentWidth,
        top: 0,
        bottom: windowHeight - componentHeight
      });
    };

    // 初始設定
    updateConstraints();
    
    // 監聽視窗大小變化
    window.addEventListener('resize', updateConstraints);
    
    return () => window.removeEventListener('resize', updateConstraints);
  }, []);

  // 只在開發環境顯示
  if (process.env.NODE_ENV === 'production' || import.meta.env.VITE_SHOW_DEV_LOGIN === 'false') {
    return null;
  }

  const handleQuickLogin = async (userType) => {
    const userData = mockUsers[userType];
    if (userData) {
      await login(userData.email, userData.password);
      setIsExpanded(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsExpanded(false);
    // 導航到首頁並強制刷新
    navigate('/');
    // 短暫延遲後重新加載頁面以清除快取
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <motion.div
      className="fixed z-50 select-none"
      style={{ 
        x: position.x, 
        y: position.y,
        left: 0,
        top: 0
      }}
      drag
      dragMomentum={false}
      dragConstraints={constraints}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event, info) => {
        setIsDragging(false);
        setPosition(prev => ({
          x: prev.x + info.offset.x,
          y: prev.y + info.offset.y
        }));
      }}
      whileDrag={{ scale: 1.05, rotate: 2 }}
    >
      {/* 快速登入面板 */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
        className="overflow-hidden bg-white rounded-lg shadow-2xl border border-gray-200 mb-2 pointer-events-auto"
      >
        <div className="p-4 min-w-[280px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800">
              🚀 開發模式 - 快速登入
            </h3>
            {/* 拖曳手柄指示器 */}
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          
          {isAuthenticated && (
            <div className="mb-3 p-2 bg-green-50 rounded border border-green-200">
              <div className="text-xs text-green-800">
                <div className="font-medium">目前登入：{user?.name}</div>
                <div className="text-green-600">角色：{user?.role}</div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {/* 開發測試管理員 */}
            <button
              onClick={() => handleQuickLogin('devadmin')}
              className="w-full text-left px-3 py-2 text-xs bg-red-50 hover:bg-red-100 rounded border border-red-200 transition-colors"
            >
              <div className="font-medium text-red-800">🔧 開發管理員</div>
              <div className="text-red-600">{mockUsers.devadmin.email}</div>
            </button>

            {/* 核心團隊登入 */}
            <button
              onClick={() => handleQuickLogin('core')}
              className="w-full text-left px-3 py-2 text-xs bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
            >
              <div className="font-medium text-blue-800">⭐ 核心團隊</div>
              <div className="text-blue-600">{mockUsers.core.email}</div>
            </button>

            {/* 一般會員登入 */}
            <button
              onClick={() => handleQuickLogin('member')}
              className="w-full text-left px-3 py-2 text-xs bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors"
            >
              <div className="font-medium text-green-800">👤 一般會員</div>
              <div className="text-green-600">{mockUsers.member.email}</div>
            </button>

            {/* 登出按鈕 */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-xs bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
              >
                <div className="font-medium text-gray-800">🚪 登出</div>
              </button>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              💡 可拖曳移動 • 正式環境不會顯示
            </div>
          </div>
        </div>
      </motion.div>

      {/* 切換按鈕 */}
      <motion.button
        onClick={() => !isDragging && setIsExpanded(!isExpanded)}
        whileHover={!isDragging ? { scale: 1.05 } : {}}
        whileTap={!isDragging ? { scale: 0.95 } : {}}
        className={`pointer-events-auto bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg ${
          isDragging ? 'cursor-grabbing' : 'cursor-pointer'
        }`}
        style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
      >
        <motion.div
          animate={{ rotate: isDragging ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg 
            className={`w-5 h-5 transition-transform ${isExpanded && !isDragging ? 'rotate-45' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isDragging ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l4-4m0 0l4 4m-4-4v12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            )}
          </svg>
        </motion.div>
      </motion.button>

      {/* 顯示當前使用者資訊的小圖示 */}
      {isAuthenticated && !isExpanded && !isDragging && (
        <motion.div 
          className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          {user?.role === 'admin' && '👑'}
          {user?.role === 'core' && '⭐'}
          {user?.role === 'member' && '👤'}
        </motion.div>
      )}

      {/* 拖曳提示 */}
      {isDragging && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          拖曳到任意位置
        </motion.div>
      )}
    </motion.div>
  );
}
