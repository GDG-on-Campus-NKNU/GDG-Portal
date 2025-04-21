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
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex flex-col w-full max-w-7xl mx-auto px-4 py-6">
        {/* Banner */}
        <Banner />

        {/* 歡迎信息區塊 */}
        <WelcomeBox />

        {/* 統計數據區塊 */}
        <Stats />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左側主內容區塊 */}
          <section className="flex-1 space-y-6">
            <h1 className="text-2xl font-semibold">最新公告</h1>
            <PostCard title="期中講座開放報名！" date="2025-05-01" excerpt="本次活動將邀請業界講師分享 AI 開發經驗..." />
            <PostCard title="社員資料更新通知" date="2025-04-20" excerpt="請所有社員至會員頁面確認個人資訊是否正確..." />

            {/* 即將到來的活動 */}
            <UpcomingEvents />
          </section>

          {/* 右側側邊欄 */}
          <aside className="w-full lg:w-80 space-y-6">
            <Sidebar />
            {/* Google Calendar 嵌入 */}
            <GoogleCalendar />
          </aside>
        </div>

        {/* 合作夥伴區塊 */}
        <Partners />
      </main>
      <Footer />
    </div>
  )
}
