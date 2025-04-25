import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import SearchBar from '../components/general/SearchBar'
import FilterPanel from '../components/general/FilterPanel'
import LoadingSpinner from '../components/general/LoadingSpinner'
import NotificationToast from '../components/general/NotificationToast'
import Pagination from '../components/general/Pagination'
import { PostCard } from '../components/PostCard'
import { useAnnouncementData } from '../hooks/useAnnouncementData' // 引入 hook
import { useEventData } from '../hooks/useEventData'

export default function AnnouncementsPage() {
  const [keyword, setKeyword] = useState('')
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1)

  // 使用 hook 獲取所有公告資料
  const { announcements, loading, error, totalPages } = useAnnouncementData({
    page,
    limit: 5,
    keyword,
    tags
  })

  // 使用 hook 獲取置頂公告 (不受搜尋和標籤篩選影響)
  const { announcements: pinnedAnnouncements, loading: loadingPinned } = useAnnouncementData({
    page: 1,
    limit: 5,  // 最多顯示5則置頂公告
    isPinned: true  // 只獲取置頂公告
  })

  // 新增：使用 hook 獲取即將到來的活動
  const { events: upcomingEvents, loading: loadingUpcoming } = useEventData({
    page: 1,
    limit: 3,
    future: true // 只顯示未來的活動
  })

  const availableTags = [
    { label: '技術', value: 'tech' },
    { label: '活動', value: 'event' },
    { label: '公告', value: 'notice' },
    { label: '課程', value: 'course' },
    { label: '實習', value: 'internship' },
  ]

  const getTagLabel = (tagValue) => {
    const eventTags = [
      { label: '線上', value: 'online' },
      { label: '實體', value: 'offline' },
      { label: '工作坊', value: 'workshop' },
      { label: '分享會', value: 'talk' }
    ]

    const tag = eventTags.find(t => t.value === tagValue)
    return tag ? tag.label : tagValue
  }

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
              <SearchBar onSearch={kw => { setKeyword(kw); setPage(1) }} placeholder="搜尋公告..." />
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
                  {announcements.map(a => (
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

                  {announcements.length === 0 && (
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

          {/* 置頂公告 - 動態顯示真實置頂資料 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            置頂公告
            </h3>

            {loadingPinned ? (
            <div className="flex justify-center p-3">
              <LoadingSpinner size={6} />
            </div>
              ) : (
            <div className="space-y-3">
             {pinnedAnnouncements && pinnedAnnouncements.length > 0 ? (
              pinnedAnnouncements.map(announcement => (
              <a
                key={announcement.id}
                href={`/announcements/${announcement.id}`}
                className="block bg-gray-50 rounded hover:bg-gray-100 transition"
              >
              <div className="border-l-4 border-yellow-500 p-3">
               <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                <p className="text-xs text-gray-500 mt-1">
                 {new Date(announcement.date).toLocaleDateString()}
                </p>
                {announcement.tags && announcement.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {announcement.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                )}
              </div>
            </a>
          ))
       ) : (
          <p className="text-sm text-gray-500 text-center py-2">目前沒有置頂公告</p>
        )}

      <div className="mt-4 text-center">
        <a href="/announcements" className="text-blue-600 text-sm hover:underline">查看所有公告 →</a>
      </div>
    </div>
  )}
</div>

            {/* 最新活動 */}
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

                  <div className="mt-4 text-center">
                    <a href="/events" className="text-blue-600 text-sm hover:underline">查看所有活動 →</a>
                  </div>
                </div>
              )}
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
