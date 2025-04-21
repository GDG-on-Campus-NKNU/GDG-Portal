export function UpcomingEvents() {
  return (
    <section className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">即將到來的活動</h2>
      <div className="space-y-4">
        <div className="flex items-center border-l-4 border-blue-500 pl-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">深入淺出 Chrome 開發者工具 (DevTools)</h3>
            <p className="text-sm text-gray-600">2025年4月29日（週二）18:30 - 20:00</p>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition">
            報名參加
          </button>
        </div>
        <div className="flex items-center border-l-4 border-green-500 pl-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">系列: 全棧網頁應用實戰 5 - Full-Stack Web Development in Action</h3>
            <p className="text-sm text-gray-600">2025年5月06日（週二）18:30 - 20:30</p>
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition">
            報名參加
          </button>
        </div>
      </div>
    </section>
  )
}
