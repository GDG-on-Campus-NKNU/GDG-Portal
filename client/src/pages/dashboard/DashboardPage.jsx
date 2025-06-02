import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../../components/general/Navbar'
import { Footer } from '../../components/Footer'
import { BackgroundEffects } from '../../components/general/BackgroundEffects'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { mockStats, mockEvents, mockAnnouncements } from '../../data/mockData'

export default function DashboardPage() {
  const { user, updateProfile, changePassword, linkGoogleAccount, unlinkGoogleAccount } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'
  
  // 個人資料表單
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    bannerUrl: '',
    location: '',
    company: '',
    website: '',
    phone: '',
    linkedinUrl: '',
    githubUrl: '',
    twitterUrl: '',
    skills: [],
    interests: []
  })

  // 密碼變更表單
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // 初始化使用者資料
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        bannerUrl: user.bannerUrl || '',
        location: user.location || '',
        company: user.company || '',
        website: user.website || '',
        phone: user.phone || '',
        linkedinUrl: user.linkedinUrl || '',
        githubUrl: user.githubUrl || '',
        twitterUrl: user.twitterUrl || '',
        skills: user.skills || [],
        interests: user.interests || []
      })
    }
  }, [user])

  const showMessage = (text, type) => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 5000)
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await updateProfile(profileData)
      if (result.success) {
        showMessage('個人資料更新成功！', 'success')
      } else {
        showMessage(result.message, 'error')
      }
    } catch (error) {
      showMessage('更新失敗，請稍後再試', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('新密碼與確認密碼不符', 'error')
      setLoading(false)
      return
    }

    if (passwordData.newPassword.length < 8) {
      showMessage('新密碼至少需要 8 個字元', 'error')
      setLoading(false)
      return
    }

    try {
      const result = await changePassword(passwordData.currentPassword, passwordData.newPassword)
      if (result.success) {
        showMessage('密碼變更成功！', 'success')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        showMessage(result.message, 'error')
      }
    } catch (error) {
      showMessage('密碼變更失敗，請稍後再試', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLink = async () => {
    setLoading(true)
    try {
      // 這裡應該實作 Google OAuth 流程
      // 暫時顯示提示訊息
      showMessage('Google 帳號連接功能開發中...', 'error')
    } catch (error) {
      showMessage('Google 帳號連接失敗', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleUnlink = async () => {
    if (!confirm('確定要取消 Google 帳號連接嗎？取消後您需要使用密碼登入。')) {
      return
    }

    setLoading(true)
    try {
      const result = await unlinkGoogleAccount()
      if (result.success) {
        showMessage('Google 帳號連接已取消', 'success')
      } else {
        showMessage(result.message, 'error')
      }
    } catch (error) {
      showMessage('取消連接失敗', 'error')
    } finally {
      setLoading(false)
    }
  }

  // 動畫設定
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <BackgroundEffects />
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">請先登入</h1>
            <Link 
              to="/login" 
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300"
            >
              前往登入
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-slate-800 relative overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      
      <motion.main
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 relative z-10"
      >
        {/* 頁面標題 */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            使用者儀表板
          </h1>
          <p className="text-slate-600 text-lg">
            歡迎回來，{user.name}！管理您的個人資料和帳戶設定
          </p>
        </motion.div>

        {/* 訊息提示 */}
        {message && (
          <motion.div 
            className={`mb-6 p-4 rounded-xl ${
              messageType === 'success' 
                ? 'bg-green-50/80 border border-green-200/50 text-green-700' 
                : 'bg-red-50/80 border border-red-200/50 text-red-700'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center">
              <svg 
                className="w-5 h-5 mr-2" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                {messageType === 'success' ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                )}
              </svg>
              {message}
            </div>
          </motion.div>
        )}

        <motion.div 
          className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
          variants={itemVariants}
        >
          {/* 標籤導航 */}
          <div className="border-b border-slate-200/50">
            <nav className="flex space-x-0">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 font-semibold transition-all duration-300 relative ${
                  activeTab === 'profile'
                    ? 'text-green-600 bg-white/50'
                    : 'text-slate-600 hover:text-green-600 hover:bg-white/30'
                }`}
              >
                個人資料
                {activeTab === 'profile' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 to-blue-600"
                    layoutId="activeTab"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-6 py-4 font-semibold transition-all duration-300 relative ${
                  activeTab === 'security'
                    ? 'text-green-600 bg-white/50'
                    : 'text-slate-600 hover:text-green-600 hover:bg-white/30'
                }`}
              >
                安全設定
                {activeTab === 'security' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 to-blue-600"
                    layoutId="activeTab"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-6 py-4 font-semibold transition-all duration-300 relative ${
                  activeTab === 'activity'
                    ? 'text-green-600 bg-white/50'
                    : 'text-slate-600 hover:text-green-600 hover:bg-white/30'
                }`}
              >
                活動記錄
                {activeTab === 'activity' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-600 to-blue-600"
                    layoutId="activeTab"
                  />
                )}
              </button>
            </nav>
          </div>

          {/* 標籤內容 */}
          <div className="p-8">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">個人資料</h2>
                  <p className="text-slate-600">更新您的個人資訊和聯絡方式</p>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                        placeholder="您的姓名"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        電子郵件 *
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        所在地點
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                        placeholder="城市, 國家"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        公司/組織
                      </label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                        placeholder="您的公司或組織名稱"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        個人網站
                      </label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                        placeholder="https://your-website.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        聯絡電話
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                        placeholder="+886 912-345-678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        LinkedIn 連結
                      </label>
                      <input
                        type="url"
                        value={profileData.linkedinUrl}
                        onChange={(e) => setProfileData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        GitHub 連結
                      </label>
                      <input
                        type="url"
                        value={profileData.githubUrl}
                        onChange={(e) => setProfileData(prev => ({ ...prev, githubUrl: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                        placeholder="https://github.com/username"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Twitter 連結
                      </label>
                      <input
                        type="url"
                        value={profileData.twitterUrl}
                        onChange={(e) => setProfileData(prev => ({ ...prev, twitterUrl: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                        placeholder="https://twitter.com/username"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        個人橫幅圖片 URL
                      </label>
                      <input
                        type="url"
                        value={profileData.bannerUrl}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bannerUrl: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                        placeholder="https://example.com/banner-image.jpg"
                      />
                      <p className="text-xs text-slate-500 mt-1">用於個人頁面的橫幅背景圖片（建議尺寸：1200x400px）</p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        自我介紹
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        rows="4"
                        className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300 resize-none"
                        placeholder="簡單介紹一下您自己..."
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? '更新中...' : '更新個人資料'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">安全設定</h2>
                  <p className="text-slate-600">管理您的密碼和帳戶安全</p>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      目前密碼
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      required
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                      placeholder="輸入目前密碼"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      新密碼
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      required
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                      placeholder="輸入新密碼"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      確認新密碼
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300"
                      placeholder="再次輸入新密碼"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? '變更中...' : '變更密碼'}
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-200/50">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">帳戶資訊</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">註冊時間:</span>
                      <span className="text-slate-800 font-medium">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('zh-TW') : '不詳'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">帳戶類型:</span>
                      <span className="text-slate-800 font-medium capitalize">
                        {user.role || 'member'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">驗證方式:</span>
                      <span className="text-slate-800 font-medium">
                        {user.googleId ? 'Google OAuth' : '電子郵件'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Google 帳號連接管理 */}
                <div className="mt-8 pt-8 border-t border-slate-200/50">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Google 帳號連接</h3>
                  <div className="bg-white/30 rounded-xl p-6 border border-slate-200/30">
                    {user.googleId ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-slate-800">已連接 Google 帳號</div>
                            <div className="text-sm text-slate-600">您可以使用 Google 帳號快速登入</div>
                          </div>
                        </div>
                        <button
                          onClick={handleGoogleUnlink}
                          disabled={loading}
                          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          取消連接
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-slate-800">未連接 Google 帳號</div>
                            <div className="text-sm text-slate-600">連接 Google 帳號以便快速登入</div>
                          </div>
                        </div>
                        <button
                          onClick={handleGoogleLink}
                          disabled={loading}
                          className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-200 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          連接 Google
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">活動記錄</h2>
                  <p className="text-slate-600">查看您的參與歷程和活動統計</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-200/50 rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {user.eventsAttended || 0}
                    </div>
                    <div className="text-sm text-green-700 font-medium">參與活動</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200/50 rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {user.postsCreated || 0}
                    </div>
                    <div className="text-sm text-blue-700 font-medium">發布貼文</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-200/50 rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {user.badgesEarned || 0}
                    </div>
                    <div className="text-sm text-purple-700 font-medium">獲得徽章</div>
                  </div>
                </div>

                <div className="bg-slate-50/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">最近活動</h3>
                  <div className="text-center py-8 text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p>暫無活動記錄</p>
                    <p className="text-sm mt-1">開始參與 GDG 活動來建立您的活動歷程！</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  )
}
