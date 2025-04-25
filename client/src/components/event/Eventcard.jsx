import React from 'react'

export default function EventCard({
  title,
  date,
  location,
  onRegister,
  isRegistered = false
}) {
  return (
    <article className="bg-white shadow-lg rounded-lg p-6 border border-gray-100 hover:shadow-xl transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-1">{new Date(date).toLocaleString()}</p>
      <p className="text-sm text-gray-600 mb-4">{location}</p>
      <button
        onClick={onRegister}
        disabled={isRegistered}
        className={`
          w-full py-2 rounded
          ${isRegistered
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'}
          transition
        `}
      >
        {isRegistered ? '已報名' : '報名參加'}
      </button>
    </article>
  )
}
