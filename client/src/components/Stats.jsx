export function Stats() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-3xl font-bold text-blue-600">200+</div>
        <div className="text-gray-600 mt-1">社員數量</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-3xl font-bold text-green-600">50+</div>
        <div className="text-gray-600 mt-1">舉辦活動</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-3xl font-bold text-purple-600">15+</div>
        <div className="text-gray-600 mt-1">合作企業</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-3xl font-bold text-orange-600">5000+</div>
        <div className="text-gray-600 mt-1">參與人次</div>
      </div>
    </section>
  )
}
