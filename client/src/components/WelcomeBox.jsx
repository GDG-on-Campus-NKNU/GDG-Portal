export function WelcomeBox() {
  return (
    <section className="bg-white shadow-lg rounded-xl p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">歡迎來到 GDG on Campus NKNU！</h2>
          <p className="text-gray-600 mb-4">
            我們是一個致力於推廣 Google 開發技術的學生社群。無論你是程式新手或進階開發者，我們都歡迎你的加入！
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Android 開發</span>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Web 開發</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">AI/ML</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">雲端技術</span>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <img
            src="/api/placeholder/400/300"
            alt="GDG Community"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  )
}
