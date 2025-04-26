import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/general/Navbar';
import { Footer } from '../components/Footer';
import EventCard from '../components/event/EventCard';
import Pagination from '../components/general/Pagination';
import LoadingSpinner from '../components/general/LoadingSpinner';
import NotificationToast from '../components/general/NotificationToast';
import PageBanner from '../components/general/PageBanner';
import SearchFilterSection from '../components/general/SearchFilterSection';
import { EventTypeInfo, EventGalleryPreview, EventResourceDownload } from '../components/event/EventInfo';
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
    { label: '線上', value: 'online' },
    { label: '實體', value: 'offline' },
    { label: '工作坊', value: 'workshop' },
    { label: '分享會', value: 'talk' },
  ]

  // 動畫設定
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* 頂部橫幅 */}
        <PageBanner title="歷史活動回顧" description="探索 GDG on Campus NKNU 過去舉辦的精彩活動，了解我們如何透過各種工作坊、講座和社交活動，推廣 Google 技術並建立校園技術社群。" style="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl p-8 mb-8 relative overflow-hidden" />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 主要內容區 */}
          <div className="flex-1 space-y-6">
            {/* 搜尋與篩選面板 */}
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

            {/* 顯示錯誤訊息 */}
            {error && <NotificationToast message={error} type="error" />}

            {/* 載入中狀態 */}
            {loading ? (
              <div className="flex justify-center p-12">
                <LoadingSpinner size={16} />
              </div>
            ) : (
              <>
                {/* 活動列表 */}
                {events.length > 0 ? (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className={
                      viewMode === 'grid'
                        ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
                        : 'space-y-6'
                    }
                  >
                    {events.map(event => (
                      <motion.div key={event.id} variants={item}>
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
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">沒有找到歷史活動</h3>
                    <p className="mt-2 text-gray-500">
                      目前沒有符合您搜尋條件的歷史活動，請嘗試調整過濾條件或關鍵字。
                    </p>
                    <button
                      onClick={() => { setKeyword(''); setTags([]); setPage(1); }}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      清除所有過濾條件
                    </button>
                  </div>
                )}

                {/* 分頁控制 */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 flex justify-center"
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
          </div>

          {/* 側邊欄 */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-80 space-y-6"
          >
            {/* 關於歷史活動 */}
            <EventTypeInfo />

            {/* 活動成果展示 */}
            <EventGalleryPreview />

            {/* 資源下載 */}
            <EventResourceDownload />

          </motion.aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
