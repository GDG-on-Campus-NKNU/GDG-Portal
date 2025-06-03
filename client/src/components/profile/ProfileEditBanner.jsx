import { motion } from 'framer-motion';
import ImageUploader from '../general/ImageUploader';

/**
 * 橫幅編輯組件
 */
export default function ProfileEditBanner({ 
  editData, 
  setEditData, 
  user, 
  handleUpdateBanner, 
  handleCancelEdit,
  loading, 
  isUploading 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-b from-purple-50 to-indigo-50 border border-purple-200 rounded-xl shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        修改個人橫幅背景
      </h3>
      <p className="text-sm text-gray-600 mb-5">
        您可以上傳一張新的背景橫幅，或使用網址設定橫幅。
      </p>
      
      <div className="bg-white/60 p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-3/5">
            <div className="flex items-center mb-4">
              <h4 className="text-base font-semibold text-gray-800">上傳橫幅</h4>
            </div>
            <ImageUploader
              label="上傳橫幅圖片"
              initialImage={editData.bannerUrl}
              defaultImage="/assets/default-banner.jpg"
              aspectRatio="16:5"
              placeholder="點擊或拖曳上傳橫幅圖片"
              onImageChange={(file) => {
                if (file) {
                  setEditData(prev => ({ ...prev, bannerFile: file }));
                } else {
                  setEditData(prev => ({ 
                    ...prev, 
                    bannerFile: null,
                    bannerUrl: user.profile?.bannerUrl || ''
                  }));
                }
              }}
            />
            <div className="mt-2 text-xs text-gray-500 flex items-center">
              <svg className="w-3.5 h-3.5 mr-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              建議使用寬幅圖片(16:5)，最大尺寸 5MB
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <div className="flex items-center mb-4">
              <h4 className="text-base font-semibold text-gray-800">使用網址</h4>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200 h-full">
              <input
                type="url"
                value={editData.bannerUrl}
                onChange={(e) => setEditData(prev => ({ 
                  ...prev, 
                  bannerUrl: e.target.value,
                  bannerFile: null
                }))}
                placeholder="輸入橫幅圖片的網址..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex justify-center mt-4">
                {editData.bannerUrl && !editData.bannerFile && (
                  <div className="relative w-full">
                    <img 
                      src={editData.bannerUrl} 
                      alt="橫幅預覽" 
                      className="w-full h-16 rounded-lg object-cover border-2 border-gray-200"
                      onError={(e) => { e.target.src = '/assets/default-banner.jpg'; }} 
                    />
                    <span className="absolute -bottom-5 left-0 right-0 text-xs text-center text-gray-500">
                      預覽
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 橫幅更新按鈕 */}
      <div className="flex justify-end gap-3 mt-4">
        <motion.button
          onClick={handleCancelEdit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md transition-colors font-medium text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          取消
        </motion.button>
        <motion.button
          onClick={handleUpdateBanner}
          disabled={loading || isUploading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-colors disabled:opacity-50 font-medium text-sm flex items-center gap-2"
        >
          {loading || isUploading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>處理中...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              儲存橫幅
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
