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
    <article className={`group relative bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/80 transition-all duration-500 ${isHistorical ? 'border-l-4 border-slate-400' : ''} h-full flex flex-col`}>
      {/* 裝飾性漸變邊框效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      <div className="relative p-8 flex-1 flex flex-col">
        {isHistorical && (
          <div className="inline-block px-3 py-1 bg-gradient-to-r from-slate-500 to-slate-600 text-white text-sm rounded-full mb-4 w-fit shadow-lg">
            已結束活動
          </div>
        )}

        <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-indigo-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
          {title}
        </h2>

        <div className="text-base text-slate-600 mb-3 flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3 shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-medium">
            {endDate ? formatTimeRange(date, endDate) : formatDate(date)}
          </span>
        </div>

        <div className="text-base text-slate-600 mb-4 flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg mr-3 shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="font-medium">{location}</span>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 font-medium rounded-full text-sm border border-blue-200/50 backdrop-blur-sm hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {excerpt && (
          <p className="text-slate-700 mb-6 line-clamp-3 leading-relaxed flex-1">
            {excerpt}
          </p>
        )}

        <div className="mt-auto">
          {isHistorical ? (
            <button 
              onClick={handleViewDetail} 
              className="group/btn relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                查看詳情
                <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          ) : (
            <button 
              onClick={handleViewDetail} 
              className="group/btn relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-white/20 scale-0 group-hover/btn:scale-100 rounded-full transition-transform duration-500 origin-center"></span>
              <span className="relative flex items-center">
                查看詳情
                <svg className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
