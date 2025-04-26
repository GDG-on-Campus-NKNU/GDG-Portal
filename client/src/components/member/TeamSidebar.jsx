import { motion } from 'framer-motion';

export default function TeamSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full lg:w-80 space-y-6"
    >
      {/* About Our Team */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          關於我們的團隊
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          GDG on Campus NKNU 的幹部團隊由來自各系所、擁有不同專長的學生組成，
          共同致力於推廣 Google 技術與提升校園的技術氛圍。幹部分為核心幹部、
          技術組、活動組、設計組、公關組和行政組等不同職務。
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-sm mb-2">幹部制度</h4>
          <ul className="text-sm text-gray-600 space-y-1">
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
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-bold mb-4">加入幹部團隊</h3>
        <p className="text-indigo-100 text-sm mb-4">
          每學期初我們會開放幹部招募，歡迎對 Google 技術有熱情、想提升自我能力的同學加入我們！
        </p>
        <a
          href="/join-team"
          className="inline-flex items-center justify-center w-full bg-white text-indigo-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition"
        >
          了解招募資訊
        </a>
      </div>

      {/* Team Benefits */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">幹部福利</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>優先參加 Google 技術活動與工作坊</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>與業界接觸的機會與人脈建立</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>獲得實務領導與專案管理經驗</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>提升個人履歷與就業競爭力</span>
          </li>
        </ul>
      </div>
    </motion.aside>
  );
}
