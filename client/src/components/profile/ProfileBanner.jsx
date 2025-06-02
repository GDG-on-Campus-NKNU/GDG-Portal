import { motion } from 'framer-motion';
import BlobImage from '../general/BlobImage';

/**
 * 用戶個人資料頁面的橫幅與頭像組件
 */
export default function ProfileBanner({ 
  user, 
  isOwnProfile, 
  isEditingAvatar, 
  isEditingBanner, 
  handleEditAvatar, 
  handleEditBanner, 
  getRoleBadgeColor, 
  getRoleDisplayName 
}) {
  return (
    <div className="relative">
      {/* 橫幅區域 */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-t-2xl overflow-hidden">
        {/* 橫幅背景 */}
        {user.profile?.bannerUrl ? (
          <BlobImage
            src={user.profile.bannerUrl}
            alt="個人橫幅"
            className="w-full h-full object-cover"
            fallbackSrc="/assets/default-banner.jpg"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-green-600/80" />
        )}

        {/* 橫幅編輯按鈕 - 只有自己才能看到 */}
        {isOwnProfile && !isEditingAvatar && !isEditingBanner && (
          <motion.button
            onClick={handleEditBanner}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-colors shadow-lg flex items-center gap-2"
            title="編輯個人橫幅"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="hidden md:inline text-sm font-medium">編輯橫幅</span>
          </motion.button>
        )}
      </div>
      
      {/* 頭像區域 - 移到橫幅外部，避免被遮擋 */}
      <div className="relative -mt-16 mb-4 flex justify-center" style={{ zIndex: 50 }}>
        <div className="relative">
          <BlobImage
            src={user.avatarUrl}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-white"
            fallbackSrc="/assets/default-avatar.jpg"
          />
          
          {/* 頭像編輯按鈕 - 只有自己才能看到 */}
          {isOwnProfile && !isEditingAvatar && !isEditingBanner && (
            <motion.button
              onClick={handleEditAvatar}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors shadow-lg"
              title="編輯頭像"
              style={{ zIndex: 60 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </motion.button>
          )}

          {/* 角色徽章 */}
          <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full border-2 text-sm font-semibold ${getRoleBadgeColor(user.role)}`}>
            {getRoleDisplayName(user.role)}
          </div>
        </div>
      </div>
    </div>
  );
}
