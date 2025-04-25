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
import { useEventData } from '../hooks/useEventData'

export default function EventsPage() {
  const [keyword, setKeyword] = useState('')
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'calendar'
  const [selectedMonth, setSelectedMonth] = useState(new Date()) // 追蹤選擇的月份

  // 當視圖模式改變時重置一些狀態
  useEffect(() => {
    if (viewMode === 'grid') {
      setPage(1); // 重置到第一頁

      // 可以考慮添加一個強制重新獲取資料的機制
      // 或者保留當前篩選條件，因為用戶可能想在不同視圖下保持相同的篩選條件
      console.log('切換到網格視圖，當前篩選條件:', { keyword, tags });
    } else {
      console.log('切換到月曆視圖，當前篩選條件:', { keyword, tags });
    }
  }, [viewMode]);

  // 使用 hook 獲取所有活動資料 - 針對網格視圖
  const { events, loading, error, totalPages } = useEventData({
    page,
    limit: 8,
    keyword,
    tags,
    sort: 'desc', // 添加排序參數，確保從新到舊排序
    future: undefined // 對網格視圖不限制未來活動
  });

  // 使用 hook 獲取所有月曆視圖的活動資料 - 不使用 future 過濾
  const { events: calendarEvents, loading: loadingCalendar } = useEventData({
    page: 1,
    limit: 100, // 較大的限制，確保獲取所有活動
    future: false, // 不過濾過去的活動
    keyword, // 保持關鍵字搜尋
    tags, // 保持標籤篩選
    sort: 'asc' // 月曆視圖按日期升序排序
  });

  // 使用 hook 獲取即將到來的活動 (不受搜尋和標籤篩選影響)
  const {
    events: upcomingEvents,
    loading: loadingUpcoming
  } = useEventData({
    page: 1,
    limit: 3,
    future: true, // 只顯示未來的活動
    sort: 'asc' // 從最近到最遠排序
  })

  const availableTags = [
    { label: '線上', value: 'online' },
    { label: '實體', value: 'offline' },
    { label: '工作坊', value: 'workshop' },
    { label: '分享會', value: 'talk' },
  ]

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

  // 取得標籤的中文名稱函數
  const getTagLabel = (tagValue) => {
    const tag = availableTags.find(t => t.value === tagValue);
    return tag ? tag.label : tagValue;
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
                  {/* 清除篩選按鈕 */}
                  {(keyword || tags.length > 0) && (
                    <button
                      onClick={() => {
                        setKeyword('');
                        setTags([]);
                        setPage(1);
                      }}
                      className="text-sm text-gray-500 hover:text-red-500 mr-2 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      清除篩選
                    </button>
                  )}

                  {/* 添加重新載入按鈕 */}
                  <button
                    onClick={() => {
                      // 強制重新載入
                      setPage(prev => 0); // 先設為不可能的值
                      setTimeout(() => setPage(1), 10); // 然後設回第一頁
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 mr-2 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    重新載入
                  </button>
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
              <SearchBar onSearch={kw => { setKeyword(kw); setPage(1) }} placeholder="搜尋活動..." />
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
                    <CalendarView
                      events={calendarEvents}
                      initialDate={selectedMonth}
                      onMonthChange={(date) => setSelectedMonth(date)} // 添加月份變化追蹤
                      onDayClick={day => console.log(day)}
                    />
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
            {/* 即將到來的活動 - 動態顯示活動資料 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                </svg>
                即將到來的活動
              </h3>

              {loadingUpcoming ? (
                <div className="flex justify-center p-3">
                  <LoadingSpinner size={6} />
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents && upcomingEvents.length > 0 ? (
                    upcomingEvents.map(ev => (
                      <a
                        key={ev.id}
                        href={`/events/${ev.id}`}
                        className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
                      >
                        <h4 className="font-medium text-blue-600">{ev.title}</h4>
                        <p className="text-xs text-gray-500">
                          {new Date(ev.date).toLocaleDateString()}
                        </p>
                        <div className="flex mt-1 gap-1">
                          {ev.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                              {getTagLabel(tag)}
                            </span>
                          ))}
                        </div>
                      </a>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-2">
                      近兩週內沒有活動
                    </p>
                  )}

                  {/* <div className="mt-4 text-center">
                    <a href="/events" className="text-blue-600 text-sm hover:underline">查看所有活動 →</a>
                  </div> */}
                </div>
              )}
            </div>

            {/* 其他側邊欄內容保持不變 */}
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
