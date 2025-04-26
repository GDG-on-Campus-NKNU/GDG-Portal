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
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}
