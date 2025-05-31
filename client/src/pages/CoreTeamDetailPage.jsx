import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Navbar } from '../components/general/Navbar';
import { Footer } from '../components/Footer';
import LoadingSpinner from '../components/general/LoadingSpinner';
import BackgroundEffects from '../components/general/BackgroundEffects';
import ScrollEffects from '../components/general/ScrollEffects';
import { useMemberDetail } from '../hooks/useCoreTeamData';

export default function CoreTeamDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { member, loading, error } = useMemberDetail(id);
  const [selectedPhoto, setSelectedPhoto] = useState('');

  // 設定主要照片
  useEffect(() => {
    if (member && member.photo) {
      setSelectedPhoto(member.photo);
    }
  }, [member]);

  // 處理照片點擊
  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  // 處理返回按鈕點擊
  const handleBack = () => {
    navigate('/members');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-slate-800 relative overflow-hidden">
      <BackgroundEffects />
      <ScrollEffects />
      <Navbar />
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-8 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size={16} />
          </div>
        ) : error ? (
          <motion.div 
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">載入失敗</h3>
              <p className="text-slate-600 mb-4">{error}</p>
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                返回幹部列表
              </button>
            </div>
          </motion.div>
        ) : member ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="space-y-8"
          >
            {/* 返回按鈕 */}
            <motion.button
              onClick={handleBack}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors group"
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回幹部列表
            </motion.button>

            {/* 幹部基本資料卡 */}
            <motion.div 
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.1 }}
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/3">
                  <div className="h-full relative">
                    <img
                      className="h-full w-full object-cover md:object-center"
                      src={selectedPhoto || member.photo}
                      alt={member.name}
                    />
                    {/* 額外照片選擇器 */}
                    {member.additionalPhotos && member.additionalPhotos.length > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handlePhotoClick(member.photo)}
                            className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${selectedPhoto === member.photo ? 'border-blue-500 scale-110' : 'border-white/50 hover:border-white'
                              }`}
                          >
                            <img
                              src={member.photo}
                              alt="幹部主要照片"
                              className="w-full h-full object-cover"
                            />
                          </button>
                          {member.additionalPhotos.map((photo, index) => (
                            <button
                              key={index}
                              onClick={() => handlePhotoClick(photo)}
                              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${selectedPhoto === photo ? 'border-blue-500 scale-110' : 'border-white/50 hover:border-white'
                                }`}
                            >
                              <img
                                src={photo}
                                alt={`幹部照片 ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 md:w-2/3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900">{member.name}</h1>
                      <p className="text-xl text-blue-600 font-medium">{member.title}</p>
                    </div>
                    {member.categories && member.categories.length > 0 && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-full font-medium">
                        {member.categories[0] === 'core' ? '核心幹部' :
                          member.categories[0] === 'tech' ? '技術教學' :
                            member.categories[0] === 'pr' ? '公關行銷' :
                              member.categories[0] === 'design' ? '美術設計' :
                                member.categories[0] === 'affairs' ? '總務攝影' :
                                  member.categories[0]}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">系所</p>
                          <p className="font-medium text-slate-900">{member.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">年級</p>
                          <p className="font-medium text-slate-900">{member.year}</p>
                        </div>
                      </div>
                      {member.contactEmail && (
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">聯絡信箱</p>
                            <a href={`mailto:${member.contactEmail}`} className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                              {member.contactEmail}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        專長領域
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.skills && member.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-slate-100 text-slate-800 text-sm px-3 py-1 rounded-lg font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 社群媒體連結 */}
                  {member.socialLinks && Object.keys(member.socialLinks).length > 0 && (
                    <div className="mt-8">
                      <p className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        社群媒體
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {Object.entries(member.socialLinks).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-slate-100 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                            title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                          >
                            {platform === 'github' ? (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            ) : platform === 'linkedin' ? (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                              </svg>
                            ) : platform === 'instagram' ? (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            ) : platform === 'facebook' ? (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.736-.9 10.125-5.864 10.125-11.854z" />
                              </svg>
                            ) : platform === 'youtube' ? (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a2.99 2.99 0 0 0-2.106-2.11C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.392.576a2.99 2.99 0 0 0-2.106 2.11C0 8.078 0 12 0 12s0 3.922.502 5.814a2.99 2.99 0 0 0 2.106 2.11C4.5 20.5 12 20.5 12 20.5s7.5 0 9.392-.576a2.99 2.99 0 0 0 2.106-2.11C24 15.922 24 12 24 12s0-3.922-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                              </svg>
                            ) : platform === 'discord' ? (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.608 1.249a18.708 18.708 0 0 0-5.766 0 12.505 12.505 0 0 0-.617-1.249.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.045-.32 13.579.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.027c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.13 13.13 0 0 1-1.872-.9.077.077 0 0 1-.008-.128c.126-.094.252-.192.373-.291a.075.075 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.062 0a.073.073 0 0 1 .078.009c.121.099.247.197.373.291a.077.077 0 0 1-.006.128 12.954 12.954 0 0 1-1.873.899.076.076 0 0 0-.04.106c.36.699.772 1.364 1.226 1.993a.076.076 0 0 0 .084.028 19.876 19.876 0 0 0 6.002-3.03.076.076 0 0 0 .031-.056c.5-5.177-.838-9.661-3.872-13.661a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.182 0-2.155-1.085-2.155-2.419 0-1.333.955-2.418 2.155-2.418 1.21 0 2.174 1.095 2.155 2.418 0 1.334-.955 2.419-2.155 2.419zm7.96 0c-1.182 0-2.155-1.085-2.155-2.419 0-1.333.955-2.418 2.155-2.418 1.21 0 2.174 1.095 2.155 2.418 0 1.334-.945 2.419-2.155 2.419z" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                              </svg>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* 幹部詳細介紹 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                個人簡介
              </h2>
              <div className="prose max-w-none">
                {member.fullBio && typeof member.fullBio === 'string' ? (
                  member.fullBio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-slate-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="mb-4 text-slate-600 italic">暫無詳細介紹</p>
                )}
              </div>
            </motion.div>

            {/* 成就列表 */}
            {member.achievements && member.achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
                className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  成就與貢獻
                </h2>
                <ul className="space-y-4">
                  {member.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700 leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* 聯繫表格 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  與 {member.name} 聯繫
                </h2>
                <p className="mb-6 text-blue-100">
                  如有與 {member.title} 相關的問題或合作機會，歡迎透過以下表單聯繫：
                </p>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">
                        姓名
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        placeholder="請輸入您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-blue-100 mb-2">
                        電子郵件
                      </label>
                      <input
                        type="email"
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        placeholder="請輸入您的電子郵件"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      主旨
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                      placeholder="請輸入信件主旨"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      訊息內容
                    </label>
                    <textarea
                      rows={4}
                      className="w-full p-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none"
                      placeholder="請輸入您想表達的內容"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      送出訊息
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-12 shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">找不到該幹部資料</h2>
            <p className="text-slate-600 mb-6">請檢查網址是否正確，或者該幹部可能已不存在</p>
            <button
              onClick={handleBack}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              返回幹部列表
            </button>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
