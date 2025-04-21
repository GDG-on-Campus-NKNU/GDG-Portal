export function Sidebar() {
  return (
    <aside className="space-y-6">
      <section className="bg-white shadow rounded-lg p-4">
        <h3 className="text-sm font-bold text-gray-700 mb-2">社團簡介</h3>
        <p className="text-sm text-gray-600">
          GDG on Campus NKNU 是一個以技術學習、實作與交流為核心的學生社群。
        </p>
      </section>

      <section className="bg-white shadow rounded-lg p-4">
        <h3 className="text-sm font-bold text-gray-700 mb-2">快速連結</h3>
        <ul className="text-sm text-blue-600 space-y-1">
          <li><a href="#">官方網站</a></li>
          <li><a href="#">活動報名</a></li>
          <li><a href="#">課程投影片</a></li>
        </ul>
      </section>
    </aside>
  )
}
