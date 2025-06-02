import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Navbar, 
  BackgroundEffects, 
  ScrollEffects, 
  PageBanner,
  Pagination, 
  LoadingSpinner, 
  NotificationToast, 
  SearchFilterSection 
} from '../components/general';
import { Footer } from '../components/Footer';
import { EventCard, HEventSidebar } from '../components/event';
import { useHistoricalEvents, useEventTags } from '../hooks/useEventData';

export default function HistoricalEventsPage() {
  // 狀態變數
  const [keyword, setKeyword] = useState('');
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');

  // 使用 custom hooks 獲取資料
  const { events, loading, error, totalPages } = useHistoricalEvents({
    page,
    keyword,
    tags,
    limit: 9
  });

  // 使用 custom hook 獲取標籤選項
  const { tags: tagOptions } = useEventTags();

  const availableTags = [
    { label: 'Frontend 前端', value: 'frontend' },
    { label: 'Backend 後端', value: 'backend' },
    { label: 'Mobile 行動開發', value: 'mobile' },
    { label: 'Cloud 雲端技術', value: 'cloud' },
    { label: 'AI 人工智慧', value: 'ai' },
    { label: 'Workshop 工作坊', value: 'workshop' },
    { label: 'Lecture 講座', value: 'lecture' },
    { label: 'React', value: 'react' },
    { label: 'Google', value: 'google' },
  ]

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
  };

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
  };

  const handleClearFilters = () => {
    setKeyword('');
    setTags([]);
    setPage(1);
  };

  const handleReload = () => {
    // 強制重新載入
    setPage(0); // 先設為不可能的值
    setTimeout(() => setPage(1), 10); // 然後設回第一頁
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/30 to-slate-100/50 text-slate-800 relative overflow-hidden">
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
            title="歷史活動回顧"
            description="探索 GDG on Campus NKNU 過去舉辦的精彩活動，了解我們如何透過各種工作坊、講座和社交活動，推廣 Google 技術並建立校園技術社群。"
            style="relative bg-gradient-to-br from-slate-700/90 via-gray-600/80 to-slate-800/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-white shadow-2xl overflow-hidden"
          />
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">
          {/* Main Content Area */}
          <motion.div
            variants={itemVariants}
            className="flex-1 xl:flex-grow space-y-8"
          >
            {/* 搜尋與篩選面板 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <SearchFilterSection
                placeholder="搜尋歷史活動..."
                keyword={keyword}
                setKeyword={setKeyword}
                tags={tags}
                setTags={setTags}
                setPage={setPage}
                availableTags={availableTags}
                onClearFilters={handleClearFilters}
                onReload={handleReload}
              />
            </div>

            {/* 顯示錯誤訊息 */}
            {error && <NotificationToast message={error} type="error" />}

            {/* 載入中狀態 */}
            {loading ? (
              <div className="flex justify-center p-20">
                <LoadingSpinner size={16} />
              </div>
            ) : (
              <>
                {/* 活動列表 */}
                {events.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className={
                      viewMode === 'grid'
                        ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'space-y-6'
                    }
                  >
                    {events.map(event => (
                      <motion.div 
                        key={event.id} 
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -5,
                          transition: { duration: 0.3, ease: "easeOut" } 
                        }}
                        className="h-full"
                      >
                        <EventCard
                          id={event.id}
                          title={event.title}
                          date={event.date}
                          endDate={event.endDate}
                          location={event.location}
                          excerpt={event.excerpt}
                          tags={event.tags}
                          isHistorical={true}
                          variant={viewMode === 'grid' ? 'compact' : 'extended'}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    variants={itemVariants}
                    className="text-center py-20 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20"
                  >
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-xl text-slate-600 font-medium mb-2">
                      沒有找到歷史活動
                    </h3>
                    <p className="text-slate-500 mb-4">
                      目前沒有符合您搜尋條件的歷史活動，請嘗試調整過濾條件或關鍵字。
                    </p>
                    <motion.button
                      onClick={() => { setKeyword(''); setTags([]); setPage(1); }}
                      className="px-6 py-3 bg-gradient-to-r from-slate-600 to-gray-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      清除所有過濾條件
                    </motion.button>
                  </motion.div>
                )}

                {/* 分頁控制 */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="py-8"
                  >
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={newPage => setPage(newPage)}
                    />
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

          {/* Sidebar */}
          <HEventSidebar />
        </div>
      </motion.main>
      
      <Footer />
    </div>
  );
}
