import React from 'react'

export default function MemberCard({
  name,
  title,
  photo,
  department,
  year,
  skills = [],
  description
}) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      <div className="p-5">
        <div className="flex items-center mb-4">
          <img
            src={photo}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="ml-4">
            <h3 className="font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-indigo-600 font-medium">{title}</p>
            <p className="text-xs text-gray-500">{department} | {year}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">{description}</p>

        {skills && skills.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-1">專長</p>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <a
            href={`#member-${name}`}
            className="text-sm text-blue-600 hover:text-blue-800 transition"
          >
            查看詳情 →
          </a>
        </div>
      </div>
    </div>
  )
}
