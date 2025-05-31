import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GalleryTags({ galleries, onTagClick }) {
  const [hoveredTag, setHoveredTag] = useState(null);

  // 收集所有標籤並計算使用頻率
  const tagFrequency = galleries.reduce((acc, gallery) => {
    gallery.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  // 按使用頻率排序標籤
  const sortedTags = Object.entries(tagFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20); // 只顯示前20個標籤

  // 計算標籤大小（基於使用頻率）
  const getTagSize = (frequency) => {
    const maxFreq = Math.max(...Object.values(tagFrequency));
    const minFreq = Math.min(...Object.values(tagFrequency));
    const ratio = (frequency - minFreq) / (maxFreq - minFreq);
    
    if (ratio > 0.8) return { size: 'text-sm', padding: 'px-3 py-1.5' };
    if (ratio > 0.6) return { size: 'text-sm', padding: 'px-2 py-1' };
    if (ratio > 0.4) return { size: 'text-xs', padding: 'px-2 py-1' };
    return { size: 'text-xs', padding: 'px-2 py-0.5' };
  };

  // 標籤顏色配置
  const tagColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500', 
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-cyan-500 to-blue-500',
    'from-emerald-500 to-teal-500',
    'from-yellow-500 to-orange-500',
    'from-red-500 to-pink-500'
  ];

  const getTagColor = (index, frequency) => {
    const maxFreq = Math.max(...Object.values(tagFrequency));
    if (frequency === maxFreq) {
      return 'from-yellow-400 to-orange-500'; // 最熱門標籤使用金色
    }
    return tagColors[index % tagColors.length];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15
      }
    }
  };

  const TagItem = ({ tag, frequency, index }) => {
    const { size, padding } = getTagSize(frequency);
    const gradientColor = getTagColor(index, frequency);
    const isPopular = frequency === Math.max(...Object.values(tagFrequency));

    return (
      <motion.button
        variants={tagVariants}
        whileHover={{ 
          scale: 1.1, 
          y: -2,
          transition: { type: "spring", stiffness: 300, damping: 10 }
        }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setHoveredTag(tag)}
        onMouseLeave={() => setHoveredTag(null)}
        onClick={() => onTagClick && onTagClick(tag)}
        className={`
          relative inline-flex items-center justify-center ${size} ${padding}
          bg-gradient-to-r ${gradientColor}
          text-white font-medium rounded-full
          shadow-lg hover:shadow-xl
          transition-all duration-300
          cursor-pointer select-none
          ${isPopular ? 'ring-2 ring-yellow-300 ring-opacity-50' : ''}
        `}
      >
        {/* 流行標籤的特殊效果 */}
        {isPopular && (
          <div className="absolute -top-1 -right-1 text-xs">⭐</div>
        )}
        
        <span className="relative z-10">{tag}</span>
        
        {/* 使用次數標籤 */}
        <span className="ml-1 px-1 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
          {frequency}
        </span>

        {/* 懸停時的工具提示效果 */}
        {hoveredTag === tag && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap z-20"
          >
            點擊篩選 {frequency} 個相簿
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45" />
          </motion.div>
        )}
      </motion.button>
    );
  };

  if (sortedTags.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm">
            🏷️
          </div>
          <h3 className="text-lg font-bold text-slate-800">熱門標籤</h3>
        </div>
        <div className="text-center py-8 text-slate-500">
          <div className="text-4xl mb-2">🏷️</div>
          <div className="text-sm">暫無標籤資料</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-xs">
            🏷️
          </div>
          <h3 className="text-base font-bold text-slate-800">熱門標籤</h3>
        </div>
        <div className="text-xs text-slate-500">
          {sortedTags.length} 個標籤
        </div>
      </div>

      {/* 標籤雲 */}
      <div className="flex flex-wrap gap-1.5 relative">
        {sortedTags.map(([tag, frequency], index) => (
          <TagItem 
            key={tag}
            tag={tag}
            frequency={frequency}
            index={index}
          />
        ))}
      </div>

      {/* 使用說明 */}
      <motion.div
        variants={tagVariants}
        className="mt-3 pt-3 border-t border-slate-200/50"
      >
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>⭐ 最熱門</span>
            <span>🔢 使用次數</span>
          </div>
          <span>點擊標籤進行篩選</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
