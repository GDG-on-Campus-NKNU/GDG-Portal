import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Navbar, 
  BackgroundEffects, 
  ScrollEffects, 
  LoadingSpinner, 
  PageBanner, 
  SearchFilterSection 
} from '../components/general'
import { Footer } from '../components/Footer'
import { TeamSidebar, MemberList } from '../components/member'
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

  // 頁面載入時滾動到頂部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 動畫設定
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-slate-800 relative overflow-hidden">
      {/* 動態背景效果 */}
      <BackgroundEffects />
      
      {/* 滾動效果 */}
      <ScrollEffects />

      <Navbar />
      
      <motion.main
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="flex-1 w-full max-w-[1400px] mx-auto px-6 lg:px-8 xl:px-12 py-8 relative z-10"
      >
        {/* Header Banner */}
        <motion.div variants={itemVariants} className="mb-8">
          <PageBanner
            title="GDG 核心團隊"
            description="了解 GDG on Campus NKNU 背後的團隊組成與成員介紹，一群熱愛科技並致力於推廣 Google 開發技術的夥伴。"
            style="relative bg-gradient-to-br from-indigo-600/90 via-purple-600/80 to-blue-700/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-white shadow-2xl overflow-hidden"
          />
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">
          {/* Main Content Area */}
          <motion.div
            variants={itemVariants}
            className="flex-1 xl:flex-grow space-y-8"
          >
            {/* Search & Filter */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <SearchFilterSection
                placeholder="搜尋成員..."
                keyword={keyword}
                setKeyword={setKeyword}
                tags={categories}
                setTags={setCategories}
                setPage={setPage}
                availableTags={categoryOptions}
                onClearFilters={handleClearFilters}
                onReload={handleReload}
              />
            </div>

            {/* Members Display */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              <MemberList
                members={filteredMembers}
                loading={loading}
                error={error}
                totalPages={totalPages}
                currentPage={page}
                onPageChange={p => setPage(p)}
              />
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            variants={itemVariants}
            className="w-full xl:w-80 space-y-8"
          >
            <TeamSidebar />
          </motion.aside>
        </div>
      </motion.main>
      
      <Footer />
    </div>
  )
}
