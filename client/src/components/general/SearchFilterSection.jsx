// components/announcements/SearchFilterSection.jsx
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';

export default function SearchFilterSection({
  placeholder,
  keyword,
  setKeyword,
  tags,
  setTags,
  setPage,
  availableTags,
  onClearFilters,
  onReload
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mr-3 shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            搜尋與篩選
          </h2>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* 清除篩選按鈕 */}
          {(keyword || tags.length > 0) && (
            <motion.button
              onClick={onClearFilters}
              className="group flex items-center px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-500 bg-white/60 hover:bg-red-50/80 backdrop-blur-sm rounded-xl border border-white/30 hover:border-red-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4 mr-2 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              清除篩選
            </motion.button>
          )}

          {/* 重新載入按鈕 */}
          <motion.button
            onClick={onReload}
            className="group flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-100/80 backdrop-blur-sm rounded-xl border border-blue-200/30 hover:border-blue-300/50 shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4 mr-2 transform group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            重新載入
          </motion.button>
        </div>
      </div>
      
      <div className="space-y-4">
        <SearchBar onSearch={kw => { setKeyword(kw); setPage(1) }} placeholder={placeholder} />
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
      </div>
    </motion.div>
  );
}
