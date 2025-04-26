export function MainBanner() {
  return (
    <section className="relative h-[400px] mb-8 rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">GDG on Campus NKNU</h1>
        <p className="text-xl md:text-2xl mb-8">Google Developer Group 高師大分部</p>
        <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition">
          加入我們
        </button>
      </div>
    </section>
  )
}
