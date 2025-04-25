import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false)

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/assets/Long-Logo.png" alt="GDG Logo" className="h-10 w-30" />
        </div>

        {/* 桌面版選單 */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="/" className="text-gray-600 hover:text-blue-600">首頁</a>

          {/* 活動選單 */}
          <div className="relative group">
            <a href="/events" className="text-gray-600 hover:text-blue-600">活動</a>
            <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block z-10">
              <a href="/events?future=true" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">即將舉行</a>
              <a href="/events?future=false" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">歷史活動</a>
              <a href="/events?view=registration" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">活動報名</a>
            </div>
          </div>

          <a href="/announcements" className="text-gray-600 hover:text-blue-600">公告</a>
          <a href="/members" className="text-gray-600 hover:text-blue-600">幹部</a>
          <div className="flex space-x-2">
            <a href="/login" className="text-blue-600 hover:text-blue-700">登入</a>
            <span className="text-gray-300">|</span>
            <a href="/register" className="text-green-600 hover:text-green-700">註冊</a>
          </div>
        </nav>

        {/* 手機版選單按鈕 */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 手機版展開選單 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-2">
              <a href="/" className="block py-2 text-gray-700 hover:text-blue-600">首頁</a>

              {/* 手機版活動子選單 */}
              <div>
                <div
                  className="flex justify-between items-center py-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                  onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                >
                  <a href="/events" className="block">活動</a>
                  <svg
                    className={`w-5 h-5 transition-transform ${mobileSubmenuOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <AnimatePresence>
                  {mobileSubmenuOpen && (
                    <motion.div
                      className="ml-4 border-l-2 border-gray-200 pl-4 space-y-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a href="/events?future=true" className="block py-2 text-gray-600 hover:text-blue-600">即將舉行</a>
                      <a href="/events?future=false" className="block py-2 text-gray-600 hover:text-blue-600">歷史活動</a>
                      <a href="/events?view=registration" className="block py-2 text-gray-600 hover:text-blue-600">活動報名</a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="/announcements" className="block py-2 text-gray-700 hover:text-blue-600">公告</a>
              <a href="/members" className="block py-2 text-gray-700 hover:text-blue-600">幹部</a>

              {/* 手機版登入/註冊按鈕 */}
              <div className="pt-2 mt-2 border-t border-gray-100 flex justify-between">
                <a href="/login" className="w-full mr-1 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  登入
                </a>
                <a href="/register" className="w-full ml-1 py-2 text-center bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                  註冊
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
