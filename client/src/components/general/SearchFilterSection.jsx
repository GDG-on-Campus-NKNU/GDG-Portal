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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg shadow-md p-6 space-y-4"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">搜尋與篩選</h2>
        <div className="flex items-center space-x-2">
          {/* 清除篩選按鈕 */}
          {(keyword || tags.length > 0) && (
            <button
              onClick={onClearFilters}
              className="text-sm text-gray-500 hover:text-red-500 mr-2 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              清除篩選
            </button>
          )}

          {/* 重新載入按鈕 */}
          <button
            onClick={onReload}
            className="text-sm text-blue-600 hover:text-blue-800 mr-2 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            重新載入
          </button>
        </div>
      </div>
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
    </motion.div>
  );
}
