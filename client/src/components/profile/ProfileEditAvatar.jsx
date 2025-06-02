import { motion } from 'framer-motion';
import ImageUploader from '../general/ImageUploader';

/**
 * 頭像編輯組件
 */
export default function ProfileEditAvatar({ 
  editData, 
  setEditData, 
  user, 
  handleUpdateAvatar, 
  handleCancelEdit,
  loading, 
  isUploading 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-b from-blue-50 to-sky-50 border border-blue-200 rounded-xl shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        修改個人頭像
      </h3>
      <p className="text-sm text-gray-600 mb-5">
        您可以上傳一張新的頭像照片，或使用網址設定頭像。
      </p>
      
      <div className="bg-white/60 p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <div className="flex items-center mb-4">
              <h4 className="text-base font-semibold text-gray-800">上傳照片</h4>
            </div>
            <ImageUploader
              label="上傳頭像圖片"
              initialImage={editData.avatarUrl}
              defaultImage="/assets/default-avatar.jpg"
              circle={true}
              aspectRatio="1:1"
              placeholder="點擊或拖曳上傳頭像"
              onImageChange={(file) => {
                if (file) {
                  setEditData(prev => ({ ...prev, avatarFile: file }));
                } else {
                  setEditData(prev => ({ 
                    ...prev, 
                    avatarFile: null,
                    avatarUrl: user.avatarUrl || ''
                  }));
                }
              }}
            />
            <div className="mt-2 text-xs text-gray-500 flex items-center">
              <svg className="w-3.5 h-3.5 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              建議使用正方形圖片，最大尺寸 5MB
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex items-center mb-4">
              <h4 className="text-base font-semibold text-gray-800">使用網址</h4>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200 h-full">
              <input
                type="url"
                value={editData.avatarUrl}
                onChange={(e) => setEditData(prev => ({ 
                  ...prev, 
                  avatarUrl: e.target.value,
                  avatarFile: null 
                }))}
                placeholder="輸入頭像圖片的網址..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="flex justify-center mt-4">
                {editData.avatarUrl && !editData.avatarFile && (
                  <div className="relative">
                    <img 
                      src={editData.avatarUrl} 
                      alt="頭像預覽" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => { e.target.src = '/assets/default-avatar.jpg'; }} 
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

      {/* 頭像更新按鈕 */}
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
          onClick={handleUpdateAvatar}
          disabled={loading || isUploading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors disabled:opacity-50 font-medium text-sm flex items-center gap-2"
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
              儲存頭像
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
