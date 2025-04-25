import React from 'react'

export default function AttendeeList({ attendees = [] }) {
  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium">姓名</th>
          <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
          <th className="px-4 py-2 text-left text-sm font-medium">狀態</th>
        </tr>
      </thead>
      <tbody>
        {attendees.map((u) => (
          <tr key={u.id} className="border-t">
            <td className="px-4 py-2 text-sm">{u.name}</td>
            <td className="px-4 py-2 text-sm">{u.email}</td>
            <td className="px-4 py-2 text-sm">
              {u.isCheckedIn ? (
                <span className="text-green-600">已報到</span>
              ) : (
                <span className="text-gray-600">未報到</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
