import { motion } from 'framer-motion';
import GalleryCard from './GalleryCard';

export default function GalleryGrid({
  galleries,
  onImageClick,
  containerVariants,
  itemVariants
}) {
  if (galleries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20"
      >
        <div className="text-6xl mb-4">📸</div>
        <h3 className="text-xl text-slate-600 font-medium mb-2">
          沒有找到相簿
        </h3>
        <p className="text-slate-500">
          請調整搜尋條件或稍後再試
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {galleries.map((gallery, index) => (
        <motion.div
          key={gallery.id}
          variants={itemVariants}
          className="h-full"
        >
          <GalleryCard
            gallery={gallery}
            onImageClick={onImageClick}
            index={index}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
