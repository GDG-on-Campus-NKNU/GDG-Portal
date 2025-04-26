import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../components/general/Navbar'
import { Footer } from '../components/Footer'
import SearchBar from '../components/general/SearchBar'
import FilterPanel from '../components/general/FilterPanel'
import LoadingSpinner from '../components/general/LoadingSpinner'
import NotificationToast from '../components/general/NotificationToast'
import Pagination from '../components/general/Pagination'
import PageBanner from '../components/general/PageBanner'
import SearchFilterSection from '../components/general/SearchFilterSection'
import SubscriptionBox from '../components/general/SubscriptionBox'
import EventCard from '../components/event/EventCard'
import CalendarView from '../components/event/CalendarView'
import UpcomingEvents from '../components/event/UpcomingEvents'
import EventLocations from '../components/event/EventLocations'
import EventSubscription from '../components/event/EventSubscription'
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
    { label: '線上', value: 'online' },
    { label: '實體', value: 'offline' },
    { label: '工作坊', value: 'workshop' },
    { label: '分享會', value: 'talk' },
  ]

  // Animation variants
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
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* Header Banner */}
        <PageBanner title="GDG 活動中心" description="探索 GDG on Campus NKNU 舉辦的各種精彩活動，從工作坊到技術分享會，豐富你的學習體驗。" style="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-8 relative overflow-hidden"/>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 space-y-6"
          >
            {/* Search & Filter */}
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

            {/* Error or Loading */}
            {error && <NotificationToast message={error} type="error" />}
            {loading ? (
              <div className="flex justify-center p-12">
                <LoadingSpinner size={16} />
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid sm:grid-cols-2 gap-4"
                  >
                    {events.map(ev => (
                      <motion.div
                        key={ev.id}
                        variants={item}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
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
                      <motion.p
                        variants={item}
                        className="col-span-2 text-center py-12 bg-white rounded-lg shadow-md text-gray-500"
                      >
                        目前沒有符合條件的活動
                      </motion.p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-lg shadow-md p-6"
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
                    className="py-6"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-80 space-y-6"
          >
            {/* Upcoming Events - Using the new component */}
            <UpcomingEvents
              events={upcomingEvents}
              loading={loadingUpcoming}
              formatEventTimeRange={formatEventTimeRange}
              getTagLabel={getTagLabel}
            />

            <EventLocations />
            <SubscriptionBox title="訂閱活動通知" description="第一時間收到最新活動資訊，不錯過任何一場精彩活動！" />
          </motion.aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
