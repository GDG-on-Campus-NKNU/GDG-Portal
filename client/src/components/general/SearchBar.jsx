import React, { useState, useEffect, useRef } from 'react'

export default function SearchBar({ onSearch, placeholder = "搜尋...", debounceDelay = 300 }) {
  const [value, setValue] = useState('')
  const debounceTimer = useRef(null)

  // 處理使用者輸入變化
  const handleInputChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)

    // 清除前一個計時器
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // 設定新的計時器，延遲觸發搜尋
    debounceTimer.current = setTimeout(() => {
      onSearch(newValue.trim())
    }, debounceDelay)
  }

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(value.trim())
  }

  // 清理計時器
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl focus:bg-white/80 focus:border-blue-300/50 focus:ring-2 focus:ring-blue-200/30 focus:outline-none transition-all duration-300 text-slate-800 placeholder-slate-500 shadow-lg hover:shadow-xl"
      />
      <button
        type="submit"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 group-hover:text-blue-500 transition-colors duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      {/* 裝飾性邊框效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
    </form>
  )
}
