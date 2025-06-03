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
      <motion.div 
        className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">載入失敗</h3>
          <p className="text-slate-600">{error}</p>
        </div>
      </motion.div>
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
          <motion.div
            variants={item}
            className="col-span-full flex justify-center"
          >
            <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-12 shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">暫無幹部資料</h3>
              <p className="text-slate-600">目前沒有符合條件的幹部資料</p>
            </div>
          </motion.div>
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
