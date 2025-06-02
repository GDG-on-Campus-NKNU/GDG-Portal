import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/general/Navbar';
import { Footer } from '../components/Footer';
import { BackgroundEffects } from '../components/general/BackgroundEffects';
import LoadingSpinner from '../components/general/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import ImageUploader from '../components/general/ImageUploader';
import BlobImage from '../components/general/BlobImage';
import { prepareImageForUpload } from '../services/imageService';

export default function UserProfilePage() {
  const { id } = useParams();
  const { user: currentUser, updateProfile } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      avatarUrl: user.avatarUrl || '',
      bannerUrl: user.profile?.bannerUrl || '',
      avatarFile: null,
      bannerFile: null
    });
  };

  const handleSaveEdit = async () => {
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
        avatarUrl: avatarData,
        bannerUrl: bannerData
      });

      if (result.success) {
        // 更新本地用戶資料
        setUser(prev => ({
          ...prev,
          avatarUrl: avatarData,
          profile: {
            ...prev.profile,
            bannerUrl: bannerData
          }
        }));
        setIsEditing(false);
        showUpdateMessage('頭像和橫幅更新成功！', 'success');
      } else {
        showUpdateMessage(result.message || '更新失敗', 'error');
      }
    } catch (error) {
      console.error('更新頭像和橫幅失敗:', error);
      showUpdateMessage('更新失敗，請稍後再試', 'error');
    } finally {
      setLoading(false);
      setIsUploading(false);
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
          {/* 橫幅區域 */}
          <div className="relative h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-t-2xl overflow-hidden">
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
            {isOwnProfile && !isEditing && (
              <motion.button
                onClick={handleEdit}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-colors shadow-lg flex items-center gap-2"
                title="編輯個人資料"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="hidden md:inline text-sm font-medium">編輯資料</span>
              </motion.button>
            )}
            
            {/* 頭像 */}
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <BlobImage
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  fallbackSrc="/assets/default-avatar.png"
                />
                
                {/* 頭像編輯按鈕 - 只有自己才能看到 */}
                {isOwnProfile && !isEditing && (
                  <motion.button
                    onClick={handleEdit}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors shadow-lg"
                    title="編輯頭像"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </motion.button>
                )}

                <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full border-2 text-sm font-semibold ${getRoleBadgeColor(user.role)}`}>
                  {getRoleDisplayName(user.role)}
                </div>
              </div>
            </div>
          </div>

          {/* 個人資訊區域 */}
          <div className="bg-white/70 backdrop-blur-sm rounded-b-2xl shadow-lg p-8 pt-20">
            {/* 編輯模式界面 */}
            {isOwnProfile && isEditing && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-gradient-to-b from-blue-50 to-sky-50 border border-blue-200 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  個人形象設定
                </h3>
                <p className="text-sm text-gray-600 mb-5">
                  透過更新您的頭像和橫幅圖片，讓其他社群成員更了解您。您可以直接上傳圖片或使用圖片網址。
                </p>
                
                <div className="space-y-6">
                  {/* 頭像上傳 */}
                  <div className="bg-white/60 p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-base font-semibold text-gray-800">個人頭像</h4>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/2">
                        <ImageUploader
                          label="上傳頭像圖片"
                          initialImage={editData.avatarUrl}
                          defaultImage="/assets/default-avatar.png"
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
                        <div className="p-4 bg-white rounded-lg border border-gray-200 h-full">
                          <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            使用圖片網址
                          </h5>
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
                                  onError={(e) => { e.target.src = '/assets/default-avatar.png'; }} 
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
                  
                  {/* 橫幅上傳 */}
                  <div className="mt-6 bg-white/60 p-5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="text-base font-semibold text-gray-800">個人背景橫幅</h4>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-3/5">
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
                        <div className="p-4 bg-white rounded-lg border border-gray-200 h-full">
                          <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            使用圖片網址
                          </h5>
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
                                  onError={(e) => { e.target.style.display = 'none'; }} 
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
                </div>
                
                {/* 上傳進度和相關提示 */}
                {isUploading && (
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
                )}
                
                <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 mt-8 border-t border-gray-200 pt-6">
                  <motion.button
                    onClick={handleCancelEdit}
                    disabled={loading || isUploading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 font-medium text-sm shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    取消編輯
                  </motion.button>
                  <motion.button
                    onClick={handleSaveEdit}
                    disabled={loading || isUploading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-lg transition-colors disabled:opacity-50 font-medium text-sm flex items-center justify-center gap-2"
                  >
                    {loading || isUploading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>處理圖片中...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        儲存變更
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* 更新消息顯示 */}
            {updateMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-6 p-5 rounded-xl flex items-center shadow-lg ${
                  updateMessageType === 'success' 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-800'
                    : 'bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500 text-red-800'
                }`}
              >
                <div className="mr-4">
                  {updateMessageType === 'success' ? (
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
                  <h4 className="font-semibold mb-1">{updateMessageType === 'success' ? '操作成功!' : '發生錯誤'}</h4>
                  <p className="text-sm">{updateMessage}</p>
                </div>
                <button 
                  onClick={() => {
                    setUpdateMessage('');
                    setUpdateMessageType('');
                  }}
                  className="ml-auto p-1.5 rounded-full hover:bg-black/5"
                >
                  <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 左側 - 基本資訊 */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    {user.profile?.location && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{user.profile.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h4a1 1 0 011 1v11a1 1 0 01-1 1H2a1 1 0 01-1-1V8a1 1 0 011-1h6z" />
                      </svg>
                      <span>加入於 {formatDate(user.joinDate)}</span>
                    </div>
                  </div>
                  
                  {user.profile?.bio && (
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed">{user.profile.bio}</p>
                    </div>
                  )}
                </div>

                {/* 技能標籤 */}
                {user.profile?.skills && user.profile.skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">技能</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 興趣 */}
                {user.profile?.interests && user.profile.interests.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">興趣</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.profile.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 右側 - 聯絡資訊和社交連結 */}
              <div className="space-y-6">
                {/* 聯絡資訊 */}
                <div className="bg-white/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">聯絡資訊</h3>
                  <div className="space-y-3">
                    {user.profile?.company && (
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-gray-700">{user.profile.company}</span>
                      </div>
                    )}
                    
                    {user.profile?.website && (
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                        <a
                          href={user.profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          個人網站
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* 社交連結 */}
                <div className="bg-white/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">社交連結</h3>
                  <div className="space-y-3">
                    {user.profile?.linkedinUrl && (
                      <a
                        href={user.profile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    )}
                    
                    {user.profile?.githubUrl && (
                      <a
                        href={user.profile.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                    
                    {user.profile?.twitterUrl && (
                      <a
                        href={user.profile.twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        <span>Twitter</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* 活動統計 (未來擴展) */}
                <div className="bg-white/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">活動參與</h3>
                  <div className="text-center text-gray-500">
                    <div className="text-2xl mb-2">🎯</div>
                    <p className="text-sm">統計功能開發中...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
