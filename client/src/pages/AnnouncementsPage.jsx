// AnnouncementsPage.jsx (Main Page)
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Navbar, 
  BackgroundEffects, 
  ScrollEffects, 
  PageBanner, 
  SearchFilterSection, 
  SubscriptionBox, 
  NotificationToast, 
  LoadingSpinner, 
  Pagination 
} from '../components/general';
import { Footer } from '../components/Footer';
import { useAnnouncementData } from '../hooks/useAnnouncementData';
import { useEventData } from '../hooks/useEventData';
import { formatEventTimeRange } from '../utils/dateUtils';
import { UpcomingEvents } from '../components/event';
import { AnnouncementsList, PinnedAnnouncements } from '../components/announcement';

export default function AnnouncementsPage() {
  const [keyword, setKeyword] = useState('')
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1)

  // 使用 hook 獲取所有公告資料
  const { announcements, loading, error, totalPages } = useAnnouncementData({
    page,
    limit: 3,
    keyword,
    tags
  });

  // 使用 hook 獲取置頂公告 (不受搜尋和標籤篩選影響)
  const { announcements: pinnedAnnouncements, loading: loadingPinned } = useAnnouncementData({
    page: 1,
    limit: 5,  // 最多顯示5則置頂公告
    isPinned: true  // 只獲取置頂公告
  });

  // 使用 hook 獲取即將到來的活動
  const { events: upcomingEvents, loading: loadingUpcoming } = useEventData({
    page: 1,
    limit: 3,
    future: true // 只顯示未來的活動
  });

  const availableTags = [
    { label: 'Welcome 歡迎', value: 'welcome' },
    { label: 'Community 社群', value: 'community' },
    { label: 'Event 活動', value: 'event' },
    { label: 'Frontend 前端', value: 'frontend' },
  ];

  // Animation variants
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

  // Helper functions
  const getTagLabel = (tagValue) => {
    const eventTags = [
      { label: '線上', value: 'online' },
      { label: '實體', value: 'offline' },
      { label: '工作坊', value: 'workshop' },
      { label: '分享會', value: 'talk' }
    ];

    const tag = eventTags.find(t => t.value === tagValue);
    return tag ? tag.label : tagValue;
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
            title="GDG 公告中心"
            description="在這裡查看所有關於 GDG on Campus NKNU 的最新公告、活動資訊和重要通知。"
            style="relative bg-gradient-to-br from-blue-600/90 via-purple-600/80 to-indigo-700/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-white shadow-2xl overflow-hidden"
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
                placeholder="搜尋公告..."
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

            {/* Error or Loading */}
            {error && <NotificationToast message={error} type="error" />}
            {loading ? (
              <div className="flex justify-center p-20">
                <LoadingSpinner size={16} />
              </div>
            ) : (
              <>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-6"
                >
                  <AnnouncementsList announcements={announcements} />
                </motion.div>

                {/* Pagination */}
                {announcements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="py-8"
                  >
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages || 1}
                      onPageChange={p => setPage(p)}
                    />
                  </motion.div>
                )}
              </>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            variants={itemVariants}
            className="w-full xl:w-80 space-y-8"
          >
            <PinnedAnnouncements
              pinnedAnnouncements={pinnedAnnouncements}
              loading={loadingPinned}
            />

            <UpcomingEvents
              events={upcomingEvents}
              loading={loadingUpcoming}
              formatEventTimeRange={formatEventTimeRange}
              getTagLabel={getTagLabel}
            />

            <SubscriptionBox 
              title="訂閱公告通知" 
              description="訂閱我們的最新公告，直接發送到你的信箱!"
            />
          </motion.aside>
        </div>
      </motion.main>
      
      <Footer />
    </div>
  );
}
