import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import LoadingSpinner from '../components/general/LoadingSpinner';
import NotificationToast from '../components/general/NotificationToast';
import { useEventDetail } from '../hooks/useEventData';

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
    navigate('/events');
  };

  // 格式化日期與時間
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = date.toLocaleTimeString('zh-TW', {
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
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
            className="space-y-6"
          >
            {/* 返回按鈕 */}
            <button
              onClick={handleBack}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              返回活動列表
            </button>

            {/* 活動封面照片 */}
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-blue-100">
              {event.coverImage ? (
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                  <h2 className="text-white text-2xl font-bold">{event.title}</h2>
                </div>
              )}

              {/* 活動標籤 */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-600 bg-opacity-90 text-white rounded-full text-sm"
                  >
                    {getTagLabel(tag)}
                  </span>
                ))}
              </div>
            </div>

            {/* 活動標題和基本資訊 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{event.title}</h1>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDateTime(event.date)}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>

                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-200 transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  立即報名
                </button>
              </div>

              {/* 活動描述 */}
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-3">活動詳情</h2>
                <p className="whitespace-pre-line leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* 講者資訊 */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">講者介紹</h2>
                <div className="space-y-4">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                          {speaker.avatar ? (
                            <img
                              src={speaker.avatar}
                              alt={speaker.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
                              <span className="text-xl font-bold">{speaker.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-medium">{speaker.name}</h3>
                        <p className="text-sm text-blue-600">{speaker.role}</p>
                        <p className="text-sm text-gray-600 mt-1">{speaker.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-500">找不到活動資料</h2>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
