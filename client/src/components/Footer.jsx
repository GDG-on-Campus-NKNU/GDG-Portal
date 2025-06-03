import { motion } from 'framer-motion'

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  const socialIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    show: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10
      }
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 py-16 mt-16 overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 漸變光暈效果 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-green-600/10 to-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        {/* 動態粒子 */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-12 relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* 公司資訊 */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h3 
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              GDG on Campus NKNU
            </motion.h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              致力於推廣 Google 開發技術，培養學生開發能力的校園社群。我們相信技術能改變世界，每個人都能成為創新者。
            </p>
            <motion.div 
              className="flex items-center space-x-2 text-sm text-slate-500"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>活躍中</span>
            </motion.div>
          </motion.div>

          {/* 快速連結 */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200 mb-6">快速連結</h4>
            <ul className="space-y-3">
              {[
                { name: '關於我們', href: '/about' },
                { name: '活動資訊', href: '/events' },
                { name: '加入我們', href: '/join' },
                { name: '聯絡我們', href: '/contact' }
              ].map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a 
                    href={link.href} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-300 transition-colors"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 資源 */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-200 mb-6">學習資源</h4>
            <ul className="space-y-3">
              {[
                { name: '課程資料', href: '/resources' },
                { name: '問與答', href: '/faq' },
                { name: '開發工具', href: '/tools' },
                { name: '社群規範', href: '/guidelines' }
              ].map((link, index) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a 
                    href={link.href} 
                    className="text-slate-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-1 h-1 bg-green-400 rounded-full mr-3 group-hover:bg-green-300 transition-colors"></span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 聯絡資訊 */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-lg font-semibold text-slate-200 mb-6">聯絡我們</h4>
            <div className="space-y-4 text-sm">
              <motion.div 
                className="flex items-center space-x-3 text-slate-400"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>gdscnknu@gmail.com</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 text-slate-400"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>高雄市燕巢區深中路62號</span>
              </motion.div>
            </div>

            {/* 社群媒體圖標 */}
            <div className="pt-4">
              <h5 className="text-sm font-medium text-slate-300 mb-4">關注我們</h5>
              <motion.div 
                className="flex space-x-4"
                variants={containerVariants}
              >
                {[
                  { name: 'GitHub', href: 'https://github.com/GDG-on-Campus-NKNU', icon: 'M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z', color: 'from-gray-600 to-gray-800' },
                  { name: 'Facebook', href: 'https://www.facebook.com/gdscnknu', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', color: 'from-blue-600 to-blue-800' },
                  { name: 'Instagram', href: 'https://www.instagram.com/gdg.on.campus_nknu', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', color: 'from-pink-600 to-purple-600' },
                  { name: 'YouTube', href: 'https://www.youtube.com/@gdscnknu', icon: 'M23.498 6.186a2.99 2.99 0 0 0-2.106-2.11C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.392.576a2.99 2.99 0 0 0-2.106 2.11C0 8.078 0 12 0 12s0 3.922.502 5.814a2.99 2.99 0 0 0 2.106 2.11C4.5 20.5 12 20.5 12 20.5s7.5 0 9.392-.576a2.99 2.99 0 0 0 2.106-2.11C24 15.922 24 12 24 12s0-3.922-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z', color: 'from-red-600 to-red-800' },
                  { name: 'Discord', href: 'https://www.discord.gg/mc5VxRcA6m', icon: 'M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.608 1.249a18.708 18.708 0 0 0-5.766 0 12.505 12.505 0 0 0-.617-1.249.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.045-.32 13.579.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.13 13.13 0 0 1-1.872-.9.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.291a.075.075 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.062 0a.073.073 0 0 1 .078.009c.121.099.247.197.373.291a.077.077 0 0 1-.006.128 12.954 12.954 0 0 1-1.873.899.076.076 0 0 0-.04.106c.36.699.772 1.364 1.226 1.993a.076.076 0 0 0 .084.028 19.876 19.876 0 0 0 6.002-3.03.076.076 0 0 0 .031-.056c.5-5.177-.838-9.661-3.872-13.661a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.182 0-2.155-1.085-2.155-2.419 0-1.333.955-2.418 2.155-2.418 1.21 0 2.174 1.095 2.155 2.418 0 1.334-.955 2.419-2.155 2.419zm7.96 0c-1.182 0-2.155-1.085-2.155-2.419 0-1.333.955-2.418 2.155-2.418 1.21 0 2.174 1.095 2.155 2.418 0 1.334-.945 2.419-2.155 2.419z', color: 'from-indigo-600 to-purple-600' }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-lg flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow`}
                    variants={socialIconVariants}
                    whileHover="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 版權資訊 */}
        <motion.div 
          className="mt-12 pt-8 border-t border-slate-700/50"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div 
              className="text-center md:text-left text-sm text-slate-400"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span>&copy; {new Date().getFullYear()} GDG on Campus NKNU. </span>
              <span className="text-slate-500">All rights reserved. Made with ❤️ by our community.</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4 text-xs text-slate-500"
              variants={containerVariants}
            >
              <motion.a 
                href="/privacy" 
                className="hover:text-slate-300 transition-colors"
                whileHover={{ y: -2 }}
              >
                隱私政策
              </motion.a>
              <span>•</span>
              <motion.a 
                href="/terms" 
                className="hover:text-slate-300 transition-colors"
                whileHover={{ y: -2 }}
              >
                使用條款
              </motion.a>
              <span>•</span>
              <motion.a 
                href="/sitemap" 
                className="hover:text-slate-300 transition-colors"
                whileHover={{ y: -2 }}
              >
                網站地圖
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
