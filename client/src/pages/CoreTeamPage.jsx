import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../components/general/Navbar'
import { Footer } from '../components/Footer'
import TeamSidebar from '../components/member/TeamSidebar'
import MemberList from '../components/member/MemberList'
import LoadingSpinner from '../components/general/LoadingSpinner'
import PageBanner from '../components/general/PageBanner'
import SearchFilterSection from '../components/general/SearchFilterSection'
import { useCoreTeamData } from '../hooks/useCoreTeamData'

export default function CoreTeamPage() {
  const [keyword, setKeyword] = useState('')
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)

  // 使用 hook 獲取數據
  const {
    members: filteredMembers,
    loading,
    error,
    totalPages,
    categoryOptions
  } = useCoreTeamData({
    page,
    keyword,
    categories,
    limit: 12
  })

  // 動畫設定
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const handleClearFilters = () => {
    setKeyword(''); // 清除搜尋關鍵字
    setCategories([]); // 清除分類篩選
    setPage(1); // 重置到第一頁
  };

  const handleReload = () => {
    // 強制重新載入
    setPage(0); // 先設為不可能的值
    setTimeout(() => setPage(1), 10); // 然後設回第一頁
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* 頂部橫幅 */}
        <PageBanner title="GDG Core Team Member" description="了解 GDG on Campus NKNU 背後的團隊組成與成員介紹，一群熱愛科技並致力於推廣 Google 開發技術的夥伴。" style="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 mb-8 relative overflow-hidden" />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 主要內容區 */}
          <div className="flex-1 space-y-6">
            {/* 搜尋 + 篩選 */}
            <SearchFilterSection
              placeholder="搜尋幹部..."
              keyword={keyword}
              setKeyword={setKeyword}
              tags={categories}
              setTags={setCategories}
              setPage={setPage}
              availableTags={categoryOptions}
              onClearFilters={handleClearFilters}
              onReload={handleReload}
            />

            {/* 顯示幹部 */}
            <MemberList
              members={filteredMembers}
              loading={loading}
              error={error}
              totalPages={totalPages}
              currentPage={page}
              onPageChange={p => setPage(p)}
            />
          </div>

          {/* 側邊欄 */}
          <TeamSidebar />
        </div>
      </main>
      <Footer />
    </div>
  )
}
