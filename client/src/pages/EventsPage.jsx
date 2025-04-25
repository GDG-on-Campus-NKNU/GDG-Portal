import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import SearchBar from '../components/general/SearchBar'
import FilterPanel from '../components/general/FilterPanel'
import LoadingSpinner from '../components/general/LoadingSpinner'
import NotificationToast from '../components/general/NotificationToast'
import Pagination from '../components/general/Pagination'
import EventCard from '../components/event/EventCard'
import CalendarView from '../components/event/CalendarView'

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [keyword, setKeyword] = useState('')
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'calendar'

  const availableTags = [
    { label: '線上', value: 'online' },
    { label: '實體', value: 'offline' },
    { label: '工作坊', value: 'workshop' },
    { label: '分享會', value: 'talk' },
  ]

  // 範例用 Dummy Data
  const dummyEvents = [
    { id: 1, title: 'Android 開發入門工作坊', date: '2025-05-10T18:30:00', location: 'E101 教室', tags: ['offline', 'workshop'], excerpt: '從零開始學習 Android 應用程式開發，適合初學者參加。' },
    { id: 2, title: 'Flutter 跨平台分享會', date: '2025-05-15T18:30:00', location: '線上 Zoom', tags: ['online', 'talk'], excerpt: '了解如何使用 Flutter 開發跨平台應用程式，一次寫程式，到處執行。' },
    { id: 3, title: 'Firebase 後端實作課程', date: '2025-05-20T18:30:00', location: 'E202 教室', tags: ['offline', 'workshop'], excerpt: '學習如何使用 Firebase 建立後端服務，快速開發應用程式。' },
    { id: 4, title: 'Google I/O 2025 觀賞派對', date: '2025-05-25T18:00:00', location: '學生活動中心', tags: ['offline', 'talk'], excerpt: '一起觀看 Google I/O 2025 開發者大會，了解 Google 最新技術和產品。' },
  ]

  const fetchEvents = async () => {
    setLoading(true)
    setError('')
    try {
      // 真實 API 範例： const res = await fetch(`/api/events?page=${page}&keyword=${keyword}&tags=${tags.join(',')}`)
      // const { data, totalPages: tp } = await res.json()
      // setEvents(data)
      // setTotalPages(tp)

      // 暫時用 Dummy
      setTimeout(() => {
        setEvents(dummyEvents.filter(e =>
          (keyword === '' || e.title.toLowerCase().includes(keyword.toLowerCase())) &&
          (tags.length === 0 || tags.some(t => e.tags.includes(t)))
        ))
        setTotalPages(1)
        setLoading(false)
      }, 500) // 模擬載入時間
    } catch (e) {
      setError('載入活動失敗')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [page, keyword, tags])

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

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
          <h1 className="text-3xl font-bold mb-2 relative z-10">GDG 活動中心</h1>
          <p className="text-blue-100 max-w-2xl relative z-10">
            探索 GDG on Campus NKNU 舉辦的各種精彩活動，從工作坊到技術分享會，豐富你的學習體驗。
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 主要內容區 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 space-y-6"
          >
            {/* 搜尋 + 篩選 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">搜尋與篩選</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`p-2 rounded ${viewMode === 'calendar' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
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
                {viewMode === 'grid' ? (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid sm:grid-cols-2 gap-4"
                  >
                    {events.map(ev => (
                      <motion.div
                        key={ev.id}
                        variants={item}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      >
                        <EventCard
                          title={ev.title}
                          date={ev.date}
                          location={ev.location}
                          tags={ev.tags}
                          excerpt={ev.excerpt}
                          onRegister={() => alert(`報名活動 ${ev.id}`)}
                        />
                      </motion.div>
                    ))}
                    {events.length === 0 && (
                      <motion.p
                        variants={item}
                        className="col-span-2 text-center py-12 bg-white rounded-lg shadow-md text-gray-500"
                      >
                        目前沒有符合條件的活動
                      </motion.p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <CalendarView events={events} onDayClick={day => console.log(day)} />
                  </motion.div>
                )}

                {/* 分頁 */}
                {events.length > 0 && viewMode === 'grid' && (
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
                )}
              </>
            )}
          </motion.div>

          {/* 側邊欄 */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-80 space-y-6"
          >
            {/* 即將到來的活動 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                </svg>
                即將到來的活動
              </h3>
              <div className="space-y-3">
                {dummyEvents
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .slice(0, 3)
                  .map(ev => (
                    <a key={ev.id} href={`/events/${ev.id}`} className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition">
                      <h4 className="font-medium text-blue-600">{ev.title}</h4>
                      <p className="text-xs text-gray-500">{new Date(ev.date).toLocaleDateString()}</p>
                      <div className="flex mt-1 gap-1">
                        {ev.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                            {availableTags.find(t => t.value === tag)?.label || tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
              </div>
            </div>

            {/* 活動地點 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                活動地點
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 aspect-video mb-2 flex items-center justify-center text-gray-500">
                校園地圖預覽
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>E101 教室:</strong> 工學院一樓，電梯出口右轉</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>E202 教室:</strong> 工學院二樓，電梯出口左轉</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>學生活動中心:</strong> 圖書館旁，一樓演講廳</span>
                </li>
              </ul>
            </div>

            {/* 訂閱活動 */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-4">訂閱活動通知</h3>
              <p className="text-blue-100 text-sm mb-4">第一時間收到最新活動資訊，不錯過任何一場精彩活動！</p>
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
