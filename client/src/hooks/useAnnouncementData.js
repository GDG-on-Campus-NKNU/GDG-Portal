import { useState, useEffect } from 'react'

// 獲取公告列表的 hook
export function useAnnouncementData({
  page = 1,
  limit = 5,
  keyword = '',
  tags = [],
  isPinned
} = {}) {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true)
      setError('')
      try {
        // 建立查詢參數
        const params = new URLSearchParams({
          page,
          limit
        })

        if (keyword) {
          params.append('keyword', keyword)
        }

        if (tags && tags.length > 0) {
          params.append('tags', tags.join(','))
        }

        if (isPinned !== undefined) {
          params.append('isPinned', isPinned.toString())
        }

        // 發送請求到 API
        const response = await fetch(`/api/announcements?${params}`)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        setAnnouncements(data.announcements)
        setTotalPages(data.totalPages || 1)
      } catch (e) {
        console.error('Error fetching announcements:', e)
        setError('載入公告失敗: ' + e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [page, limit, keyword, tags.join(','), isPinned])

  return {
    announcements,
    loading,
    error,
    totalPages
  }
}

// 獲取公告詳情的 hook
export function useAnnouncementDetail(id) {
  const [announcement, setAnnouncement] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    const fetchAnnouncementDetail = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await fetch(`/api/announcements/${id}`)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        setAnnouncement(data)
      } catch (e) {
        console.error('Error fetching announcement details:', e)
        setError('載入公告詳情失敗: ' + e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncementDetail()
  }, [id])

  return { announcement, loading, error }
}
