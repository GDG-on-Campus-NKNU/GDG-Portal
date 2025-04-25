import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function EventCard({
  id,
  title,
  date,
  location,
  excerpt,
  tags
}) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/events/${id}`);
  };

  return (
    <article className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-1">{new Date(date).toLocaleString()}</p>
        <p className="text-sm text-gray-600 mb-3">{location}</p>

        {/* 活動標籤 */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 活動簡介 */}
        {excerpt && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{excerpt}</p>
        )}

        <div className="mt-4 flex justify-end">
          <button onClick={handleViewDetail} className="text-blue-600 text-sm hover:text-blue-800 transition">
            View details →
          </button>
        </div>
      </div>
    </article>
  )
}
