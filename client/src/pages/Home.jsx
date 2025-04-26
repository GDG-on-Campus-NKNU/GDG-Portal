import { motion } from 'framer-motion'
import { Navbar } from '../components/general/Navbar'
import { Sidebar } from '../components/main/Sidebar'
import { Footer } from '../components/Footer'
import { Banner } from '../components/main/Banner'
import { WelcomeBox } from '../components/main/WelcomeBox'
import { GoogleCalendar } from '../components/main/GoogleCalendar'
import { Stats } from '../components/main/Stats'
import { Partners } from '../components/main/Partners'
import { RecentAnnouncements } from '../components/main/RecentAnnouncements'
import { UpcomingEvents } from '../components/main/Events' // 引入新元件

export default function HomePage() {
  // 動畫設定
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
          <div className="flex-1 space-y-6">
            {/* 使用新的 RecentAnnouncements 元件 */}
            <RecentAnnouncements limit={2} />

            {/* 使用新的 RecentEvents 元件替代靜態 UpcomingEvents */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <UpcomingEvents limit={3} />
            </motion.div>
          </div>

          {/* 右側側邊欄 */}
          <motion.aside
            className="w-full lg:w-80 space-y-6"
            variants={slideIn}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            <Sidebar />
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
