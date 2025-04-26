export const formatEventTimeRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const formattedDate = start.toLocaleDateString('zh-TW', {
    month: 'numeric',
    day: 'numeric'
  })

  const startTime = start.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit'
  })

  const endTime = end.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return `${formattedDate} ${startTime} - ${endTime}`
}
