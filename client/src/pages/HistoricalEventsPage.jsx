import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/general/Navbar';
import { Footer } from '../components/Footer';
import SearchBar from '../components/general/SearchBar';
import FilterPanel from '../components/general/FilterPanel';
import EventCard from '../components/event/EventCard';
import Pagination from '../components/general/Pagination';
import LoadingSpinner from '../components/general/LoadingSpinner';
import NotificationToast from '../components/general/NotificationToast';
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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* 頂部橫幅 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
          <h1 className="text-3xl font-bold mb-2 relative z-10">歷史活動回顧</h1>
          <p className="text-gray-200 max-w-2xl relative z-10">
            探索 GDG on Campus NKNU 過去舉辦的精彩活動，了解我們如何透過各種工作坊、講座和社交活動，
            推廣 Google 技術並建立校園技術社群。
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 主要內容區 */}
          <div className="flex-1 space-y-6">
            {/* 搜尋與篩選面板 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">搜尋與篩選</h2>
                <div className="flex items-center space-x-2">
                  {/* 清除篩選按鈕 */}
                  {(keyword || tags.length > 0) && (
                    <button
                      onClick={() => {
                        setKeyword('');
                        setTags([]);
                        setPage(1);
                      }}
                      className="text-sm text-gray-500 hover:text-red-500 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      清除篩選
                    </button>
                  )}

                  {/* 重新載入按鈕 */}
                  <button
                    onClick={() => {
                      // 強制重新載入
                      setPage(prev => 0);
                      setTimeout(() => setPage(1), 10);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    重新載入
                  </button>
                </div>
              </div>

              <SearchBar
                onSearch={kw => { setKeyword(kw); setPage(1); }}
                placeholder="搜尋活動..."
              />

              <FilterPanel
                filters={tagOptions}
                selected={tags}
                onToggle={tag => {
                  setTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                  setPage(1);
                }}
              />
            </motion.div>

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
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                我們的活動足跡
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                GDG on Campus NKNU 自成立以來，已舉辦超過 50 場不同類型的技術活動，
                包括工作坊、講座、黑客松和社交聚會等。這些活動不僅傳播了 Google 技術知識，
                也培養了許多校園技術人才。
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">活動類型</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>技術工作坊 - 提供實作訓練</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>技術講座 - 邀請業界講師分享</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    <span>專案開發 - 團隊專案實作</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    <span>社交活動 - 技術社群交流</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 活動成果展示 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">活動成果展示</h3>
                <p className="text-sm text-gray-600 mb-4">
                  查看我們過去活動的成果和參加者的反饋。從程式碼到社群建設，
                  每一個活動都為校園技術生態帶來了積極的影響。
                </p>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <img src="/assets/events/workshop1.jpg" alt="工作坊" className="w-full h-32 object-cover" />
                <img src="/assets/events/lecture1.jpg" alt="講座" className="w-full h-32 object-cover" />
                <img src="/assets/events/hackathon1.jpg" alt="黑客松" className="w-full h-32 object-cover" />
                <img src="/assets/events/social1.jpg" alt="社交活動" className="w-full h-32 object-cover" />
              </div>
              <div className="p-4">
                <a
                  href="/event-gallery"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center"
                >
                  查看更多活動照片
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 資源下載 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-4">活動資源下載</h3>
              <p className="text-gray-300 text-sm mb-4">
                獲取我們過去活動的投影片、程式碼範例和學習資源，繼續您的技術學習之旅。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center p-3 bg-white/10 rounded-lg">
                  <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <span className="text-sm flex-1">Android 開發基礎講義</span>
                  <a href="#" className="text-blue-300 hover:text-blue-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
                <li className="flex items-center p-3 bg-white/10 rounded-lg">
                  <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <span className="text-sm flex-1">Firebase 工作坊範例專案</span>
                  <a href="#" className="text-blue-300 hover:text-blue-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
                <li className="flex items-center p-3 bg-white/10 rounded-lg">
                  <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <span className="text-sm flex-1">Flutter 進階課程資源</span>
                  <a href="#" className="text-blue-300 hover:text-blue-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
