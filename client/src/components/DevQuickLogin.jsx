import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { mockUsers } from '../data/mockData';

// 開發模式下的快速登入組件
export default function DevQuickLogin() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { login, logout, user, isAuthenticated } = useAuth();

  // 只在開發環境顯示
  if (process.env.NODE_ENV === 'production') {
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
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 快速登入面板 */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : '0px',
          opacity: isExpanded ? 1 : 0,
        }}
        className="overflow-hidden bg-white rounded-lg shadow-2xl border border-gray-200 mb-2"
      >
        <div className="p-4 min-w-[280px]">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            🚀 開發模式 - 快速登入
          </h3>
          
          {isAuthenticated && (
            <div className="mb-3 p-2 bg-green-50 rounded border border-green-200">
              <div className="text-xs text-green-800">
                <div className="font-medium">目前登入：{user?.name}</div>
                <div className="text-green-600">角色：{user?.role}</div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {/* 管理員登入 */}
            <button
              onClick={() => handleQuickLogin('admin')}
              className="w-full text-left px-3 py-2 text-xs bg-red-50 hover:bg-red-100 rounded border border-red-200 transition-colors"
            >
              <div className="font-medium text-red-800">👑 管理員</div>
              <div className="text-red-600">{mockUsers.admin.email}</div>
            </button>

            {/* 核心團隊登入 */}
            <button
              onClick={() => handleQuickLogin('coreTeam')}
              className="w-full text-left px-3 py-2 text-xs bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
            >
              <div className="font-medium text-blue-800">⭐ 核心團隊</div>
              <div className="text-blue-600">{mockUsers.coreTeam.email}</div>
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
              💡 這是開發測試工具，正式環境不會顯示
            </div>
          </div>
        </div>
      </motion.div>

      {/* 切換按鈕 */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg"
      >
        <svg 
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-45' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 4v16m8-8H4" 
          />
        </svg>
      </motion.button>

      {/* 顯示當前使用者資訊的小圖示 */}
      {isAuthenticated && !isExpanded && (
        <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          {user?.role === 'admin' && '👑'}
          {user?.role === 'core_team' && '⭐'}
          {user?.role === 'member' && '👤'}
        </div>
      )}
    </div>
  );
}
