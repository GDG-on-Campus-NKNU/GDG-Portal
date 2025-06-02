import { motion } from 'framer-motion';

/**
 * 更新消息提示組件
 */
export default function UpdateMessage({ message, type, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`mb-6 p-5 rounded-xl flex items-center shadow-lg ${
        type === 'success' 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-800'
          : 'bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 text-red-800'
      }`}
    >
      <div className="mr-4">
        {type === 'success' ? (
          <div className="bg-green-100 rounded-full p-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="bg-red-100 rounded-full p-2">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </div>
      <div>
        <h4 className="font-semibold mb-1">{type === 'success' ? '操作成功!' : '發生錯誤'}</h4>
        <p className="text-sm">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-auto p-1.5 rounded-full hover:bg-black/5"
      >
        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}
