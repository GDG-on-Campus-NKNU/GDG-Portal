import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navbar } from '../components/general/Navbar';
import { Footer } from '../components/Footer';
import { BackgroundEffects } from '../components/general/BackgroundEffects';
import { ScrollEffects } from '../components/general/ScrollEffects';
import LoadingSpinner from '../components/general/LoadingSpinner';
import NotificationToast from '../components/general/NotificationToast';
import { useEventDetail } from '../hooks/useEventData';
import { EventTimeInfo, EventLocationInfo, EventDescriptionInfo } from '../components/event/EventDetailInfo';

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, loading, error } = useEventDetail(id);
  const [registering, setRegistering] = useState(false);

  // 處理報名按鈕點擊
  const handleRegister = () => {
    if (event && event.registrationUrl) {
      window.open(event.registrationUrl, '_blank');
    }
  };

  // 處理返回按鈕點擊
  const handleBack = () => {
    // 檢查活動是否已經結束，導向不同的列表頁面
    if (isEventEnded(event)) {
      // 如果是歷史活動，返回歷史活動列表頁面
      navigate('/events/historical');
    } else {
      // 如果是未來活動，返回即將到來活動列表頁面
      navigate('/events');
    }
  };

  // 格式化日期與時間範圍
  const formatDateTimeRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 格式化日期
    const formattedDate = start.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // 格式化時間範圍
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

  // 格式化單一日期時間
  const formatDateTime = (date) => {
    const dateObj = new Date(date);
    
    const formattedDate = dateObj.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = dateObj.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${formattedDate} ${formattedTime}`;
  };

  // 取得標籤的中文名稱
  const getTagLabel = (tag) => {
    const tagMap = {
      'online': '線上',
      'offline': '實體',
      'workshop': '工作坊',
      'talk': '分享會'
    };

    return tagMap[tag] || tag;
  };

  // 判斷活動是否已結束
  const isEventEnded = (event) => {
    if (!event || !event.endDate) return false;
    const now = new Date();
    const endDate = new Date(event.endDate);
    return endDate < now;
  };

  const handleHistoricalEvent = () => {
    // 如果有外部連結資源就開啟外部連結
    if (event && event.registrationUrl) {
      window.open(event.registrationUrl, '_blank');
    }
    // 如果有活動資源則滾動到資源區域
    else if (event && event.resources && event.resources.length > 0) {
      document.getElementById('event-resources').scrollIntoView({ behavior: 'smooth' });
    }
    // 如果都沒有則滾動到活動詳情區域
    else {
      document.getElementById('event-details').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 動態背景效果 */}
      <BackgroundEffects />
      <ScrollEffects />
      
      {/* 主要內容 */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner size={16} />
            </div>
          ) : error ? (
            <NotificationToast message={error} type="error" />
          ) : event ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-0"
            >
              {/* 英雄區塊與活動封面 */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[50vh] min-h-[400px] overflow-hidden"
              >
                {/* 封面圖片 */}
                <div className="absolute inset-0">
                  {event.coverImage ? (
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
                  )}
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* 內容覆蓋層 - 改為上下置中 */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <div className="max-w-4xl mx-auto px-4">
                    {/* 返回按鈕 */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBack}
                      className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md 
                               border border-white/30 rounded-full text-white hover:bg-white/30 
                               transition-all duration-300 mx-auto"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      返回{isEventEnded(event) ? '歷史' : '即將到來的'}活動
                    </motion.button>

                    {/* 活動標題和基本資訊 */}
                    <div className="space-y-6">
                      {/* 標籤 */}
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-2"
                      >
                        {event.tags.map((tag, index) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 
                                     text-white rounded-full text-sm font-medium"
                          >
                            {getTagLabel(tag)}
                          </motion.span>
                        ))}
                      </motion.div>

                      {/* 標題 */}
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
                      >
                        {event.title}
                      </motion.h1>

                      {/* 基本資訊卡片 - 簡化版本 */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-4 mb-6"
                      >
                        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md 
                                      border border-white/20 rounded-full text-white text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {event.endDate ? formatDateTimeRange(event.date, event.endDate) : formatDateTime(event.date)}
                        </div>

                        <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md 
                                      border border-white/20 rounded-full text-white text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                      </motion.div>

                      {/* 行動按鈕 */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex justify-center"
                      >
                        {isEventEnded(event) ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleHistoricalEvent}
                            className="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/30 
                                     text-white rounded-full font-medium hover:bg-white/30 
                                     transition-all duration-300 flex items-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {event.registrationUrl ? "查看活動網站" : "查看活動回顧"}
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRegister}
                            disabled={registering}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 
                                     text-white rounded-full font-medium hover:from-blue-600 hover:to-purple-600 
                                     transition-all duration-300 flex items-center gap-2 shadow-lg"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            立即報名
                          </motion.button>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* 活動詳情內容區 */}
              <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
                {/* 活動時間資訊 */}
                <EventTimeInfo 
                  event={event} 
                  formatDateTimeRange={formatDateTimeRange} 
                  formatDateTime={formatDateTime} 
                />

                {/* 活動地點資訊 */}
                <EventLocationInfo event={event} />

                {/* 活動詳情 */}
                <EventDescriptionInfo event={event} />

                {/* 講者資訊 */}
                {event.speakers && event.speakers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 
                                    rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">講者介紹</h2>
                    </div>
                    <div className="grid gap-6">
                      {event.speakers.map((speaker, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-white/20 rounded-2xl"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 
                                          overflow-hidden shadow-lg">
                              {speaker.avatar ? (
                                <img
                                  src={speaker.avatar}
                                  alt={speaker.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white">
                                  <span className="text-xl font-bold">{speaker.name.charAt(0)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold text-lg text-gray-800 mb-1">{speaker.name}</h3>
                            <p className="text-blue-600 font-medium mb-2">{speaker.role}</p>
                            <p className="text-gray-600 leading-relaxed">{speaker.bio}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 活動資源 (僅歷史活動顯示) */}
                {isEventEnded(event) && event.resources && event.resources.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    id="event-resources"
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 
                                    rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">活動資源</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {event.resources.map((resource, index) => (
                        <motion.a
                          key={index}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 p-4 bg-white/20 hover:bg-white/30 
                                   rounded-2xl border border-white/30 transition-all duration-300 
                                   shadow-lg hover:shadow-xl"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 
                                        rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium text-gray-800">{resource.title}</span>
                            <div className="text-sm text-gray-600">點擊下載</div>
                          </div>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl 
                            flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">找不到活動資料</h2>
              <p className="text-gray-500">此活動可能已被移除或不存在</p>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
