import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../../components/general/Navbar'
import { Footer } from '../../components/Footer'
import { BackgroundEffects } from '../../components/general/BackgroundEffects'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validatePassword = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    
    if (password.length < minLength) {
      return '密碼至少需要 8 個字元'
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      return '密碼必須包含大寫字母、小寫字母和數字'
    }
    return null
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 驗證表單
    if (!formData.name.trim()) {
      setError('請輸入姓名')
      setLoading(false)
      return
    }

    if (!formData.email.trim()) {
      setError('請輸入電子郵件')
      setLoading(false)
      return
    }

    const passwordError = validatePassword(formData.password)
    if (passwordError) {
      setError(passwordError)
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('密碼與確認密碼不相符')
      setLoading(false)
      return
    }

    try {
      const result = await register(formData.name, formData.email, formData.password)
      
      if (result.success) {
        // 註冊成功，導向首頁或儀表板
        navigate('/')
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error('註冊失敗:', error)
      setError('註冊失敗，請稍後再試')
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-slate-800 relative overflow-hidden">
      {/* 動態背景效果 */}
      <BackgroundEffects />
      
      <Navbar />
      
      <motion.main
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 relative z-10 flex items-center justify-center"
      >
        <motion.div
          variants={itemVariants}
          className="w-full max-w-md relative"
        >
          {/* 主要註冊卡片 */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden relative">
            {/* 裝飾性背景元素 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full translate-y-12 -translate-x-12"></div>
            
            {/* 標題區域 */}
            <motion.div 
              className="relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 py-8 px-8 relative">
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
                    加入我們！
                  </motion.h1>
                  <motion.p 
                    className="text-blue-100 text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    創建您的 GDG 帳戶，開啟技術社群之旅
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* 表單區域 */}
            <div className="p-8 relative z-10">
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

              <form onSubmit={handleRegister} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                    姓名
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300 placeholder-slate-400"
                      placeholder="請輸入您的姓名"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    電子郵件
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300 placeholder-slate-400"
                      placeholder="name@example.com"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                    密碼
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300 placeholder-slate-400"
                      placeholder="至少 8 個字元"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    密碼應至少包含 8 個字元，包括大小寫字母和數字
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                    確認密碼
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:outline-none transition-all duration-300 placeholder-slate-400"
                      placeholder="再次輸入密碼"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showConfirmPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-3"
                  variants={itemVariants}
                >
                  <div className="flex items-center mt-1">
                    <input
                      id="agree-terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-green-600 border-slate-300 rounded focus:ring-green-500 focus:ring-2 transition-colors"
                    />
                  </div>
                  <label htmlFor="agree-terms" className="text-sm text-slate-600 leading-5">
                    我已閱讀並同意{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 hover:underline transition-colors font-medium">
                      服務條款
                    </a>{' '}
                    和{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 hover:underline transition-colors font-medium">
                      隱私政策
                    </a>
                  </label>
                </motion.div>

                <motion.div 
                  className="pt-2"
                  variants={itemVariants}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        註冊中...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        創建帳號
                      </div>
                    )}
                  </button>
                </motion.div>
              </form>

              <motion.div 
                className="mt-8"
                variants={itemVariants}
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
                  <a
                    href="http://localhost:5000/api/auth/google"
                    className="w-full flex items-center justify-center px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm text-sm font-semibold rounded-xl text-slate-700 hover:bg-white/80 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
                  >
                    <svg className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    使用 Google 註冊
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="mt-8 text-center text-sm"
                variants={itemVariants}
              >
                <span className="text-slate-600">已經有帳號了? </span>
                <Link 
                  to="/login" 
                  className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
                >
                  立即登入
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
