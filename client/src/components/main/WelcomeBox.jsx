export default function WelcomeBox() {
  return (
    <section className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-10 mb-8 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500 overflow-hidden">
      {/* 背景裝飾漸層 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tight">
            歡迎來到 GDG on Campus NKNU！
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            我們是一個致力於推廣 Google 開發技術的學生社群。無論你是程式新手或進階開發者，我們都歡迎你的加入！
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200/50 rounded-2xl text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200">
              前端技術教學
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200/50 rounded-2xl text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200">
              Web 開發
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border border-purple-200/50 rounded-2xl text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200">
              AI/ML
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-100 text-orange-700 border border-orange-200/50 rounded-2xl text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200">
              開發者工具使用
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <img
              src="/api/placeholder/400/300"
              alt="GDG Community"
              className="relative rounded-2xl shadow-xl border border-white/20 transform group-hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
