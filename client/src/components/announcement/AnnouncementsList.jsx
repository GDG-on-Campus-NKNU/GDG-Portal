// components/announcements/AnnouncementsList.jsx
import { motion } from 'framer-motion';
import { PostCard } from '../general/Postcard';

export default function AnnouncementsList({ announcements }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {announcements.map(a => (
        <motion.div 
          key={a.id} 
          variants={item} 
          whileHover={{ 
            scale: 1.02, 
            y: -4,
            transition: { duration: 0.3, ease: "easeOut" } 
          }}
          className="h-full"
        >
          <PostCard
            id={a.id}
            title={a.title}
            date={new Date(a.date).toLocaleDateString()}
            excerpt={a.excerpt}
            tags={a.tags}
            isPinned={a.isPinned}
          />
        </motion.div>
      ))}

      {announcements.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20"
        >
          <div className="text-6xl mb-4">📢</div>
          <p className="text-xl text-slate-600 font-medium">
            目前沒有符合條件的公告
          </p>
          <p className="text-slate-500 mt-2">
            請調整搜尋條件或稍後再試
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
