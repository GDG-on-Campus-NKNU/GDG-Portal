import React from 'react'

export default function TagSelector({ options = [], selected = [], onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt.value)
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`
              px-3 py-1 rounded-full border
              ${active
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
              transition
            `}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
