import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../../components/general/Navbar'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('密碼與確認密碼不相符')
      setLoading(false)
      return
    }

    try {
      // 這裡會實作註冊邏輯
      console.log('註冊:', formData)
      // 註冊成功後導向登入頁或首頁
      // window.location.href = '/login'
    } catch (error) {
      setError('註冊失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-600 to-blue-600 py-6 px-8">
            <h1 className="text-2xl font-bold text-white text-center">註冊 GDG 入口網站</h1>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder="請輸入您的姓名"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  電子郵件
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  密碼
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder="至少 8 個字元"
                />
                <p className="mt-1 text-xs text-gray-500">
                  密碼應至少包含 8 個字元，包括大小寫字母和數字
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  確認密碼
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder="再次輸入密碼"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  我已閱讀並同意 <a href="#" className="text-blue-600 hover:underline">服務條款</a> 和 <a href="#" className="text-blue-600 hover:underline">隱私政策</a>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
                >
                  {loading ? '處理中...' : '註冊帳號'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">或使用</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="http://localhost:5000/api/auth/google"
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 12.151c0 .988-.798 1.794-1.784 1.794-.986 0-1.785-.806-1.785-1.794 0-.987.799-1.784 1.785-1.784.986 0 1.784.797 1.784 1.784zm-.449 8.824c-.385.387-.898.6-1.435.6-.518 0-1.006-.201-1.413-.589l-5.18-5.181c-.381-.382-.593-.894-.593-1.435 0-.53.212-1.042.593-1.423l9.637-9.637c.387-.387.899-.601 1.435-.601s1.049.214 1.436.601l3.713 3.713c.787.787.787 2.062 0 2.849l-8.193 8.192zm-7.112-6.56l4.5 4.5 7.294-7.294-4.5-4.5-7.294 7.294z" />
                  </svg>
                  使用 Google 註冊
                </a>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">已經有帳號了? </span>
              <Link to="/login" className="text-blue-600 hover:underline">
                立即登入
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
