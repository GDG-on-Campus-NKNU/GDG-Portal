import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import LoadingSpinner from '../components/general/LoadingSpinner';
import NotificationToast from '../components/general/NotificationToast';
import { useAnnouncementDetail } from '../hooks/useAnnouncementData';

export default function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { announcement, loading, error } = useAnnouncementDetail(id);

  // 處理返回按鈕點擊
  const handleBack = () => {
    navigate('/announcements');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size={16} />
          </div>
        ) : error ? (
          <NotificationToast message={error} type="error" />
        ) : announcement ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* 文章標頭 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {announcement.coverImage && (
                <div className="w-full h-64 bg-blue-100 relative">
                  <img
                    src={announcement.coverImage}
                    alt={announcement.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{new Date(announcement.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{announcement.author || '管理員'}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{announcement.title}</h1>
                {announcement.tags && announcement.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {announcement.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 文章內容 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: announcement.content }}
              />
            </div>

            {/* 導航按鈕 */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
              <button
                onClick={handleBack}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm bg-white hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回公告列表
              </button>

              <div className="flex gap-3">
                {announcement.prev && (
                  <button
                    onClick={() => navigate(`/announcements/${announcement.prev.id}`)}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm bg-white hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    上一則
                  </button>
                )}

                {announcement.next && (
                  <button
                    onClick={() => navigate(`/announcements/${announcement.next.id}`)}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm bg-white hover:bg-gray-50"
                  >
                    下一則
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600">找不到該公告</h2>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
