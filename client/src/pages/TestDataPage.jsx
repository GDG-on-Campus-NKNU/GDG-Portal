import { motion } from 'framer-motion';
import { Navbar } from '../../components/general/Navbar';
import { Footer } from '../../components/Footer';
import { BackgroundEffects } from '../../components/general/BackgroundEffects';
import { useAuth } from '../../hooks/useAuth';
import { mockUsers, mockEvents, mockAnnouncements, mockStats } from '../../data/mockData';

export default function TestDataPage() {
  const { 
    user, 
    isAuthenticated, 
    hasRole, 
    hasPermission, 
    isAdmin, 
    isCoreTeam, 
    isMember,
    canManageUsers,
    canManageEvents,
    canManageAnnouncements 
  } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-slate-800">
      <BackgroundEffects />
      <Navbar />
      
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4 py-12 relative z-10"
      >
        {/* 頁面標題 */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">🧪 假資料系統測試</h1>
          <p className="text-lg text-slate-600">驗證認證系統和權限管理功能</p>
        </motion.div>

        {/* 當前使用者狀態 */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">👤 當前使用者狀態</h2>
            
            {isAuthenticated ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 基本資訊 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-700">基本資訊</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">姓名：</span>{user?.name}</div>
                    <div><span className="font-medium">信箱：</span>{user?.email}</div>
                    <div><span className="font-medium">角色：</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        user?.role === 'admin' ? 'bg-red-100 text-red-800' :
                        user?.role === 'core_team' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user?.role}
                      </span>
                    </div>
                    <div><span className="font-medium">加入日期：</span>{user?.joinDate}</div>
                    <div><span className="font-medium">最後登入：</span>{user?.lastLogin}</div>
                  </div>
                </div>

                {/* 權限資訊 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-700">權限檢查</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`p-2 rounded ${isAdmin() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      管理員：{isAdmin() ? '✅' : '❌'}
                    </div>
                    <div className={`p-2 rounded ${isCoreTeam() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      核心團隊：{isCoreTeam() ? '✅' : '❌'}
                    </div>
                    <div className={`p-2 rounded ${isMember() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      一般會員：{isMember() ? '✅' : '❌'}
                    </div>
                    <div className={`p-2 rounded ${canManageUsers() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      管理使用者：{canManageUsers() ? '✅' : '❌'}
                    </div>
                    <div className={`p-2 rounded ${canManageEvents() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      管理活動：{canManageEvents() ? '✅' : '❌'}
                    </div>
                    <div className={`p-2 rounded ${canManageAnnouncements() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      管理公告：{canManageAnnouncements() ? '✅' : '❌'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-600 mb-4">目前未登入</p>
                <p className="text-sm text-slate-500">請使用右下角的快速登入工具測試不同角色</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* 可用測試帳號 */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">🔑 可用測試帳號</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(mockUsers).filter(([key]) => key !== 'guest').map(([key, userData]) => (
                <div key={key} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">
                      {userData.role === 'admin' && '👑'}
                      {userData.role === 'core_team' && '⭐'}
                      {userData.role === 'member' && '👤'}
                    </span>
                    <h3 className="font-semibold text-slate-800">{userData.name}</h3>
                  </div>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div>📧 {userData.email}</div>
                    <div>🔑 {userData.password}</div>
                    <div>🏷️ {userData.role}</div>
                    <div className="text-xs">
                      權限數量：{userData.permissions.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 假資料統計 */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">📊 系統統計</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{mockStats.totalMembers}</div>
                <div className="text-sm text-blue-800">總會員數</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{mockStats.activeMembers}</div>
                <div className="text-sm text-green-800">活躍會員</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{mockStats.totalEvents}</div>
                <div className="text-sm text-purple-800">總活動數</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{mockStats.upcomingEvents}</div>
                <div className="text-sm text-orange-800">即將到來</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 假活動資料預覽 */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">📅 活動資料預覽</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockEvents.map((event) => (
                <div key={event.id} className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">{event.title}</h3>
                  <div className="text-sm text-slate-600 space-y-1">
                    <div>📅 {new Date(event.date).toLocaleDateString('zh-TW')}</div>
                    <div>📍 {event.location}</div>
                    <div>👥 {event.attendeeCount}/{event.maxAttendees}</div>
                    <div>🎤 {event.speaker}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {event.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 系統狀態 */}
        <motion.div variants={itemVariants}>
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">⚙️ 系統狀態</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">假資料模式</h3>
                <div className="text-sm text-slate-600">
                  <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    假資料系統已啟用
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    可切換不同角色測試
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">可用功能</h3>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>✅ 使用者認證</div>
                  <div>✅ 角色權限系統</div>
                  <div>✅ 快速角色切換</div>
                  <div>✅ 儀表板功能</div>
                  <div>✅ 個人資料管理</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.main>
      
      <Footer />
    </div>
  );
}
