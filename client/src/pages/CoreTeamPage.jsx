import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import MemberCard from '../components/file_management/MemberCard'
import FilterPanel from '../components/general/FilterPanel'
import LoadingSpinner from '../components/general/LoadingSpinner'
import SearchBar from '../components/general/SearchBar'

export default function CoreTeamPage() {
  const [keyword, setKeyword] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Temp資料 - 未來可從 API 獲取
  const members = [
    {
      id: 1,
      name: '吳傢澂',
      title: '社長',
      photo: '',
      department: '軟體工程與管理學系',
      year: '大三',
      categories: ['core'],
      skills: ['Python', 'Web開發', 'Java'],
      description: '負責社團整體運作與對外合作，擅長行動應用開發與專案管理。'
    },
    {
      id: 2,
      name: '顏榕嶙',
      title: '技術教學',
      photo: '',
      department: '軟體工程與管理學系',
      year: '大三',
      categories: ['tech'],
      skills: ['Web Development', 'React', 'Firebase'],
      description: '協助社長處理社團事務，主要負責網頁前端開發與教學活動。'
    },
    {
      id: 3,
      name: '李准恩',
      title: '技術教學',
      photo: '',
      department: '軟體工程與管理學系',
      year: '大三',
      categories: ['tech'],
      skills: ['資訊安全'],
      description: '負責課程規劃與技術研究，專長跨平台開發與雲端服務整合。'
    },
    {
      id: 4,
      name: '高宜嫻',
      title: '公關行銷',
      photo: '',
      department: '軟體工程與管理學系',
      year: '大三',
      categories: ['pr'],
      skills: ['Event Planning', 'Marketing', 'Design'],
      description: '規劃與執行社團各項活動，擅長設計與社群媒體經營。'
    },
    {
      id: 5,
      name: '羅靜慧',
      title: '美術設計',
      photo: '',
      department: '視覺設計學系',
      year: '大二',
      categories: ['design'],
      skills: ['Illustrator', 'Photoshop', 'UI/UX'],
      description: '負責社團視覺識別與活動海報設計，擅長使用者介面設計。'
    },
    {
      id: 6,
      name: '游炯騫',
      title: '總務攝影',
      photo: '',
      department: '軟體工程與管理學系',
      year: '大三',
      categories: ['affairs'],
      skills: ['Photography', 'Event Management'],
      description: '負責社團活動的攝影與紀錄，擅長活動策劃與執行。'
    }
  ]

  // 過濾分類選項
  const categoryOptions = [
    { label: '核心幹部', value: 'core' },
    { label: '技術教學', value: 'tech' },
    { label: '公關行銷', value: 'pr' },
    { label: '文書美宣', value: 'design' },
    { label: '總務攝影', value: 'affairs' },
  ]

  // 依照關鍵字與分類過濾幹部
  const filteredMembers = members.filter(member => {
    const matchKeyword = keyword === '' ||
      member.name.includes(keyword) ||
      member.title.includes(keyword) ||
      member.description.includes(keyword)

    const matchCategory = categories.length === 0 ||
      categories.some(cat => member.categories.includes(cat))

    return matchKeyword && matchCategory
  })

  // 動畫設定
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {/* 頂部橫幅 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
          <h1 className="text-3xl font-bold mb-2 relative z-10">GDG Core Team Member</h1>
          <p className="text-blue-100 max-w-2xl relative z-10">
            了解 GDG on Campus NKNU 背後的團隊組成與成員介紹，一群熱愛科技並致力於推廣 Google 開發技術的夥伴。
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 主要內容區 */}
          <div className="flex-1 space-y-6">
            {/* 搜尋 + 篩選 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <h2 className="text-xl font-semibold">搜尋與篩選</h2>
              <SearchBar onSearch={kw => setKeyword(kw)} placeholder="搜尋幹部..." />
              <FilterPanel
                filters={categoryOptions}
                selected={categories}
                onToggle={cat => {
                  setCategories(prev =>
                    prev.includes(cat)
                      ? prev.filter(c => c !== cat)
                      : [...prev, cat]
                  )
                }}
              />
            </motion.div>

            {/* 顯示幹部 */}
            {loading ? (
              <div className="flex justify-center p-12">
                <LoadingSpinner size={16} />
              </div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredMembers.map(member => (
                  <motion.div
                    key={member.id}
                    variants={item}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <MemberCard
                      name={member.name}
                      title={member.title}
                      photo={member.photo}
                      department={member.department}
                      year={member.year}
                      skills={member.skills}
                      description={member.description}
                    />
                  </motion.div>
                ))}

                {filteredMembers.length === 0 && (
                  <motion.p
                    variants={item}
                    className="col-span-3 text-center py-12 bg-white rounded-lg shadow-md text-gray-500"
                  >
                    沒有符合條件的幹部
                  </motion.p>
                )}
              </motion.div>
            )}
          </div>

          {/* 側邊欄 */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-80 space-y-6"
          >
            {/* 關於幹部團隊 */}
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

            {/* 幹部招募 */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-4">加入幹部團隊</h3>
              <p className="text-indigo-100 text-sm mb-4">
                每學期初我們會開放幹部招募，歡迎對 Google 技術有熱情、想提升自我能力的同學加入我們！
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center w-full bg-white text-indigo-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition"
              >
                了解招募資訊
              </a>
            </div>

            {/* 幹部福利 */}
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
