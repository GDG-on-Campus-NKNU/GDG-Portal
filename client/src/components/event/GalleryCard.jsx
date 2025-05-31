import { motion } from 'framer-motion';

export default function GalleryCard({ gallery, onImageClick, index }) {
  const getEventTypeColor = (eventType) => {
    const colorMap = {
      workshop: 'from-blue-500 to-blue-600',
      talk: 'from-green-500 to-green-600',
      social: 'from-purple-500 to-purple-600',
      hackathon: 'from-red-500 to-red-600'
    };
    return colorMap[eventType] || 'from-gray-500 to-gray-600';
  };

  const getEventTypeLabel = (eventType) => {
    const labelMap = {
      workshop: '工作坊',
      talk: '技術講座',
      social: '社群聚會',
      hackathon: '黑客松'
    };
    return labelMap[eventType] || eventType;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* 封面圖片 */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-indigo-100">
        <img
          src={gallery.coverImage}
          alt={gallery.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* 圖片數量標籤 */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {gallery.imageCount} 張照片
        </div>

        {/* 活動類型標籤 */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getEventTypeColor(gallery.eventType)} shadow-lg`}>
            {getEventTypeLabel(gallery.eventType)}
          </span>
        </div>

        {/* 日期標籤 */}
        <div className="absolute bottom-3 left-3 text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-lg">
          {formatDate(gallery.date)}
        </div>
      </div>

      {/* 內容區域 */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
          {gallery.title}
        </h3>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {gallery.description}
        </p>

        {/* 標籤 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {gallery.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100/80 text-slate-700"
            >
              {tag}
            </span>
          ))}
          {gallery.tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100/80 text-slate-500">
              +{gallery.tags.length - 3}
            </span>
          )}
        </div>

        {/* 縮圖預覽 */}
        <div className="grid grid-cols-4 gap-1 mb-4">
          {gallery.images.slice(0, 4).map((image, imgIndex) => (
            <motion.button
              key={image.id}
              onClick={() => onImageClick(image, gallery)}
              className="aspect-square rounded-lg overflow-hidden bg-slate-100 hover:ring-2 hover:ring-indigo-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>

        {/* 查看更多按鈕 */}
        <motion.button
          onClick={() => onImageClick(gallery.images[0], gallery)}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 group-hover:from-indigo-600 group-hover:to-purple-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          查看完整相簿
        </motion.button>
      </div>
    </motion.div>
  );
}
