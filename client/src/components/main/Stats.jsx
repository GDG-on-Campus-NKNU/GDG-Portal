export default function Stats() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="group relative bg-white/70 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
        {/* 背景漸層裝飾 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">200+</div>
          <div className="text-base text-slate-700 mt-1 font-medium">社員數量</div>
        </div>
        {/* 裝飾性元素 */}
        <div className="absolute top-2 right-2 w-8 h-8 border border-blue-300/30 rounded-full opacity-50"></div>
      </div>
      
      <div className="group relative bg-white/70 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">50+</div>
          <div className="text-base text-slate-700 mt-1 font-medium">舉辦活動</div>
        </div>
        <div className="absolute top-2 right-2 w-8 h-8 border border-green-300/30 rounded-full opacity-50"></div>
      </div>
      
      <div className="group relative bg-white/70 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">15+</div>
          <div className="text-base text-slate-700 mt-1 font-medium">合作企業</div>
        </div>
        <div className="absolute top-2 right-2 w-8 h-8 border border-purple-300/30 rounded-full opacity-50"></div>
      </div>
      
      <div className="group relative bg-white/70 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">5000+</div>
          <div className="text-base text-slate-700 mt-1 font-medium">參與人次</div>
        </div>
        <div className="absolute top-2 right-2 w-8 h-8 border border-orange-300/30 rounded-full opacity-50"></div>
      </div>
    </section>
  )
}
