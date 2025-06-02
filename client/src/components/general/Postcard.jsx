import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function PostCard({
  id,
  title,
  date,
  excerpt,
  tags = [],
  isPinned = false
}) {
  const navigate = useNavigate();

  const handleReadMore = (e) => {
    e.preventDefault();
    navigate(`/announcements/${id}`);
  };

  return (
    <motion.article 
      className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl 
               p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative 
               overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* 置頂標籤 */}
      {isPinned && (
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 
                   text-white rounded-full p-2 shadow-lg z-10" 
          title="置頂公告"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </motion.div>
      )}

      {/* 內容區域 */}
      <div className="relative z-10">
        {/* 標題與日期 */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800 mb-2 leading-tight 
                       group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h2>
          <div className="flex items-center gap-2 text-slate-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">{date}</span>
          </div>
        </div>

        {/* 摘要 */}
        <p className="text-slate-700 leading-relaxed mb-4 line-clamp-3">{excerpt}</p>

        {/* 標籤 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  tag === 'welcome' ? 'bg-blue-100/80 text-blue-700 border border-blue-200/50' :
                  tag === 'community' ? 'bg-purple-100/80 text-purple-700 border border-purple-200/50' :
                  tag === 'event' ? 'bg-green-100/80 text-green-700 border border-green-200/50' :
                  tag === 'frontend' ? 'bg-yellow-100/80 text-yellow-700 border border-yellow-200/50' :
                  'bg-slate-100/80 text-slate-700 border border-slate-200/50'
                }`}
              >
                {tag === 'welcome' ? '歡迎' :
                 tag === 'community' ? '社群' :
                 tag === 'event' ? '活動' :
                 tag === 'frontend' ? '前端' : tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* 查看詳情按鈕 */}
        <div className="flex justify-end">
          <motion.button
            onClick={handleReadMore}
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                     text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl 
                     transition-all duration-300"
          >
            <span>查看詳情</span>
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
