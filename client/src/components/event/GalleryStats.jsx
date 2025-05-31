import { motion } from 'framer-motion';

export default function GalleryStats({ galleries, totalImages, eventTypes }) {
  // 計算統計數據
  const totalGalleries = galleries.length;
  const totalEvents = eventTypes.length;
  const averageImagesPerGallery = totalGalleries > 0 ? Math.round(totalImages / totalGalleries) : 0;

  // 各類型活動數量統計
  const eventTypeStats = eventTypes.map(type => ({
    type: type.id,
    name: type.name,
    count: galleries.filter(gallery => gallery.eventType === type.id).length,
    color: type.color
  }));

  // 最新活動
  const latestGallery = galleries.length > 0 
    ? galleries.sort((a, b) => new Date(b.date) - new Date(a.date))[0]
    : null;

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const StatCard = ({ icon, value, label, color = "indigo" }) => (
    <motion.div
      variants={statsVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-white/40 shadow-md"
    >
      <div className="flex items-center space-x-2">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-${color}-500 to-${color}-600 flex items-center justify-center text-white text-sm shadow-md`}>
          {icon}
        </div>
        <div>
          <div className="text-xl font-bold text-slate-800">{value}</div>
          <div className="text-xs text-slate-600">{label}</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        show: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20"
    >
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs">
          📊
        </div>
        <h3 className="text-base font-bold text-slate-800">相簿統計</h3>
      </div>

      <div className="space-y-3">
        <StatCard
          icon="🖼️"
          value={totalGalleries}
          label="活動相簿"
          color="purple"
        />
        
        <StatCard
          icon="📷"
          value={totalImages}
          label="總照片數"
          color="blue"
        />
        
        <StatCard
          icon="🎯"
          value={totalEvents}
          label="活動類型"
          color="green"
        />
        
        <StatCard
          icon="📈"
          value={averageImagesPerGallery}
          label="平均照片數"
          color="orange"
        />
      </div>

      {/* 活動類型分佈 */}
      {eventTypeStats.length > 0 && (
        <motion.div variants={statsVariants} className="mt-4 pt-4 border-t border-slate-200/50">
          <h4 className="text-xs font-semibold text-slate-700 mb-2">活動類型分佈</h4>
          <div className="space-y-1">
            {eventTypeStats.map((stat) => (
              <div key={stat.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: stat.color }}
                  />
                  <span className="text-xs text-slate-600">{stat.name}</span>
                </div>
                <span className="text-xs font-medium text-slate-800">{stat.count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 最新活動 */}
      {latestGallery && (
        <motion.div variants={statsVariants} className="mt-4 pt-4 border-t border-slate-200/50">
          <h4 className="text-xs font-semibold text-slate-700 mb-2">最新活動</h4>
          <div className="flex items-center space-x-2">
            <img 
              src={latestGallery.coverImage} 
              alt={latestGallery.title}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-800 truncate">
                {latestGallery.title}
              </div>
              <div className="text-xs text-slate-500">
                {new Date(latestGallery.date).toLocaleDateString('zh-TW')}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
