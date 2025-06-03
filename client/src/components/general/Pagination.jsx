import { motion } from 'framer-motion'

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) {
  const createRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = [];
  const left = Math.max(1, currentPage - siblingCount);
  const right = Math.min(totalPages, currentPage + siblingCount);

  pages.push(...createRange(left, right));

  if (totalPages <= 1) return null;

  return (
    <motion.nav 
      className="flex items-center justify-center space-x-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group flex items-center px-4 py-3 bg-white/70 backdrop-blur-xl border border-white/30 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 hover:border-blue-200/50 transition-all duration-300 shadow-lg hover:shadow-xl"
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
      >
        <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium text-slate-700">上一頁</span>
      </motion.button>

      <div className="flex items-center space-x-2">
        {pages.map((p, index) => (
          <motion.button
            key={p}
            onClick={() => onPageChange(p)}
            className={`
              relative px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-xl border
              ${p === currentPage 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-300/30' 
                : 'bg-white/70 text-slate-700 border-white/30 hover:bg-white/90 hover:border-blue-200/50'
              }
            `}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ 
              scale: 1.1,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            {p === currentPage && (
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
            <span className="relative">{p}</span>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group flex items-center px-4 py-3 bg-white/70 backdrop-blur-xl border border-white/30 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 hover:border-blue-200/50 transition-all duration-300 shadow-lg hover:shadow-xl"
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
      >
        <span className="font-medium text-slate-700">下一頁</span>
        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.nav>
  );
}
