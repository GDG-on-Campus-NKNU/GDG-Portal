import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GalleryFilterSection({
  filters,
  onFiltersChange,
  onClearFilters,
  eventTypes,
  years
}) {
  const [keyword, setKeyword] = useState(filters.keyword);

  const handleKeywordChange = (value) => {
    setKeyword(value);
    onFiltersChange({ ...filters, keyword: value });
  };

  const handleEventTypeChange = (value) => {
    onFiltersChange({ ...filters, eventType: value });
  };

  const handleYearChange = (value) => {
    onFiltersChange({ ...filters, year: value });
  };

  const hasActiveFilters = filters.keyword || filters.eventType || filters.year || filters.tags.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* 搜尋框 */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="搜尋相簿..."
              value={keyword}
              onChange={(e) => handleKeywordChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200/50 rounded-xl bg-white/80 backdrop-blur-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
            />
          </div>
        </div>

        {/* 活動類型篩選 */}
        <div className="lg:w-48">
          <select
            value={filters.eventType}
            onChange={(e) => handleEventTypeChange(e.target.value)}
            className="block w-full px-3 py-3 border border-slate-200/50 rounded-xl bg-white/80 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
          >
            <option value="">所有活動類型</option>
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* 年份篩選 */}
        <div className="lg:w-32">
          <select
            value={filters.year}
            onChange={(e) => handleYearChange(e.target.value)}
            className="block w-full px-3 py-3 border border-slate-200/50 rounded-xl bg-white/80 backdrop-blur-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
          >
            <option value="">所有年份</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 清除篩選按鈕 */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center pt-2"
        >
          <div className="flex flex-wrap gap-2">
            {filters.eventType && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                類型: {eventTypes.find(t => t.value === filters.eventType)?.label}
                <button
                  onClick={() => handleEventTypeChange('')}
                  className="ml-1 text-indigo-600 hover:text-indigo-800"
                >
                  ×
                </button>
              </span>
            )}
            {filters.year && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                年份: {filters.year}
                <button
                  onClick={() => handleYearChange('')}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
          
          <motion.button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 bg-slate-100/80 hover:bg-slate-200/80 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            清除所有篩選
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
