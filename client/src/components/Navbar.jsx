export function Navbar() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/assets/Long-Logo.png" alt="GDG Logo" className="h-10 w-30" />
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="/" className="text-gray-600 hover:text-blue-600">首頁</a>

          {/* 活動選單 */}
          <div className="relative group">
            <a href="/events" className="text-gray-600 hover:text-blue-600">活動</a>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">即將舉行</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">歷史活動</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">活動報名</a>
            </div>
          </div>

          <a href="/announcements" className="text-gray-600 hover:text-blue-600">公告</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">幹部</a>
          {/*<a href="#" className="text-blue-600 hover:text-blue-700">登入</a>*/}
          <a href="http://localhost:5000/api/auth/google" className="text-blue-600 hover:text-blue-700">登入</a>
        </nav>

        {/* 手機版選單按鈕 */}
        <button className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
