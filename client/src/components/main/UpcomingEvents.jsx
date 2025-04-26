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
    const colors = ['border-blue-500', 'border-green-500', 'border-purple-500', 'border-red-500', 'border-orange-500']
    return colors[index % colors.length]
  }

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-center p-6">
          <LoadingSpinner size={12} />
        </div>
      </div>
    )
  }

  if (error && events.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-center text-red-500">載入活動失敗</p>
      </div>
    )
  }

  return (
    <motion.section
      className="bg-white shadow-md rounded-lg p-6 mb-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {showTitle && (
        <motion.h2 variants={item} className="text-xl font-bold text-gray-800 mb-4">
          即將到來的活動
        </motion.h2>
      )}

      <div className="space-y-4">
        {events.length > 0 ?
          events.map((event, index) => (
            <motion.div
              key={event.id}
              variants={item}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <Link to={`/events/${event.id}`} className="block">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-blue-200 transition-all cursor-pointer">
                  <div className={`border-l-4 ${getBorderColor(index)} pl-3`}>
                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{event.excerpt}</p>

                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full"
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
          <motion.p variants={item} className="text-center text-gray-500">
            近期沒有活動
          </motion.p>
        )}
      </div>

      <motion.div variants={item} className="flex justify-end mt-4">
        <a
          href="/events"
          className="text-blue-600 hover:underline"
        >
          查看所有活動 →
        </a>
      </motion.div>
    </motion.section>
  )
}
