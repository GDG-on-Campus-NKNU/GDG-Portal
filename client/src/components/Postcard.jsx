export function PostCard({ title, date, excerpt }) {
  return (
    <article className="bg-white shadow rounded-lg p-5 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <p className="text-sm text-gray-700">{excerpt}</p>
    </article>
  )
}
