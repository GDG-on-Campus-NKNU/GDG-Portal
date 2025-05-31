export function GoogleCalendar() {
  return (
    <section className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-3 sm:p-4 lg:p-6 shadow-xl hover:shadow-2xl transform hover:scale-[1.01] transition-all duration-300 overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-green-600 bg-clip-text text-transparent mb-4">
          活動行事曆
        </h3>
        
        {/* 手機版和桌面版使用不同的顯示方式 */}
        <div className="block sm:hidden">
          {/* 手機版：顯示簡化的連結 */}
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 text-center border border-blue-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">活動行事曆</h4>
            <p className="text-sm text-slate-600 mb-4">查看我們最新的活動安排與技術分享會</p>
            <a 
              href="https://calendar.google.com/calendar/embed?src=98bcdcaef3fd5bdf1ff55004c040815a8ec3c3370071ec9d2d17ee9d5b227b98%40group.calendar.google.com&ctz=Asia%2FTaipei"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              開啟完整行事曆
            </a>
          </div>
        </div>
        
        {/* 平板和桌面版：顯示 iframe */}
        <div className="hidden sm:block">
          <div className="relative h-80 lg:h-96 xl:h-[30rem] w-full">
            <div className="absolute inset-2 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-2xl blur opacity-50"></div>
            <div className="relative h-full w-full p-2">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=98bcdcaef3fd5bdf1ff55004c040815a8ec3c3370071ec9d2d17ee9d5b227b98%40group.calendar.google.com&ctz=Asia%2FTaipei"
                className="w-full h-full rounded-2xl border border-white/20 shadow-lg"
                style={{ 
                  border: 'none',
                  overflow: 'hidden'
                }}
                title="GDG on Campus NKNU 活動行事曆"
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">點擊活動查看詳細資訊</p>
        </div>
      </div>
    </section>
  )
}
