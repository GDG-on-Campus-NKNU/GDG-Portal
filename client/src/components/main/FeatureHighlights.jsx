import { motion } from 'framer-motion'

export default function FeatureHighlights() {
  const features = [
    {
      title: "技術分享會",
      description: "定期舉辦各種技術主題的分享會，涵蓋前端、後端、AI 等熱門領域",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      hoverColor: "hover:from-blue-500/10 hover:to-cyan-500/10"
    },
    {
      title: "實作工作坊",
      description: "動手實作各種專案，從基礎到進階，讓理論與實務完美結合",
      icon: "🛠️",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      hoverColor: "hover:from-purple-500/10 hover:to-pink-500/10"
    },
    {
      title: "社群交流",
      description: "與同好一起討論技術、分享經驗，建立寶貴的人脈關係",
      icon: "🤝",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      hoverColor: "hover:from-green-500/10 hover:to-emerald-500/10"
    },
    {
      title: "職涯發展",
      description: "提供實習機會、求職指導，協助成員在科技領域發展職涯",
      icon: "🚀",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      hoverColor: "hover:from-orange-500/10 hover:to-red-500/10"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  }

  return (
    <section className="relative">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-green-400/5 rounded-3xl blur-3xl"></div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            我們提供什麼？
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            在 GDG on Campus高雄師範大學分布，我們致力於為學生提供全方位的技術學習與成長機會
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              className={`relative group bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 ${feature.hoverColor} cursor-pointer`}
            >
              {/* 背景漸變裝飾 */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.bgColor} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
              
              <div className="relative z-10">
                {/* 圖標 */}
                <div className="mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} text-white text-2xl shadow-lg`}>
                    {feature.icon}
                  </div>
                </div>

                {/* 標題 */}
                <h3 className={`text-lg font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent mb-3`}>
                  {feature.title}
                </h3>

                {/* 描述 */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* 裝飾性底線 */}
                <motion.div
                  className={`mt-4 h-1 rounded-full bg-gradient-to-r ${feature.color} scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300`}
                />
              </div>

              {/* 懸停效果光暈 */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </motion.div>

        {/* 行動呼籲 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/events"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>探索更多活動</span>
            <motion.svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
