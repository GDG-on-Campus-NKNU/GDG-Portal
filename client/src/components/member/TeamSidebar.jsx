import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function TeamSidebar() {
  const [currentTip, setCurrentTip] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const teamTips = [
    "幹部每週都會進行技術分享會",
    "我們定期與業界講師合作舉辦工作坊", 
    "團隊成員來自不同科系，技能互補",
    "加入幹部可獲得 Google 相關認證機會"
  ];

  // 自動輪播功能
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % teamTips.length);
    }, 4000); // 每4秒切換一次

    return () => clearInterval(interval);
  }, [isAutoPlay, teamTips.length]);

  const slideInVariants = {
    hidden: { opacity: 0, x: 50 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: 0.3
      }
    }
  };

  return (
    <motion.aside
      variants={slideInVariants}
      initial="hidden"
      animate="show"
      className="w-full xl:w-80 xl:min-w-80 xl:flex-shrink-0 space-y-6"
    >
      {/* Team Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            團隊數據
          </span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-slate-50/70 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">25+</div>
            <div className="text-xs text-slate-600">現任幹部</div>
          </div>
          <div className="text-center p-3 bg-slate-50/70 rounded-xl">
            <div className="text-2xl font-bold text-green-600">150+</div>
            <div className="text-xs text-slate-600">活動參與</div>
          </div>
          <div className="text-center p-3 bg-slate-50/70 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-xs text-slate-600">不同組別</div>
          </div>
          <div className="text-center p-3 bg-slate-50/70 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">3年</div>
            <div className="text-xs text-slate-600">運營歷史</div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-gradient-to-br from-amber-400/10 via-orange-400/10 to-red-400/10 backdrop-blur-xl border border-amber-200/30 rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              團隊小知識
            </span>
          </h3>
          
          {/* 播放/暫停按鈕 */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isAutoPlay 
                ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title={isAutoPlay ? '暫停自動播放' : '開始自動播放'}
          >
            {isAutoPlay ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM11 8a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="relative">
          {/* 左箭頭 */}
          <button
            onClick={() => {
              setCurrentTip((prev) => (prev - 1 + teamTips.length) % teamTips.length);
              setIsAutoPlay(false);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            title="上一個小知識"
          >
            <svg className="w-4 h-4 text-amber-600 group-hover:text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 內容區塊 */}
          <motion.div
            key={currentTip}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/60 p-4 rounded-xl border border-amber-200/40 mx-10"
          >
            <p className="text-sm text-slate-700 italic text-center">💡 {teamTips[currentTip]}</p>
          </motion.div>

          {/* 右箭頭 */}
          <button
            onClick={() => {
              setCurrentTip((prev) => (prev + 1) % teamTips.length);
              setIsAutoPlay(false);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            title="下一個小知識"
          >
            <svg className="w-4 h-4 text-amber-600 group-hover:text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex justify-center items-center mt-4 space-x-3">
          {teamTips.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTip(index);
                setIsAutoPlay(false); // 手動選擇時暫停自動播放
              }}
              className={`relative w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentTip ? 'bg-amber-500 scale-125' : 'bg-amber-200 hover:bg-amber-300 hover:scale-110'
              }`}
              title={`第 ${index + 1} 個小知識`}
            >
              {/* 自動播放進度環 */}
              {index === currentTip && isAutoPlay && (
                <motion.div
                  className="absolute -inset-1 border-2 border-amber-500/30 rounded-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: [0.8, 1.2, 0.8], 
                    opacity: [0.3, 0.8, 0.3] 
                  }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              )}
            </button>
          ))}
        </div>
        
        {/* 提示文字 */}
        <div className="text-center mt-3">
          <p className="text-xs text-slate-500">
            {isAutoPlay 
              ? '🔄 自動播放中 - 使用箭頭或圓點可暫停並切換' 
              : '⏸️ 已暫停 - 使用箭頭切換或點擊播放按鈕繼續'
            }
          </p>
        </div>
      </motion.div>

      {/* About Our Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            關於我們的團隊
          </span>
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          GDG on Campus NKNU 的幹部團隊由來自各系所、擁有不同專長的學生組成，
          共同致力於推廣 Google 技術與提升校園的技術氛圍。幹部分為核心幹部、
          技術組、活動組、設計組、公關組和行政組等不同職務。
        </p>
        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/50">
          <h4 className="font-medium text-sm mb-2 text-slate-900">幹部制度</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span>每學期招募與培訓新幹部</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span>定期舉行幹部會議與訓練</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span>提供技術實踐與領導能力培養</span>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Join Team CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <motion.div 
          className="relative z-10"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
                加入幹部團隊
              </span>
            </h3>
          </div>
          <p className="text-blue-100 text-sm mb-4">
            每學期初我們會開放幹部招募，歡迎對 Google 技術有熱情、想提升自我能力的同學加入我們！
          </p>
          <a
            href="/join-team"
            className="inline-flex items-center justify-center w-full bg-white text-blue-600 font-medium py-3 px-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105"
          >
            了解招募資訊
          </a>
        </motion.div>
      </motion.div>

      {/* Team Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            幹部福利
          </span>
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start">
            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-slate-600">優先參加 Google 技術活動與工作坊</span>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-slate-600">與業界接觸的機會與人脈建立</span>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-slate-600">獲得實務領導與專案管理經驗</span>
          </li>
          <li className="flex items-start">
            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-slate-600">提升個人履歷與就業競爭力</span>
          </li>
        </ul>
      </motion.div>
    </motion.aside>
  );
}
