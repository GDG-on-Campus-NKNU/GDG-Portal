import { motion } from 'framer-motion'
import { useAnnouncementData } from '../../hooks/useAnnouncementData'
import { PostCard } from '../general/Postcard'
import LoadingSpinner from '../general/LoadingSpinner'

export function RecentAnnouncements({ limit = 2, showTitle = true }) {
  const { announcements, loading, error } = useAnnouncementData({
    page: 1,
    limit,
    tags: []
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

  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-xl overflow-hidden"
      >
        {showTitle && (
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tight">
            最新公告
          </h2>
        )}
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size={12} />
          <p className="text-slate-500 mt-4 text-sm">載入中...</p>
        </div>
        {/* 背景裝飾 */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-xl"></div>
      </motion.section>
    )
  }

  if (error && announcements.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-xl overflow-hidden"
      >
        {showTitle && (
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tight">
            最新公告
          </h2>
        )}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">載入公告時發生錯誤</h3>
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
        <motion.h2 variants={item} className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight">
          最新公告
        </motion.h2>
      )}

      {/* 背景裝飾 */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-xl"></div>

      <div className="space-y-4">
        {announcements.length > 0 ? (
          announcements.map(announcement => (
            <motion.div
              key={announcement.id}
              variants={item}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            >
              <PostCard
                id={announcement.id}
                title={announcement.title}
                date={new Date(announcement.date).toLocaleDateString()}
                excerpt={announcement.excerpt}
                tags={announcement.tags}
                isPinned={announcement.isPinned}
              />
            </motion.div>
          ))
        ) : (
          <motion.p variants={item} className="text-center text-slate-500">
            目前沒有公告
          </motion.p>
        )}
      </div>

      <motion.div variants={item} className="flex justify-end mt-4">
        <a
          href="/announcements"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          查看全部公告 →
        </a>
      </motion.div>
    </motion.section>
  )
}
