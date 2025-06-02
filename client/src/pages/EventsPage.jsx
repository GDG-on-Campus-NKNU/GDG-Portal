import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../components/general/Navbar'
import { Footer } from '../components/Footer'
import { BackgroundEffects } from '../components/general/BackgroundEffects'
import { ScrollEffects } from '../components/general/ScrollEffects'
import LoadingSpinner from '../components/general/LoadingSpinner'
import NotificationToast from '../components/general/NotificationToast'
import Pagination from '../components/general/Pagination'
import SearchFilterSection from '../components/general/SearchFilterSection'
import PageBanner from '../components/general/PageBanner'
import EventCard from '../components/event/EventCard'
import CalendarView from '../components/event/CalendarView'
import EventSidebar from '../components/event/EventSidebar'
import { useEventData } from '../hooks/useEventData'
import { formatEventTimeRange } from '../utils/dateUtils'

export default function EventsPage() {
  const [keyword, setKeyword] = useState('')
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'calendar'
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  // Reset states when view mode changes
  useEffect(() => {
    if (viewMode === 'grid') {
      setPage(1);
      console.log('切換到網格視圖，當前篩選條件:', { keyword, tags });
    } else {
      console.log('切換到月曆視圖，當前篩選條件:', { keyword, tags });
    }
  }, [viewMode]);

  // Hook for grid view events
  const { events, loading, error, totalPages } = useEventData({
    page,
    limit: 8,
    keyword,
    tags,
    sort: 'desc',
    future: true
  });

  // Hook for calendar view events
  const { events: calendarEvents, loading: loadingCalendar } = useEventData({
    page: 1,
    limit: 100,
    future: false,
    keyword,
    tags,
    sort: 'asc'
  });

  // Hook for upcoming events (sidebar)
  const {
    events: upcomingEvents,
    loading: loadingUpcoming
  } = useEventData({
    page: 1,
    limit: 3,
    future: true,
    sort: 'asc'
  })

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
    const tag = availableTags.find(t => t.value === tagValue);
    return tag ? tag.label : tagValue;
  }

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
            title="GDG 活動中心"
            description="探索 GDG on Campus NKNU 舉辦的各種精彩活動，從工作坊到技術分享會，豐富你的學習體驗。"
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
                placeholder="搜尋活動..."
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
                {viewMode === 'grid' ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {events.map(ev => (
                      <motion.div
                        key={ev.id}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.02, 
                          y: -5,
                          transition: { duration: 0.3, ease: "easeOut" } 
                        }}
                        className="h-full"
                      >
                        <EventCard
                          id={ev.id}
                          title={ev.title}
                          date={ev.date}
                          endDate={ev.endDate}
                          location={ev.location}
                          tags={ev.tags}
                          excerpt={ev.excerpt}
                        />
                      </motion.div>
                    ))}
                    {events.length === 0 && (
                      <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 xl:col-span-3 text-center py-20 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20"
                      >
                        <div className="text-6xl mb-4">📅</div>
                        <p className="text-xl text-slate-600 font-medium">
                          目前沒有符合條件的活動
                        </p>
                        <p className="text-slate-500 mt-2">
                          請調整搜尋條件或稍後再試
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20"
                  >
                    <CalendarView
                      events={calendarEvents}
                      initialDate={selectedMonth}
                      onMonthChange={(date) => setSelectedMonth(date)}
                      onDayClick={day => console.log(day)}
                    />
                  </motion.div>
                )}

                {/* Pagination */}
                {events.length > 0 && viewMode === 'grid' && (
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
          <EventSidebar
            upcomingEvents={upcomingEvents}
            loadingUpcoming={loadingUpcoming}
            formatEventTimeRange={formatEventTimeRange}
            getTagLabel={getTagLabel}
          />
        </div>
      </motion.main>
      
      <Footer />
    </div>
  )
}
