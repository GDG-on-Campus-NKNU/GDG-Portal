export function GoogleCalendar() {
  return (
    <section className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">活動行事曆</h3>
      <div className="aspect-video">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=gdscnknu%40gmail.com&ctz=Asia%2FTaipei"
          className="w-full h-full rounded-lg"
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">點擊活動查看詳細資訊</p>
    </section>
  )
}
