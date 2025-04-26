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
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {announcements.map(a => (
        <motion.div key={a.id} variants={item} whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
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
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">沒有符合條件的公告</p>
        </div>
      )}
    </motion.div>
  );
}
