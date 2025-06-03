import React, { useState } from 'react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  getYear,
  getMonth
} from 'date-fns'
import { zhTW } from 'date-fns/locale'

// 修正: 添加 onMonthChange 參數到組件定義
export default function CalendarView({
  events = [],
  initialDate = new Date(),
  onDayClick,
  onMonthChange
}) {
  const [currentDate, setCurrentDate] = useState(initialDate)
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false)

  // 產生年份選項 (當前年份前後 10 年)
  const currentYear = getYear(new Date())
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)

  // 產生月份選項
  const months = Array.from({ length: 12 }, (_, i) => i)

  // 添加: 當月份改變時通知父組件
  const changeMonth = (newDate) => {
    setCurrentDate(newDate);
    if (onMonthChange) {
      onMonthChange(newDate);
    }
  }

  // 處理導覽按鈕 - 修改為使用 changeMonth
  const prevMonth = () => changeMonth(subMonths(currentDate, 1))
  const nextMonth = () => changeMonth(addMonths(currentDate, 1))

  // 處理年份與月份的變更 - 修改為使用 changeMonth
  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value)
    changeMonth(new Date(newYear, getMonth(currentDate), 1))
  }

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value)
    changeMonth(new Date(getYear(currentDate), newMonth, 1))
  }

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const dateFormat = 'd'
  const rows = []
  let days = []
  let day = startDate

  // 渲染日曆格子
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, dateFormat)
      const cloneDay = day
      const dayEvents = events.filter(e => isSameDay(new Date(e.date), cloneDay))
      const isCurrentMonth = isSameMonth(day, monthStart)

      days.push(
        <div
          key={day}
          onClick={() => onDayClick(cloneDay)}
          className={`
            border border-gray-100 p-1 h-24 overflow-y-auto transition
            ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'}
            ${dayEvents.length > 0 && isCurrentMonth ? 'cursor-pointer hover:bg-blue-50' : ''}
          `}
        >
          <div className="flex justify-between">
            <span className={`
              inline-block w-6 h-6 text-center rounded-full
              ${dayEvents.length > 0 && isCurrentMonth ? 'bg-blue-100 text-blue-800 font-medium' : ''}
            `}>{formattedDate}</span>
            {dayEvents.length > 0 && isCurrentMonth && (
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </div>

          {isCurrentMonth && dayEvents.length > 0 && (
            <div className="mt-1">
              {dayEvents.map((event, idx) => (
                <a
                  key={idx}
                  href={`/events/${event.id}`}
                  onClick={(e) => {
                    e.stopPropagation(); // 阻止事件冒泡，避免觸發日期點擊
                  }}
                  className="text-xs p-1 mb-1 truncate rounded bg-blue-50 text-blue-700 border-l-2 border-blue-400"
                  title={event.title}
                >
                  {format(new Date(event.date), 'HH:mm')} {event.title}
                  </a>
              ))}
            </div>
          )}
        </div>
      )
      day = addDays(day, 1)
    }
    rows.push(
      <div className="grid grid-cols-7" key={day}>
        {days}
      </div>
    )
    days = []
  }

  const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六']

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-bold mr-2">
            {format(currentDate, 'yyyy年 MM月', { locale: zhTW })}
          </h2>
          <button
            onClick={() => setShowYearMonthPicker(!showYearMonthPicker)}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
          >
            選擇年月
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-1 rounded hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-1 rounded hover:bg-gray-100"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {showYearMonthPicker && (
        <div className="flex space-x-4 mb-4 bg-gray-50 p-3 rounded">
          <div>
            <label className="block text-sm text-gray-600 mb-1">年份</label>
            <select
              value={getYear(currentDate)}
              onChange={handleYearChange}
              className="border border-gray-200 rounded px-2 py-1"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}年</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">月份</label>
            <select
              value={getMonth(currentDate)}
              onChange={handleMonthChange}
              className="border border-gray-200 rounded px-2 py-1"
            >
              {months.map(month => (
                <option key={month} value={month}>
                  {month + 1}月
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-7 text-sm font-medium text-gray-700 mb-2 bg-gray-50 py-2">
        {daysOfWeek.map(d => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>
      <div className="border border-gray-200 rounded overflow-hidden">
        {rows}
      </div>
    </div>
  )
}
