import { motion } from 'framer-motion'
import { useEventData } from '../../hooks/useEventData'
import LoadingSpinner from '../general/LoadingSpinner'
import { Link } from 'react-router-dom'

export function UpcomingEvents({ limit = 3, showTitle = true }) {
  const { events, loading, error } = useEventData({
    page: 1,
    limit,
    future: true // 只顯示未來的活動
  })

  // 動畫設定
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

  const getBorderColor = (index) => {
    const colors = ['border-blue-500', 'border-green-500', 'border-purple-500', 'border-red-500', 'border-yellow-500']
    return colors[index % colors.length]
  }

  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-xl overflow-hidden"
      >
        {showTitle && (
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-6 tracking-tight">
            即將到來的活動
          </h2>
        )}
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size={12} />
          <p className="text-slate-500 mt-4 text-sm">載入中...</p>
        </div>
        {/* 背景裝飾 */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-xl"></div>
      </motion.section>
    )
  }

  if (error && events.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-xl overflow-hidden"
      >
        {showTitle && (
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-6 tracking-tight">
            即將到來的活動
          </h2>
        )}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">載入活動時發生錯誤</h3>
          <p className="text-slate-500 text-sm text-center">請稍後再試或聯繫管理員</p>
        </div>
        {/* 背景裝飾 */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-400/10 to-transparent rounded-full blur-xl"></div>
      </motion.section>
    )
  }

  return (
    <motion.section
      className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-xl hover:shadow-2xl transform hover:scale-[1.01] transition-all duration-300 overflow-hidden"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {showTitle && (
        <motion.h2 variants={item} className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-4 tracking-tight">
          即將到來的活動
        </motion.h2>
      )}

      {/* 背景裝飾 */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-xl"></div>

      <div className="space-y-4">
        {events.length > 0 ?
          events.map((event, index) => (
            <motion.div
              key={event.id}
              variants={item}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <Link to={`/events/${event.id}`} className="block">
                <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-2xl p-4 border border-slate-200/50 hover:border-blue-300/50 transition-all cursor-pointer backdrop-blur-sm">
                  <div className={`border-l-4 ${getBorderColor(index)} pl-3`}>
                    <h3 className="font-semibold text-slate-800">{event.title}</h3>
                    <div className="flex items-center text-sm text-slate-600 mt-1">
                      <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleString('zh-TW', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{event.excerpt}</p>

                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        : (
          <motion.p variants={item} className="text-center text-slate-500">
            近期沒有活動
          </motion.p>
        )}
      </div>

      <motion.div variants={item} className="flex justify-end mt-4">
        <a
          href="/events"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          查看所有活動 →
        </a>
      </motion.div>
    </motion.section>
  )
}
