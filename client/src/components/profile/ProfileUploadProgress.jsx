import { motion } from 'framer-motion';

/**
 * 上傳進度指示器組件
 */
export default function ProfileUploadProgress() {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-5 overflow-hidden"
    >
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="mb-3 flex items-center gap-3">
          <div className="w-10 h-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-blue-800">圖片處理中</h4>
            <p className="text-sm text-blue-700">正在壓縮和處理您的圖片，這可能需要幾秒鐘...</p>
          </div>
        </div>
        <div className="w-full bg-blue-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full animate-pulse" style={{ width: '90%' }}></div>
        </div>
      </div>
    </motion.div>
  );
}
