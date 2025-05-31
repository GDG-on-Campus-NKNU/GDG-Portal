export function MainBanner() {
  return (
    <section className="relative h-[450px] mb-8 rounded-3xl overflow-hidden">
      {/* 主漸層背景 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-green-500" />
      
      {/* 動態光暈效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      
      {/* 玻璃效果疊層 */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      {/* 裝飾性幾何元素 */}
      <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-white/20 rotate-45 animate-bounce"></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
      
      {/* 主要內容 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
            GDG on Campus NKNU
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">Google Developer Group 高師大分部</p>
          <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-2xl font-medium shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ring-2 ring-white/20 backdrop-blur-sm">
            加入我們的行列
          </button>
        </div>
      </div>
    </section>
  )
}
