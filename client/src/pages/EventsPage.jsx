import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../components/general/Navbar'
import { Footer } from '../components/Footer'
import SearchBar from '../components/general/SearchBar'
import FilterPanel from '../components/general/FilterPanel'
import LoadingSpinner from '../components/general/LoadingSpinner'
import NotificationToast from '../components/general/NotificationToast'
import Pagination from '../components/general/Pagination'
import EventCard from '../components/event/EventCard'
import CalendarView from '../components/event/CalendarView'
import UpcomingEvents from '../components/event/UpcomingEvents'
import EventLocations from '../components/event/EventLocations'
import EventSubscription from '../components/event/EventSubscription'
import { useEventData } from '../hooks/useEventData'

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

  const formatEventTimeRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formattedDate = start.toLocaleDateString('zh-TW', {
      month: 'numeric',
      day: 'numeric'
    });

    const startTime = start.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const endTime = end.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${formattedDate} ${startTime} - ${endTime}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
          <h1 className="text-3xl font-bold mb-2 relative z-10">GDG 活動中心</h1>
          <p className="text-blue-100 max-w-2xl relative z-10">
            探索 GDG on Campus NKNU 舉辦的各種精彩活動，從工作坊到技術分享會，豐富你的學習體驗。
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 space-y-6"
          >
            {/* Search & Filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">搜尋與篩選</h2>
                <div className="flex items-center space-x-2">
                  {/* Clear filter button */}
                  {(keyword || tags.length > 0) && (
                    <button
                      onClick={() => {
                        setKeyword('');
                        setTags([]);
                        setPage(1);
                      }}
                      className="text-sm text-gray-500 hover:text-red-500 mr-2 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      清除篩選
                    </button>
                  )}

                  {/* Reload button */}
                  <button
                    onClick={() => {
                      setPage(prev => 0);
                      setTimeout(() => setPage(1), 10);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 mr-2 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    重新載入
                  </button>

                  {/* View mode toggle */}
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`p-2 rounded ${viewMode === 'calendar' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <SearchBar onSearch={kw => { setKeyword(kw); setPage(1) }} placeholder="搜尋活動..." />
              <FilterPanel
                filters={availableTags}
                selected={tags}
                onToggle={tag => {
                  setTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  )
                  setPage(1)
                }}
              />
            </motion.div>

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

            {/* Event Locations - Using the new component */}
            <EventLocations />

            {/* Event Subscription - Using the new component */}
            <EventSubscription />
          </motion.aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
