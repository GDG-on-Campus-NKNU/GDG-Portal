import React from 'react';
import { motion } from 'framer-motion';

export function EventTypeInfo() {
  const eventTypes = [
    { name: '技術工作坊', description: '提供實作訓練', color: 'from-blue-500 to-blue-600', icon: '💻' },
    { name: '技術講座', description: '邀請業界講師分享', color: 'from-green-500 to-green-600', icon: '🎤' },
    { name: '專案開發', description: '團隊專案實作', color: 'from-purple-500 to-purple-600', icon: '🚀' },
    { name: '社交活動', description: '技術社群交流', color: 'from-yellow-500 to-yellow-600', icon: '🤝' }
  ];

  return (
    <>
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-slate-500 to-gray-500 rounded-lg mr-3 shadow-lg">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="bg-gradient-to-r from-slate-600 via-gray-600 to-slate-600 bg-clip-text text-transparent">
          我們的活動足跡
        </span>
      </h3>
      
      <div className="bg-gradient-to-br from-slate-50/80 to-gray-50/80 rounded-xl p-4 mb-4 border border-white/30 shadow-inner">
        <p className="text-sm text-slate-600">
          GDG on Campus NKNU 自成立以來，已舉辦超過 50 場不同類型的技術活動，
          包括工作坊、講座、黑客松和社交聚會等。這些活動不僅傳播了 Google 技術知識，
          也培養了許多校園技術人才。
        </p>
      </div>
      
      <div className="space-y-3">
        {eventTypes.map((type, index) => (
          <motion.div
            key={type.name}
            className="group flex items-start p-3 bg-gradient-to-r from-slate-50/60 to-gray-50/60 rounded-xl hover:from-slate-50/80 hover:to-gray-50/80 transition-all duration-300 border border-white/30 hover:border-slate-200/50 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-slate-500 to-gray-500 rounded-lg mr-3 shadow-lg text-sm">
              {type.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-slate-800 group-hover:text-slate-600 transition-colors duration-300">
                {type.name}
              </h4>
              <p className="text-slate-600 text-xs mt-1">
                {type.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export function EventGalleryPreview() {
  const galleryItems = [
    { title: '工作坊', image: '/assets/events/workshop1.jpg', description: '實作導向學習' },
    { title: '講座', image: '/assets/events/lecture1.jpg', description: '業界專家分享' },
    { title: '黑客松', image: '/assets/events/hackathon1.jpg', description: '創意專案開發' },
    { title: '社交活動', image: '/assets/events/social1.jpg', description: '社群網絡建設' }
  ];

  return (
    <>
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg mr-3 shadow-lg">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
          活動成果展示
        </span>
      </h3>
      
      <div className="bg-gradient-to-br from-slate-50/80 to-pink-50/80 rounded-xl p-4 mb-4 border border-white/30 shadow-inner">
        <p className="text-sm text-slate-600">
          查看我們過去活動的成果和參加者的反饋。從程式碼到社群建設，
          每一個活動都為校園技術生態帶來了積極的影響。
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.title}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-pink-50 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
              <div className="text-2xl">{item.title === '工作坊' ? '💻' : item.title === '講座' ? '🎤' : item.title === '黑客松' ? '🚀' : '🤝'}</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-2">
                <p className="text-white text-xs font-medium">{item.title}</p>
                <p className="text-white/80 text-xs">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.a
        href="/events/gallery"
        className="group flex items-center justify-center p-3 bg-gradient-to-r from-pink-50/60 to-rose-50/60 rounded-xl hover:from-pink-50/80 hover:to-rose-50/80 transition-all duration-300 border border-white/30 hover:border-pink-200/50 shadow-lg hover:shadow-xl text-pink-600 hover:text-pink-700"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm font-medium mr-2">查看更多活動照片</span>
        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </motion.a>
    </>
  );
}

export function EventResourceDownload() {
  const resources = [
    { 
      name: '簡易視窗應用程式開發講義', 
      file: '/resources/window_slides.pdf', 
      icon: '💻',
      color: 'from-indigo-500 to-indigo-600'
    },
    { 
      name: 'Git 控管與工作流簡報', 
      file: '/resources/git_slides.pdf', 
      icon: '🔗',
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      name: '伺服器與通訊原理講義', 
      file: '/resources/server_slides.pdf', 
      icon: '🌐',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <>
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-3 shadow-lg">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          活動資源下載
        </span>
      </h3>
      
      <div className="bg-gradient-to-br from-slate-50/80 to-indigo-50/80 rounded-xl p-4 mb-4 border border-white/30 shadow-inner">
        <p className="text-sm text-slate-600">
          獲取我們過去活動的投影片、程式碼範例和學習資源，繼續您的技術學習之旅。
        </p>
      </div>
      
      <div className="space-y-3">
        {resources.map((resource, index) => (
          <motion.a
            key={resource.name}
            href={resource.file}
            download
            className="group flex items-center p-3 bg-gradient-to-r from-slate-50/60 to-indigo-50/60 rounded-xl hover:from-indigo-50/80 hover:to-purple-50/80 transition-all duration-300 border border-white/30 hover:border-indigo-200/50 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mr-3 shadow-lg text-sm">
              {resource.icon}
            </div>
            <div className="flex-1">
              <span className="font-semibold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors duration-300">
                {resource.name}
              </span>
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg text-white group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>
    </>
  );
}
