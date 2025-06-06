import { motion } from 'framer-motion'
import { Navbar, BackgroundEffects } from '../components/general'
import { 
  Sidebar,
  MainBanner,
  WelcomeBox,
  GoogleCalendar,
  FeatureHighlights,
  Partners,
  RecentAnnouncements,
  UpcomingEvents
} from '../components/main'
import { Footer } from '../components/Footer'

export default function HomePage() {
  // 動畫設定
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const slideInVariants = {
    hidden: { opacity: 0, x: 50 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20
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
        className="flex flex-col w-full max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-12 py-8 space-y-12 relative z-10"
      >
        {/* Banner 區塊 */}
        <motion.div variants={itemVariants}>
          <MainBanner />
        </motion.div>

        {/* 歡迎信息區塊 */}
        <motion.div variants={itemVariants}>
          <WelcomeBox />
        </motion.div>

        {/* 特色功能區塊 */}
        <motion.div variants={itemVariants}>
          <FeatureHighlights />
        </motion.div>

        {/* 主要內容區域 */}
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
          {/* 左側主內容區塊 */}
          <motion.div 
            className="flex-1 space-y-8 xl:max-w-4xl"
            variants={itemVariants}
          >
            {/* 最新公告 */}
            <RecentAnnouncements limit={2} />

            {/* 即將到來的活動 */}
            <UpcomingEvents limit={3} />
          </motion.div>

          {/* 右側側邊欄 - 擴大寬度以容納行事曆 */}
          <motion.aside
            className="w-full xl:w-[32rem] xl:min-w-[32rem] space-y-8"
            variants={slideInVariants}
          >
            <Sidebar />
            <GoogleCalendar />
          </motion.aside>
        </div>

        {/* 合作夥伴區塊 */}
        <motion.div variants={itemVariants}>
          <Partners />
        </motion.div>
      </motion.main>
      
      <Footer />
    </div>
  )
}
