import { motion } from 'framer-motion';

export default function PopularGalleries({ galleries }) {
  // 根據圖片數量和日期計算熱門度
  const getPopularityScore = (gallery) => {
    const imageWeight = 0.7;
    const dateWeight = 0.3;
    const maxImages = Math.max(...galleries.map(g => g.imageCount));
    const imageScore = gallery.imageCount / maxImages;
    
    // 計算日期分數（越新越高分）
    const now = new Date();
    const galleryDate = new Date(gallery.date);
    const daysDiff = Math.abs(now - galleryDate) / (1000 * 60 * 60 * 24);
    const maxDays = 365; // 一年內的活動
    const dateScore = Math.max(0, 1 - (daysDiff / maxDays));
    
    return (imageScore * imageWeight) + (dateScore * dateWeight);
  };

  // 獲取熱門相簿（取前5個）
  const popularGalleries = galleries
    .map(gallery => ({
      ...gallery,
      popularityScore: getPopularityScore(gallery)
    }))
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const GalleryItem = ({ gallery, rank }) => {
    const rankColors = {
      1: 'from-yellow-400 to-orange-500',
      2: 'from-gray-300 to-gray-400', 
      3: 'from-amber-600 to-amber-700'
    };

    const getRankIcon = (rank) => {
      switch(rank) {
        case 1: return '🥇';
        case 2: return '🥈';
        case 3: return '🥉';
        default: return '🏆';
      }
    };

    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02, x: 4 }}
        className="group cursor-pointer"
      >
        <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-all duration-300">
          {/* 排名標籤 */}
          <div className="relative">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${rankColors[rank] || 'from-indigo-500 to-purple-600'} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
              {rank}
            </div>
            <div className="absolute -top-1 -right-1 text-sm">
              {getRankIcon(rank)}
            </div>
          </div>

          {/* 相簿封面 */}
          <div className="relative">
            <img 
              src={gallery.coverImage} 
              alt={gallery.title}
              className="w-12 h-12 rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
            />
            {/* 照片數量標籤 */}
            <div className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {gallery.imageCount}
            </div>
          </div>

          {/* 相簿資訊 */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
              {gallery.title}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-slate-500">
                {new Date(gallery.date).toLocaleDateString('zh-TW')}
              </span>
              <div className="flex items-center space-x-1">
                {gallery.tags.slice(0, 2).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-1.5 py-0.5 bg-indigo-100 text-indigo-600 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 熱門度指示器 */}
          <div className="flex flex-col items-center">
            <div className="text-lg">🔥</div>
            <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
                style={{ width: `${gallery.popularityScore * 100}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (popularGalleries.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-sm">
            🔥
          </div>
          <h3 className="text-lg font-bold text-slate-800">熱門相簿</h3>
        </div>
        <div className="text-center py-8 text-slate-500">
          <div className="text-4xl mb-2">📷</div>
          <div className="text-sm">暫無相簿資料</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
    >
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-sm">
          🔥
        </div>
        <h3 className="text-lg font-bold text-slate-800">熱門相簿</h3>
      </div>

      <div className="space-y-2">
        {popularGalleries.map((gallery, index) => (
          <GalleryItem 
            key={gallery.id} 
            gallery={gallery} 
            rank={index + 1}
          />
        ))}
      </div>

      {/* 查看更多 */}
      <motion.div
        variants={itemVariants}
        className="mt-4 pt-4 border-t border-slate-200/50"
      >
        <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium py-2 rounded-lg hover:bg-indigo-50/50 transition-all duration-300">
          查看所有相簿 →
        </button>
      </motion.div>
    </motion.div>
  );
}
