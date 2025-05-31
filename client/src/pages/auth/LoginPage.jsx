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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      <BackgroundEffects />
      <Navbar />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* 登入表單容器 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            {/* 表單標題 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-2">歡迎回來</h1>
              <p className="text-blue-100">登入您的 GDG Portal 帳號</p>
            </motion.div>

            {/* 錯誤訊息 */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg"
              >
                <p className="text-red-200 text-sm">{error}</p>
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
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  電子郵件
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  placeholder="請輸入您的電子郵件"
                  required
                />
              </motion.div>

              {/* 密碼欄位 */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-blue-100 mb-2">
                  密碼
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all pr-12"
                    placeholder="請輸入您的密碼"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
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
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-blue-900/50 text-blue-100 font-medium">或使用</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center px-4 py-3 border border-white/20 shadow-lg text-sm font-medium rounded-xl text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  使用 Google 登入
                </button>
              </div>
            </motion.div>

            {/* 註冊連結 */}
            <motion.div 
              className="mt-8 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-blue-200">還沒有帳號？ </span>
              <Link 
                to="/register" 
                className="text-blue-300 hover:text-white font-semibold transition-colors hover:underline"
              >
                立即註冊
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  )
}
