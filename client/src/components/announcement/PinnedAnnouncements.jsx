import { motion } from 'framer-motion';
import LoadingSpinner from '../general/LoadingSpinner';

export default function PinnedAnnouncements({ pinnedAnnouncements, loading }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
    >
      {/* 標題區域 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 
                      rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">置頂公告</h3>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <LoadingSpinner size={8} />
        </div>
      ) : (
        <div className="space-y-4">
          {pinnedAnnouncements && pinnedAnnouncements.length > 0 ? (
            pinnedAnnouncements.map((announcement, index) => (
              <motion.a
                key={announcement.id}
                href={`/announcements/${announcement.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="block bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm 
                         border border-white/30 rounded-xl p-4 hover:from-blue-50/90 hover:to-purple-50/90 
                         transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-start gap-3">
                  {/* 置頂圖標 */}
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 
                                rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>

                  {/* 內容區域 */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-blue-600 
                                 transition-colors duration-200 line-clamp-2">
                      {announcement.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs text-slate-600 font-medium">
                        {new Date(announcement.date).toLocaleDateString('zh-TW')}
                      </span>
                    </div>

                    {/* 標籤 */}
                    {announcement.tags && announcement.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {announcement.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-yellow-100/80 text-yellow-700 
                                     rounded-full border border-yellow-200/50"
                          >
                            {tag === 'welcome' ? '歡迎' :
                             tag === 'community' ? '社群' :
                             tag === 'event' ? '活動' :
                             tag === 'frontend' ? '前端' : tag}
                          </span>
                        ))}
                        {announcement.tags.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-slate-100/80 text-slate-600 
                                         rounded-full border border-slate-200/50">
                            +{announcement.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 箭頭圖標 */}
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center 
                                text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 
                                transition-all duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-slate-300 to-slate-400 
                            rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm text-slate-600 font-medium">目前沒有置頂公告</p>
            </motion.div>
          )}

          {/* 查看所有公告連結 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-4 border-t border-white/20"
          >
            <a 
              href="/announcements" 
              className="flex items-center justify-center gap-2 text-blue-600 text-sm 
                       font-medium hover:text-blue-700 transition-colors duration-200 
                       group"
            >
              <span>查看所有公告</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
