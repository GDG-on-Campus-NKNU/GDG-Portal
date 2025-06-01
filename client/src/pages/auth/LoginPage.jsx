import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Navbar } from '../../components/general/Navbar'
import { Footer } from '../../components/Footer'
import { BackgroundEffects } from '../../components/general/BackgroundEffects'
import { useAuth } from '../../hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // 獲取登入前的頁面位置
  const from = location.state?.from?.pathname || '/'

  // 如果已登入，重定向到目標頁面
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('請填寫所有欄位')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await login(email, password)
      
      if (result.success) {
        // 登入成功，useEffect 會處理重定向
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('登入失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  // Google 登入
  const handleGoogleLogin = () => {
    // 保存當前要重定向的位置
    sessionStorage.setItem('loginRedirect', from)
    window.location.href = '/api/auth/google'
  }

  // 頁面載入時滾動到頂部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 檢查 URL 中的登入狀態
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const loginStatus = urlParams.get('login')
    
    if (loginStatus === 'success') {
      // Google 登入成功，重定向到目標頁面
      const redirectTo = sessionStorage.getItem('loginRedirect') || '/'
      sessionStorage.removeItem('loginRedirect')
      navigate(redirectTo, { replace: true })
    } else if (loginStatus === 'error') {
      setError('Google 登入失敗，請稍後再試')
    }
  }, [navigate])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-slate-800 relative overflow-hidden">
      <BackgroundEffects />
      <Navbar />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 relative z-10 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative"
        >
          {/* 登入表單容器 */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden relative">
            {/* 裝飾性背景元素 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>
            
            {/* 標題區域 */}
            <motion.div 
              className="relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 py-8 px-8 relative">
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-4 left-8 w-12 h-12 bg-white/10 rounded-full"></div>
                  <div className="absolute bottom-6 right-12 w-8 h-8 bg-white/5 rounded-full"></div>
                  <div className="absolute top-12 right-20 w-6 h-6 bg-white/10 rounded-full"></div>
                </div>
                <div className="relative z-10 text-center">
                  <motion.h1 
                    className="text-3xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    歡迎回來
                  </motion.h1>
                  <motion.p 
                    className="text-blue-100 text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    登入您的 GDG Portal 帳號
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* 表單區域 */}
            <div className="p-8 relative z-10">
              {/* 錯誤訊息 */}
              {error && (
                <motion.div 
                  className="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-4 py-3 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </motion.div>
              )}

              {/* 登入表單 */}
              <motion.form 
                onSubmit={handleLogin} 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* 電子郵件欄位 */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    電子郵件
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300 placeholder-slate-400"
                      placeholder="請輸入您的電子郵件"
                      required
                    />
                  </div>
                </motion.div>

                {/* 密碼欄位 */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    密碼
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none transition-all duration-300 placeholder-slate-400"
                      placeholder="請輸入您的密碼"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </motion.div>

                {/* 登入按鈕 */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      登入中...
                    </div>
                  ) : (
                    '登入'
                  )}
                </motion.button>
              </motion.form>

              {/* 分隔線和 Google 登入 */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/70 text-slate-500 font-medium">或使用</span>
                  </div>
                </div>

                <div className="mt-6">
                  <motion.button
                    onClick={handleGoogleLogin}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center px-4 py-3 border border-slate-200/50 shadow-lg text-sm font-medium rounded-xl text-slate-700 bg-white/50 backdrop-blur-sm hover:bg-white/70 hover:border-slate-300/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    使用 Google 登入
                  </motion.button>
                </div>
              </motion.div>

              {/* 註冊連結 */}
              <motion.div 
                className="mt-8 text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="text-slate-500">還沒有帳號？ </span>
                <Link 
                  to="/register" 
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
                >
                  立即註冊
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.main>
      
      <Footer />
    </div>
  )
}
