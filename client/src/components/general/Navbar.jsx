import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { isDevelopment } from '../../utils/environmentUtils'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    setUserMenuOpen(false)
    // 導航到首頁並強制刷新
    navigate('/')
    // 短暫延遲後重新加載頁面以清除快取
    window.location.reload()

  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-blue-500/10 border-b border-white/20' 
        : 'bg-white/70 backdrop-blur-md shadow-sm'
    }`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-12 py-4 flex justify-between items-center">
        <motion.a
          href="/"
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <img 
              src="/assets/Long-Logo.png" 
              alt="GDG Logo" 
              className="h-10 w-30 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer" 
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
        </motion.a>

        {/* 右側導航區域 */}
        <div className="hidden md:flex items-center space-x-8">
          {/* 桌面版選單 */}
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <motion.a 
              href="/" 
              className="relative text-slate-600 hover:text-blue-600 transition-colors py-2"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              首頁
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 origin-left"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* 活動選單 - 增強版 */}
            <div className="relative group">
              <motion.a 
                href="/events" 
                className="relative text-slate-600 hover:text-blue-600 transition-colors py-2"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                活動
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-blue-500 scale-x-0 origin-left"
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.div 
                className="absolute left-0 mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl shadow-blue-500/10 py-2 hidden group-hover:block z-10 border border-white/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <a href="/events?future=true" className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all mx-2 rounded-lg">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  即將舉行
                </a>
                <a href="/events/historical" className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-600 transition-all mx-2 rounded-lg">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  歷史活動
                </a>
                <a href="/events/gallery" className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all mx-2 rounded-lg">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  活動相簿
                </a>
              </motion.div>
            </div>

            <motion.a 
              href="/announcements" 
              className="relative text-slate-600 hover:text-blue-600 transition-colors py-2"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              公告
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-500 to-red-500 scale-x-0 origin-left"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a 
              href="/members" 
              className="relative text-slate-600 hover:text-blue-600 transition-colors py-2"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              幹部
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 origin-left"
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </nav>

          {/* 使用者區域 */}
          <div className="flex items-center space-x-3 ml-6">
            {isAuthenticated && user ? (
              // 已登入使用者選單
              <div className="relative">
                <motion.button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 bg-white/60 backdrop-blur-sm hover:bg-white/80 rounded-xl border border-slate-200/50 hover:border-slate-300 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-slate-700 font-medium max-w-20 truncate">
                    {user.name || '使用者'}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-slate-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>

                {/* 使用者下拉選單 */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl shadow-blue-500/10 py-2 z-50 border border-white/20"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* 使用者資訊 */}
                      <div className="px-4 py-3 border-b border-slate-100/50">
                        <div className="text-sm font-semibold text-slate-800">{user.name}</div>
                        <div className="text-xs text-slate-500 truncate">{user.email}</div>
                        <div className="text-xs text-green-600 font-medium mt-1 capitalize">
                          {user.role || 'member'}
                        </div>
                      </div>

                      {/* 選單項目 */}
                      <div className="py-2">

                        <Link 
                          to={`/users/${user.id}`} 
                          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 hover:text-green-600 transition-all mx-2 rounded-lg"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          個人頁面
                        </Link>

                        <Link 
                          to="/dashboard" 
                          className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all mx-2 rounded-lg"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          個人儀表板
                        </Link>
                        
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all mx-2 rounded-lg"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          登出
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // 未登入時顯示登入/註冊按鈕
              <>
                <motion.a 
                  href="/login" 
                  className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  登入
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
                </motion.a>
                {/* 只在開發環境顯示註冊按鈕 */}
                {isDevelopment() && (
                  <motion.a 
                    href="/register" 
                    className="relative bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 hover:text-slate-900 px-6 py-2.5 rounded-xl font-medium transition-all border border-slate-200/50 hover:border-slate-300 shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    註冊
                  </motion.a>
                )}
              </>
            )}
          </div>
        </div>

        {/* 手機版選單按鈕 */}
        <motion.button
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-white/50 backdrop-blur-sm transition-all"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={mobileMenuOpen ? "open" : "closed"}
            className="w-6 h-6 relative"
          >
            <motion.span
              className="absolute block h-0.5 w-6 bg-current rounded-full"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 }
              }}
              style={{ top: '6px' }}
            />
            <motion.span
              className="absolute block h-0.5 w-6 bg-current rounded-full"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              style={{ top: '12px' }}
            />
            <motion.span
              className="absolute block h-0.5 w-6 bg-current rounded-full"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 }
              }}
              style={{ top: '18px' }}
            />
          </motion.div>
        </motion.button>
      </div>

      {/* 手機版展開選單 - 增強版 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-xl shadow-lg border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="px-4 py-4 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.a 
                href="/" 
                className="block py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all"
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  首頁
                </div>
              </motion.a>

              {/* 手機版活動子選單 - 增強版 */}
              <div>
                <motion.div
                  className="flex justify-between items-center py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 cursor-pointer rounded-lg transition-all"
                  onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <a href="/events" className="block">活動</a>
                  </div>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: mobileSubmenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.div>

                <AnimatePresence>
                  {mobileSubmenuOpen && (
                    <motion.div
                      className="ml-6 pl-6 border-l-2 border-gradient-to-b from-blue-200 to-purple-200 space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.a 
                        href="/events?future=true" 
                        className="block py-2 px-4 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        whileHover={{ x: 4 }}
                      >
                        即將舉行
                      </motion.a>
                      <motion.a 
                        href="/events/historical" 
                        className="block py-2 px-4 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                        whileHover={{ x: 4 }}
                      >
                        歷史活動
                      </motion.a>
                      <motion.a 
                        href="/events/gallery" 
                        className="block py-2 px-4 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                        whileHover={{ x: 4 }}
                      >
                        活動相簿
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.a 
                href="/announcements" 
                className="block py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-red-50 rounded-lg transition-all"
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  公告
                </div>
              </motion.a>
              
              <motion.a 
                href="/members" 
                className="block py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-lg transition-all"
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  幹部
                </div>
              </motion.a>

              {/* 手機版使用者區域 */}
              {isAuthenticated && user ? (
                // 已登入使用者資訊
                <div className="pt-4 mt-4 border-t border-slate-100/50">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-50/50 to-blue-50/50 rounded-xl mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-slate-800">{user.name}</div>
                      <div className="text-xs text-slate-500 truncate">{user.email}</div>
                      <div className="text-xs text-green-600 font-medium capitalize">
                        {user.role || 'member'}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div className="flex items-center bg-slate-100/80 rounded-lg p-2 mb-3"
                    whileHover={{ x: 5 }}
                  >
                    <Link 
                      to={`/users/${user.id}`}
                      className="flex items-center w-full text-slate-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">查看個人頁面</span>
                    </Link>
                  </motion.div>

                  <div className="flex gap-3">
                    <motion.a 
                      href="/dashboard" 
                      className="flex-1 py-3 text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium shadow-lg shadow-green-500/25"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      儀表板
                    </motion.a>
                    <motion.button 
                      onClick={handleLogout}
                      className="flex-1 py-3 text-center bg-white/80 backdrop-blur-sm text-red-600 rounded-xl font-medium border border-red-200/50 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      登出
                    </motion.button>
                  </div>
                </div>
              ) : (
                // 未登入時顯示登入/註冊按鈕
                <div className="pt-4 mt-4 border-t border-slate-100/50 flex gap-3">
                  <motion.a 
                    href="/login" 
                    className={`py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 ${isDevelopment() ? 'flex-1' : 'w-full'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    登入
                  </motion.a>
                  {/* 只在開發環境顯示註冊按鈕 */}
                  {isDevelopment() && (
                    <motion.a 
                      href="/register" 
                      className="flex-1 py-3 text-center bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl font-medium border border-slate-200/50 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      註冊
                    </motion.a>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
