import { useState, useEffect } from 'react'
import { motion } from 'framer-motion' // 用於動畫效果，不要管他
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import SearchBar from '../components/general/SearchBar'
import FilterPanel from '../components/general/FilterPanel'
import LoadingSpinner from '../components/general/LoadingSpinner'
import NotificationToast from '../components/general/NotificationToast'
import Pagination from '../components/general/Pagination'
import { PostCard } from '../components/PostCard'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [keyword, setKeyword] = useState('')
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const availableTags = [
    { label: '技術', value: 'tech' },
    { label: '活動', value: 'event' },
    { label: '公告', value: 'notice' },
    { label: '課程', value: 'course' },
    { label: '實習', value: 'internship' },
  ]

  const fetchAnnouncements = async () => {
    setLoading(true)
    setError('')
    try {
      const q = new URLSearchParams({ page, keyword, tags: tags.join(',') })
      const res = await fetch(`/api/announcements?${q}`)
      const { data, totalPages: tp } = await res.json()
      setAnnouncements(data)
      setTotalPages(tp)
    } catch (e) {
      setError('載入公告失敗: ' + e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [page, keyword, tags])

  // 模擬一些測試數據
  const dummyAnnouncements = !loading && announcements.length === 0 ? [
    {
      id: 1,
      title: 'Google I/O 2025 觀賞派對報名中!',
      date: '2025-05-01',
      excerpt: '一起來參加我們的 Google I/O 2025 觀賞派對，了解最新的 Google 技術發展與創新...',
      tags: ['event', 'tech'],
      isPinned: true
    },
    {
      id: 2,
      title: '2025 學期技術講座系列公布',
      date: '2025-04-20',
      excerpt: '本學期將舉辦 Android、Flutter、Firebase 與 AI 等多場技術講座，請密切關注報名時間...',
      tags: ['notice', 'course'],
      isPinned: false
    },
    {
      id: 3,
      title: '徵求技術分享講者',
      date: '2025-04-15',
      excerpt: '邀請有開發經驗的同學報名成為我們的技術講者，分享你的專案經驗與技術心得...',
      tags: ['notice'],
      isPinned: false
    }
  ] : announcements;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* 頂部橫幅 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
          <h1 className="text-3xl font-bold mb-2 relative z-10">GDG 公告中心</h1>
          <p className="text-blue-100 max-w-2xl relative z-10">
            在這裡查看所有關於 GDG on Campus NKNU 的最新公告、活動資訊和重要通知。
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 主要內容區 */}
          <div className="flex-1 space-y-6">
            {/* 搜尋 + 篩選 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <h2 className="text-xl font-semibold">搜尋與篩選</h2>
              <SearchBar onSearch={kw => { setKeyword(kw); setPage(1) }} />
              <FilterPanel
                filters={availableTags}
                selected={tags}
                onToggle={tag => {
                  setTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  )
                  setPage(1)
                }}
              />
            </motion.div>

            {/* 錯誤或 Loading */}
            {error && <NotificationToast message={error} type="error" />}
            {loading ? (
              <div className="flex justify-center p-12">
                <LoadingSpinner size={16} />
              </div>
            ) : (
              <>
                {/* 公告列表 */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {dummyAnnouncements.map((a, index) => (
                    <motion.div key={a.id} variants={item} whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
                      <PostCard
                        title={a.title}
                        date={new Date(a.date).toLocaleDateString()}
                        excerpt={a.excerpt}
                        tags={a.tags}
                        isPinned={a.isPinned}
                      />
                    </motion.div>
                  ))}

                  {dummyAnnouncements.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <p className="text-gray-500">沒有符合條件的公告</p>
                    </div>
                  )}
                </motion.div>

                {/* 分頁 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="py-6"
                >
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages || 1}
                    onPageChange={p => setPage(p)}
                  />
                </motion.div>
              </>
            )}
          </div>

          {/* 側邊欄 */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-80 space-y-6"
          >
            {/* 置頂公告 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                置頂公告
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-500 pl-4 py-1">
                  <h4 className="font-medium text-gray-800">本學期徵才考核開始</h4>
                  <p className="text-xs text-gray-500">2025-04-10</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-1">
                  <h4 className="font-medium text-gray-800">校際技術交流活動報名</h4>
                  <p className="text-xs text-gray-500">2025-04-05</p>
                </div>
              </div>
            </div>

            {/* 最新活動 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                最新活動
              </h3>
              <div className="space-y-3">
                <a href="/events/1" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
                  <h4 className="font-medium text-blue-600">Android 開發入門工作坊</h4>
                  <p className="text-xs text-gray-500">2025-05-10</p>
                </a>
                <a href="/events/2" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
                  <h4 className="font-medium text-blue-600">Flutter 跨平台開發分享會</h4>
                  <p className="text-xs text-gray-500">2025-05-15</p>
                </a>
              </div>
              <div className="mt-4 text-center">
                <a href="/events" className="text-blue-600 text-sm hover:underline">查看所有活動 →</a>
              </div>
            </div>

            {/* 訂閱 */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-4">訂閱通知</h3>
              <p className="text-blue-100 text-sm mb-4">訂閱我們的最新公告，直接發送到你的信箱!</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="你的電子信箱"
                  className="flex-1 rounded-l-lg px-4 py-2 text-gray-800 text-sm focus:outline-none"
                />
                <button className="bg-white text-blue-600 rounded-r-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 transition">
                  訂閱
                </button>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
