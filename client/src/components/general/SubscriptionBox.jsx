import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SubscriptionBox({
  title,
  description
}) {
  const [email, setEmail] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: 實現訂閱功能
    console.log('訂閱電子信箱:', email)
  }

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-blue-500/90 via-purple-600/90 to-indigo-700/90 backdrop-blur-xl rounded-2xl p-6 text-white shadow-xl border border-white/20 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 裝飾性背景元素 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50"></div>
      <motion.div 
        className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full"
        animate={{ 
          scale: isHovered ? 1.2 : 1,
          x: isHovered ? 15 : 0,
          y: isHovered ? -8 : 0
        }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full"
        animate={{ 
          scale: isHovered ? 1.3 : 1,
          x: isHovered ? -12 : 0,
          y: isHovered ? 12 : 0
        }}
        transition={{ duration: 0.3 }}
      ></motion.div>

      <div className="relative z-10">
        <div className="flex items-center mb-3">
          <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg mr-3 shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        
        <p className="text-blue-100 mb-4 leading-relaxed text-sm">{description}</p>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="你的電子信箱"
              className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-2.5 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 text-sm"
              required
            />
          </div>
          
          <motion.button 
            type="submit"
            className="group relative w-full bg-white text-blue-600 font-semibold rounded-xl px-4 py-2.5 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center">
              立即訂閱
              <svg className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
