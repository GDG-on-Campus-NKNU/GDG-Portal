import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { Footer } from '../components/Footer'
import { PostCard } from '../components/PostCard'
import { Banner } from '../components/Banner'
import { WelcomeBox } from '../components/WelcomeBox'
import { UpcomingEvents } from '../components/UpcomingEvents'
import { GoogleCalendar } from '../components/GoogleCalendar'
import { Stats } from '../components/Stats'
import { Partners } from '../components/Partners'

export default function HomePage() {
  // Define animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  };

  const slideIn = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <motion.main
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="flex flex-col w-full max-w-7xl mx-auto px-4 py-6"
      >
        {/* Banner with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Banner />
        </motion.div>

        {/* 歡迎信息區塊 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <WelcomeBox />
        </motion.div>

        {/* 統計數據區塊 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Stats />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左側主內容區塊 */}
          <motion.section
            className="flex-1 space-y-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1 variants={item} className="text-2xl font-semibold">最新公告</motion.h1>

            <motion.div variants={item} whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
              <PostCard title="期中講座開放報名！" date="2025-05-01" excerpt="本次活動將邀請業界講師分享 AI 開發經驗..." />
            </motion.div>

            <motion.div variants={item} whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
              <PostCard title="社員資料更新通知" date="2025-04-20" excerpt="請所有社員至會員頁面確認個人資訊是否正確..." />
            </motion.div>

            {/* 即將到來的活動 */}
            <motion.div variants={item}>
              <UpcomingEvents />
            </motion.div>
          </motion.section>

          {/* 右側側邊欄 */}
          <motion.aside
            className="w-full lg:w-80 space-y-6"
            variants={slideIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            <Sidebar />
            {/* Google Calendar 嵌入 */}
            <GoogleCalendar />
          </motion.aside>
        </div>

        {/* 合作夥伴區塊 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Partners />
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  )
}
