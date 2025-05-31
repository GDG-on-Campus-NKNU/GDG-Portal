import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-blue-500/10 border-b border-white/20' 
        : 'bg-white/70 backdrop-blur-md shadow-sm'
    }`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-12 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <img 
              src="/assets/Long-Logo.png" 
              alt="GDG Logo" 
              className="h-10 w-30 rounded-xl shadow-sm hover:shadow-md transition-shadow" 
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
        </motion.div>

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

          {/* 登入/註冊按鈕 */}
          <div className="flex items-center space-x-3 ml-6">
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
            <motion.a 
              href="/register" 
              className="relative bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 hover:text-slate-900 px-6 py-2.5 rounded-xl font-medium transition-all border border-slate-200/50 hover:border-slate-300 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              註冊
            </motion.a>
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

              {/* 手機版登入/註冊按鈕 - 增強版 */}
              <div className="pt-4 mt-4 border-t border-slate-100/50 flex gap-3">
                <motion.a 
                  href="/login" 
                  className="flex-1 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  登入
                </motion.a>
                <motion.a 
                  href="/register" 
                  className="flex-1 py-3 text-center bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl font-medium border border-slate-200/50 shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  註冊
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
