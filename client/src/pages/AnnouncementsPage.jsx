// AnnouncementsPage.jsx (Main Page)
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/general/Navbar';
import { Footer } from '../components/Footer';
import { useAnnouncementData } from '../hooks/useAnnouncementData';
import { useEventData } from '../hooks/useEventData';
import { formatEventTimeRange } from '../utils/dateUtils';
import UpcomingEvents from '../components/event/UpcomingEvents';
import PageBanner from '../components/general/PageBanner';
import SearchFilterSection from '../components/general/SearchFilterSection';
import AnnouncementsList from '../components/announcement/AnnouncementsList';
import PinnedAnnouncements from '../components/announcement/PinnedAnnouncements';
import SubscriptionBox from '../components/general/SubscriptionBox';
import NotificationToast from '../components/general/NotificationToast';
import LoadingSpinner from '../components/general/LoadingSpinner';
import Pagination from '../components/general/Pagination';

export default function AnnouncementsPage() {
  const [keyword, setKeyword] = useState('');
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);

  // 使用 hook 獲取所有公告資料
  const { announcements, loading, error, totalPages } = useAnnouncementData({
    page,
    limit: 5,
    keyword,
    tags
  });

  // 使用 hook 獲取置頂公告 (不受搜尋和標籤篩選影響)
  const { announcements: pinnedAnnouncements, loading: loadingPinned } = useAnnouncementData({
    page: 1,
    limit: 5,  // 最多顯示5則置頂公告
    isPinned: true  // 只獲取置頂公告
  });

  // 新增：使用 hook 獲取即將到來的活動
  const { events: upcomingEvents, loading: loadingUpcoming } = useEventData({
    page: 1,
    limit: 3,
    future: true // 只顯示未來的活動
  });

  const availableTags = [
    { label: '技術', value: 'tech' },
    { label: '活動', value: 'event' },
    { label: '公告', value: 'notice' },
    { label: '課程', value: 'course' },
    { label: '實習', value: 'internship' },
  ];

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
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <PageBanner title="GDG 公告中心" description="在這裡查看所有關於 GDG on Campus NKNU 的最新公告、活動資訊和重要通知。" style="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-8 relative overflow-hidden"/>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 主要內容區 */}
          <div className="flex-1 space-y-6">
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

            {/* 錯誤或 Loading */}
            {error && <NotificationToast message={error} type="error" />}
            {loading ? (
              <div className="flex justify-center p-12">
                <LoadingSpinner size={16} />
              </div>
            ) : (
              <>
                <AnnouncementsList announcements={announcements} />

                {/* 分頁 */}
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

            <SubscriptionBox title="訂閱公告通知" description="訂閱我們的最新公告，直接發送到你的信箱!"/>
          </motion.aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
