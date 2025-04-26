import { motion } from 'framer-motion';
import MemberCard from './MemberCard';
import LoadingSpinner from '../general/LoadingSpinner';
import Pagination from '../general/Pagination';

export default function MemberList({
  members,
  loading,
  error,
  totalPages,
  currentPage,
  onPageChange
}) {
  // 動畫設定
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

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-700 text-center">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <LoadingSpinner size={16} />
      </div>
    );
  }

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {members && members.length > 0 ? (
          members.map(member => (
            <motion.div
              key={member.id}
              variants={item}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <MemberCard
                id={member.id}
                name={member.name}
                title={member.title}
                photo={member.photo || ''}
                department={member.department}
                year={member.year}
                skills={member.skills}
                description={member.description}
              />
            </motion.div>
          ))
        ) : (
          <motion.p
            variants={item}
            className="col-span-3 text-center py-12 bg-white rounded-lg shadow-md text-gray-500"
          >
            沒有符合條件的幹部
          </motion.p>
        )}
      </motion.div>

      {/* 添加分頁控制 */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="py-6"
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </motion.div>
      )}
    </>
  );
}
