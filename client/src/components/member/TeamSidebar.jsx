import { motion } from 'framer-motion';

export default function TeamSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
      className="w-full lg:w-80 space-y-6"
    >
      {/* About Our Team */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          關於我們的團隊
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
      </div>

      {/* Join Team CTA */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-4">加入幹部團隊</h3>
          <p className="text-blue-100 text-sm mb-4">
            每學期初我們會開放幹部招募，歡迎對 Google 技術有熱情、想提升自我能力的同學加入我們！
          </p>
          <a
            href="/join-team"
            className="inline-flex items-center justify-center w-full bg-white text-blue-600 font-medium py-3 px-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105"
          >
            了解招募資訊
          </a>
        </div>
      </div>

      {/* Team Benefits */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">幹部福利</h3>
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
      </div>
    </motion.aside>
  );
}
