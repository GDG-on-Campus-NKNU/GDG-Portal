import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Navbar } from '../components/general/Navbar';
import { Footer } from '../components/Footer';
import { BackgroundEffects } from '../components/general/BackgroundEffects';
import { ScrollEffects } from '../components/general/ScrollEffects';
import LoadingSpinner from '../components/general/LoadingSpinner';
import { useAnnouncementDetail } from '../hooks/useAnnouncementData';

export default function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { announcement, loading, error } = useAnnouncementDetail(id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 動畫變體
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // 處理返回按鈕點擊
  const handleBack = () => {
    navigate('/announcements');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-slate-800 relative overflow-hidden">
      {/* 動態背景效果 */}
      <BackgroundEffects />
      <ScrollEffects />
      <Navbar />
      
      <motion.main 
        className="flex-1 w-full max-w-5xl mx-auto px-6 lg:px-8 py-8 relative z-10"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh] bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl"
          >
            <LoadingSpinner size={16} />
            <p className="text-slate-500 mt-4">載入公告內容中...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl border border-red-200/50 rounded-3xl p-12 text-center shadow-xl"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">找不到公告內容</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
              {error === "Announcement not found" ? 
                "抱歉，您查找的公告可能已被刪除或不存在。" : 
                "載入公告時發生錯誤，請稍後再試。"
              }
            </p>
            <motion.button
              onClick={handleBack}
              whileHover={{ scale: 1.02, backgroundColor: "rgb(59 130 246)" }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl font-medium shadow-lg transition-all duration-200"
            >
              返回公告列表
            </motion.button>
          </motion.div>
        ) : announcement ? (
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            {/* 返回按鈕 */}
            <motion.div variants={itemVariants}>
              <motion.button
                onClick={handleBack}
                whileHover={{ scale: 1.02, x: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium bg-white/70 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回公告列表
              </motion.button>
            </motion.div>

            {/* 主要內容區域 */}
            <motion.article 
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl overflow-hidden"
            >
              {/* 標題區域 */}
              <div className="p-8 lg:p-12 border-b border-slate-200/50 bg-gradient-to-br from-white/90 to-slate-50/70">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    {/* 置頂標籤 */}
                    {announcement.isPinned && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-xl font-medium mb-4 shadow-lg"
                      >
                        <motion.svg 
                          className="w-4 h-4"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </motion.svg>
                        置頂公告
                      </motion.div>
                    )}
                    
                    {/* 標題 */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4 leading-tight">
                      {announcement.title}
                    </h1>
                    
                    {/* 標籤 */}
                    {announcement.tags && announcement.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {announcement.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200/50 rounded-xl text-sm font-medium shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* 日期資訊 */}
                  <div className="flex flex-col lg:items-end gap-2 text-slate-600 lg:text-right">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">發布日期</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-700">
                      {new Date(announcement.date).toLocaleDateString('zh-TW', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'short'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* 內容區域 */}
              <div className="p-8 lg:p-12">
                <div 
                  className="prose prose-slate max-w-none
                    prose-headings:text-slate-800 prose-headings:font-bold
                    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                    prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-lg
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline
                    prose-strong:text-slate-800 prose-strong:font-semibold
                    prose-ul:text-slate-700 prose-ol:text-slate-700
                    prose-li:text-slate-700 prose-li:leading-relaxed
                    prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl
                    prose-code:bg-slate-100 prose-code:text-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
                    prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-pre:rounded-xl
                    prose-img:rounded-xl prose-img:shadow-lg
                    prose-hr:border-slate-300"
                  dangerouslySetInnerHTML={{ 
                    __html: announcement.content || announcement.description || '內容暫時無法顯示' 
                  }}
                />
              </div>
            </motion.article>

            {/* 相關操作區域 */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-2 text-slate-600">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">
                  如有問題，請聯繫管理員
                </span>
              </div>
              
              <motion.button
                onClick={handleBack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-medium shadow-lg transition-all duration-200"
              >
                返回公告列表
              </motion.button>
            </motion.div>
          </motion.div>
        ) : null}
      </motion.main>
      
      <Footer />
    </div>
  )
}
