import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar, BackgroundEffects, LoadingSpinner } from '../components/general';
import { Footer } from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { prepareImageForUpload } from '../services/imageService';

// 導入拆分後的個人資料頁面組件
import { 
  ProfileBanner, 
  ProfileEditAvatar, 
  ProfileEditBanner, 
  ProfileInfo, 
  ProfileContact,
  ProfileUploadProgress,
  UpdateMessage
} from '../components/profile';

export default function UserProfilePage() {
  const { id } = useParams();
  const { user: currentUser, updateProfile } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [editData, setEditData] = useState({
    avatarUrl: '',
    bannerUrl: '',
    avatarFile: null,
    bannerFile: null
  });
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateMessageType, setUpdateMessageType] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // 檢查是否為自己的個人頁面
  const isOwnProfile = currentUser && user && currentUser.id === user.id;

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  useEffect(() => {
    if (user) {
      setEditData({
        avatarUrl: user.avatarUrl || '',
        bannerUrl: user.profile?.bannerUrl || '',
        avatarFile: null,
        bannerFile: null
      });
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/auth/profile/${id}`);
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        const errorData = await response.json();
        setError(errorData.message || '無法載入使用者資料');
      }
    } catch (error) {
      console.error('獲取使用者資料失敗:', error);
      setError('網路錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const showUpdateMessage = (text, type) => {
    setUpdateMessage(text);
    setUpdateMessageType(type);
    setTimeout(() => {
      setUpdateMessage('');
      setUpdateMessageType('');
    }, 5000);
  };

  const handleEditAvatar = () => {
    setIsEditingAvatar(true);
    setIsEditingBanner(false);
  };

  const handleEditBanner = () => {
    setIsEditingBanner(true);
    setIsEditingAvatar(false);
  };

  const handleCancelEdit = () => {
    setIsEditingAvatar(false);
    setIsEditingBanner(false);
    setEditData({
      avatarUrl: user.avatarUrl || '',
      bannerUrl: user.profile?.bannerUrl || '',
      avatarFile: null,
      bannerFile: null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAvatar = async () => {
    try {
      setLoading(true);
      setIsUploading(true);

      // 處理頭像圖片
      let avatarData = editData.avatarUrl;
      if (editData.avatarFile) {
        try {
          avatarData = await prepareImageForUpload(editData.avatarFile, {
            compress: true,
            outputFormat: 'base64'
          });
        } catch (err) {
          console.error('處理頭像失敗:', err);
          showUpdateMessage('處理頭像圖片失敗，請嘗試使用較小的圖片', 'error');
          setLoading(false);
          setIsUploading(false);
          return;
        }
      }

      const result = await updateProfile({
        avatarUrl: avatarData
      });

      if (result.success) {
        // 更新本地用戶資料
        setUser(prev => ({
          ...prev,
          avatarUrl: avatarData
        }));
        setIsEditingAvatar(false);
        showUpdateMessage('頭像更新成功！', 'success');
      } else {
        showUpdateMessage(result.message || '更新失敗', 'error');
      }
    } catch (error) {
      console.error('更新頭像失敗:', error);
      showUpdateMessage('更新失敗，請稍後再試', 'error');
    } finally {
      setLoading(false);
      setIsUploading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateBanner = async () => {
    try {
      setLoading(true);
      setIsUploading(true);

      // 處理橫幅圖片
      let bannerData = editData.bannerUrl;
      if (editData.bannerFile) {
        try {
          bannerData = await prepareImageForUpload(editData.bannerFile, {
            compress: true,
            outputFormat: 'base64'
          });
        } catch (err) {
          console.error('處理橫幅失敗:', err);
          showUpdateMessage('處理橫幅圖片失敗，請嘗試使用較小的圖片', 'error');
          setLoading(false);
          setIsUploading(false);
          return;
        }
      }

      const result = await updateProfile({
        bannerUrl: bannerData
      });

      if (result.success) {
        // 更新本地用戶資料
        setUser(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            bannerUrl: bannerData
          }
        }));
        setIsEditingBanner(false);
        showUpdateMessage('橫幅更新成功！', 'success');
      } else {
        showUpdateMessage(result.message || '更新失敗', 'error');
      }
    } catch (error) {
      console.error('更新橫幅失敗:', error);
      showUpdateMessage('更新失敗，請稍後再試', 'error');
    } finally {
      setLoading(false);
      setIsUploading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleDisplayName = (role) => {
    const roleNames = {
      admin: '管理員',
      core: '核心團隊',
      member: '成員'
    };
    return roleNames[role] || '訪客';
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800 border-red-200',
      core: 'bg-blue-100 text-blue-800 border-blue-200',
      member: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[role] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 bg-white/70 rounded-2xl shadow-lg backdrop-blur-sm"
          >
            <div className="text-6xl mb-4">😔</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">找不到使用者</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              返回首頁
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <BackgroundEffects />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* 更新訊息 - 只在有訊息時顯示 */}
          {updateMessage && (
            <UpdateMessage 
              message={updateMessage} 
              type={updateMessageType}
              onClose={() => {
                setUpdateMessage('');
                setUpdateMessageType('');
              }}
            />
          )}

          {/* 上傳進度指示器 - 只在上傳時顯示 */}
          {isUploading && (
            <ProfileUploadProgress 
              isUploading={isUploading} 
            />
          )}

          {/* 個人資料橫幅 */}
          <ProfileBanner 
            user={user}
            isOwnProfile={isOwnProfile}
            isEditingAvatar={isEditingAvatar}
            isEditingBanner={isEditingBanner}
            handleEditAvatar={handleEditAvatar}
            handleEditBanner={handleEditBanner}
            getRoleDisplayName={getRoleDisplayName}
            getRoleBadgeColor={getRoleBadgeColor}
          />

          {/* 個人資訊區域 - 調整樣式使其與橫幅更好地融合 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-b-2xl shadow-lg pt-0 pb-8 px-8 border-t border-blue-100 mt-0">
            {/* 用戶名稱和基本資訊 */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-600 text-lg">{user.email}</p>
            </div>
            {/* 頭像編輯界面 */}
            {isOwnProfile && isEditingAvatar && (
              <ProfileEditAvatar 
                editData={editData}
                setEditData={setEditData}
                user={user}
                loading={loading}
                isUploading={isUploading}
                handleUpdateAvatar={handleUpdateAvatar}
                handleCancelEdit={handleCancelEdit}
              />
            )}

            {/* 橫幅編輯界面 */}
            {isOwnProfile && isEditingBanner && (
              <ProfileEditBanner 
                editData={editData}
                setEditData={setEditData}
                user={user}
                loading={loading}
                isUploading={isUploading}
                handleUpdateBanner={handleUpdateBanner}
                handleCancelEdit={handleCancelEdit}
              />
            )}

            {/* 正常顯示模式 */}
            {(!isEditingAvatar && !isEditingBanner) && (
              <>
                {/* 用戶基本資訊 */}
                <ProfileInfo 
                  user={user}
                  formatDate={formatDate}
                />

                {/* 聯絡資訊 */}
                <ProfileContact 
                  user={user}
                />
              </>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
