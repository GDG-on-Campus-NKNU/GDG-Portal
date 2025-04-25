import React from 'react'

export default function ResourceCard({ title, description, downloadUrl }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        下載資料
      </a>
    </div>
  )
}
