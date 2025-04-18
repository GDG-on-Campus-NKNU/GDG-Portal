import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { Footer } from '../components/Footer'
import { PostCard } from '../components/PostCard'
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <main className="flex flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* 左側主內容區塊 */}
        <section className="flex-1 space-y-6">
          <h1 className="text-2xl font-semibold">最新公告</h1>
          <PostCard title="期中講座開放報名！" date="2025-05-01" excerpt="本次活動將邀請業界講師分享 AI 開發經驗..." />
          <PostCard title="社員資料更新通知" date="2025-04-20" excerpt="請所有社員至會員頁面確認個人資訊是否正確..." />
        </section>

        {/* 右側側邊欄 */}
        <aside className="w-80 pl-6 hidden lg:block">
          <Sidebar />
        </aside>
      </main>

      <Footer />
    </div>
  )
} 
