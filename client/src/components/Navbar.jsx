export function Navbar() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">GDG Campus NKNU</div>
        <nav className="space-x-4 text-sm font-medium">
          <a href="#" className="text-gray-600 hover:text-blue-600">首頁</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">活動</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">公告</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">幹部</a>
          <a href="#" className="text-blue-600">登入</a>
        </nav>
      </div>
    </header>
  )
}
