export function GoogleCalendar() {
  return (
    <section className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-6 shadow-xl hover:shadow-2xl transform hover:scale-[1.01] transition-all duration-300 overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-green-600 bg-clip-text text-transparent mb-4">
          活動行事曆
        </h3>
        <div className="relative h-80 lg:h-96 xl:h-[30rem] min-w-0 p-3">
          <div className="absolute inset-3 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-2xl blur opacity-50"></div>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=98bcdcaef3fd5bdf1ff55004c040815a8ec3c3370071ec9d2d17ee9d5b227b98%40group.calendar.google.com&ctz=Asia%2FTaipei"
            className="w-full h-full rounded-2xl border border-white/20 shadow-lg relative z-10"
            style={{ 
              minWidth: '320px'
            }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">點擊活動查看詳細資訊</p>
      </div>
    </section>
  )
}
