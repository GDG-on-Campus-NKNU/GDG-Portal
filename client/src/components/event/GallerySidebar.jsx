import { motion } from 'framer-motion';
import GalleryStats from './GalleryStats';
import GalleryTags from './GalleryTags';

export default function GallerySidebar({ galleries, eventTypes, totalImages, stats, onTagClick }) {
  // 側邊欄滑入動畫
  const slideInVariants = {
    hidden: {
      opacity: 0,
      x: 50
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  };

  return (
    <motion.aside
      variants={slideInVariants}
      initial="hidden"
      animate="show"
      className="w-full xl:w-80 xl:min-w-80 xl:flex-shrink-0 space-y-4"
    >
      {/* 標籤雲 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <GalleryTags galleries={galleries} onTagClick={onTagClick} />
      </motion.div>

      {/* 統計資訊 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <GalleryStats
          galleries={galleries}
          totalImages={totalImages}
          eventTypes={eventTypes}
        />
      </motion.div>
    </motion.aside>
  );
}
