import { useEventData } from '../../hooks/useEventData';

export default function Sidebar() {
  // 獲取最新的活動
  const { events, loading } = useEventData({
    page: 1,
    limit: 1,
    future: true,
    sort: 'desc'
  });

  // 獲取最新活動的連結，如果沒有活動則使用預設值
  const latestEventLink = events && events.length > 0 ? `/events/${events[0].id}` : '#';
  const isEventAvailable = events && events.length > 0;
  return (
    <aside className="space-y-6">
      <section className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent mb-3">
            社團簡介
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            GDG on Campus NKNU 是一個以技術學習、實作與交流為核心的學生社群。
          </p>
        </div>
      </section>

      <section className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/10 to-transparent rounded-full blur-xl"></div>
        <div className="relative z-10">
          <h3 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-green-600 bg-clip-text text-transparent mb-3">
            快速連結
          </h3>
          <ul className="text-sm space-y-2">
            <li>
              <a
                href="https://gdg.community.dev/gdg-on-campus-national-kaohsiung-normal-university-kaohsiung-city-taiwan/"
                className="group flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all duration-200"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:scale-125 transition-transform duration-200"></span>
                GDG官方網站
              </a>
            </li>            <li>
              <a
                href={latestEventLink}
                className={`group flex items-center font-medium transition-all duration-200 ${
                  isEventAvailable
                    ? 'text-blue-600 hover:text-blue-700 cursor-pointer'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                title={isEventAvailable ? '前往最新活動' : '目前沒有可用的活動'}
              >
                <span className={`w-2 h-2 rounded-full mr-2 group-hover:scale-125 transition-transform duration-200 ${
                  isEventAvailable ? 'bg-blue-500' : 'bg-gray-400'
                }`}></span>
                活動報名
                {loading && (
                  <span className="ml-2 text-xs text-gray-500">載入中...</span>
                )}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center text-blue-600 hover:text-blue-700 font-medium transition-all duration-200"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:scale-125 transition-transform duration-200"></span>
                課程投影片
              </a>
            </li>
          </ul>
        </div>
      </section>
    </aside>
  )
}
