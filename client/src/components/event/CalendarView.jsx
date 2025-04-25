import React from 'react'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, isSameMonth, isSameDay } from 'date-fns'

export default function CalendarView({ events = [], currentDate = new Date(), onDayClick }) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const dateFormat = 'd'
  const rows = []
  let days = []
  let day = startDate

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, dateFormat)
      const cloneDay = day
      const dayEvents = events.filter(e => isSameDay(new Date(e.date), cloneDay))
      days.push(
        <div
          key={day}
          onClick={() => onDayClick(cloneDay)}
          className={`
            p-2 text-center cursor-pointer
            ${!isSameMonth(day, monthStart) ? 'text-gray-400' : 'text-gray-800'}
          `}
        >
          <span className="block">{formattedDate}</span>
          {dayEvents.length > 0 && (
            <span className="mt-1 inline-block w-2 h-2 bg-blue-600 rounded-full mx-auto"></span>
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
    <div className="bg-white shadow rounded-lg p-4">
      <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
        {daysOfWeek.map(d => <div key={d} className="text-center">{d}</div>)}
      </div>
      {rows}
    </div>
  )
}
