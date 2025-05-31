import { motion } from 'framer-motion';
import { EventTypeInfo, EventGalleryPreview, EventResourceDownload } from './EventInfo';

export default function HEventSidebar() {
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
      className="w-full xl:w-80 xl:min-w-80 xl:flex-shrink-0 space-y-6"
    >
      {/* 關於歷史活動 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
      >
        <EventTypeInfo />
      </motion.div>

      {/* 活動成果展示 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
      >
        <EventGalleryPreview />
      </motion.div>

      {/* 資源下載 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300"
      >
        <EventResourceDownload />
      </motion.div>
    </motion.aside>
  );
}
