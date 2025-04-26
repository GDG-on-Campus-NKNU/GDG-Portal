import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function EventCard({
  id,
  title,
  date,
  endDate,
  location,
  excerpt,
  tags,
  isHistorical = false,  // 新增參數
  variant = 'compact',   // 新增參數
  // 支援直接傳入完整事件物件的模式
  event
}) {
  // 如果提供了完整的 event 物件，則從中提取屬性
  if (event) {
    id = event.id;
    title = event.title;
    date = event.date;
    endDate = event.endDate;
    location = event.location;
    excerpt = event.excerpt;
    tags = event.tags;
  }

  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/events/${id}`);
  };

  // 格式化單一日期的函數
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 格式化日期時間範圍的函數
  const formatTimeRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 格式化日期
    const formattedDate = start.toLocaleDateString('zh-TW', {
      month: 'numeric',
      day: 'numeric'
    });

    // 格式化時間
    const startTime = start.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const endTime = end.toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${formattedDate} ${startTime} - ${endTime}`;
  };

  return (
    <article className={`bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition ${isHistorical ? 'border-l-4 border-gray-500' : ''}`}>
      <div className="p-6">
        {isHistorical && (
          <div className="inline-block px-2 py-1 bg-gray-600 text-white text-xs rounded-md mb-2">
            已結束活動
          </div>
        )}

        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

        <div className="text-sm text-gray-500 mb-1 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            {endDate ? formatTimeRange(date, endDate) : formatDate(date)}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">{location}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {excerpt && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{excerpt}</p>
        )}

        <div className="mt-4 flex justify-end">
          {isHistorical ? (
            <button onClick={handleViewDetail} className="text-gray-600 text-sm hover:text-gray-800 transition">
              View details →
            </button>
          ) : (
            <button onClick={handleViewDetail} className="text-blue-600 text-sm hover:text-blue-800 transition">
              View details →
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
