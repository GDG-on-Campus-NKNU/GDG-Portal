import { useState, useEffect } from 'react'

export function useEventData({
  page = 1,
  limit = 5,
  keyword = '',
  tags = [],
  future = false, // 簡化參數：只顯示未來的活動
} = {}) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError('')
      try {
        // 建立查詢參數
        const params = new URLSearchParams({
          page,
          limit,
          keyword,
          tags: tags.join(',')
        })

        if (future !== undefined) {
          params.append('future', future)
        }

        // 發送請求到 API
        const res = await fetch(`/api/events?${params}`)

        // 模擬資料 (待替換為真實 API)
        const dummyEvents = [
          {
            id: 1,
            title: '全棧網頁應用實戰 5 - Full-Stack Web Development in Action',
            date: '2025-05-06T18:30:00',
            location: 'E202 教室',
            tags: ['offline', 'workshop'],
            excerpt: '系列課程第五講，學習如何開發完整的全端網頁應用。'
          },
          {
            id: 2,
            title: 'Google I/O 2025 觀賞派對',
            date: '2025-05-25T18:00:00',
            location: '學生活動中心',
            tags: ['offline', 'talk'],
            excerpt: '一起觀看 Google I/O 2025 開發者大會，了解 Google 最新技術和產品。'

          },
          {
            id: 3,
            title: 'Firebase 後端實作課程',
            date: '2025-05-20T18:30:00',
            location: 'E202 教室',
            tags: ['offline', 'workshop'],
            excerpt: '學習如何使用 Firebase 建立後端服務，快速開發應用程式。'
          },
          {
            id: 4,
            title: 'Flutter 跨平台分享會',
            date: '2025-05-15T18:30:00',
            location: '線上 Zoom',
            tags: ['online', 'talk'],
            excerpt: '了解如何使用 Flutter 開發跨平台應用程式，一次寫程式，到處執行。'
          },
          {
            id: 5,
            title: 'Android 開發入門工作坊',
            date: '2025-05-10T18:30:00',
            location: 'E101 教室',
            tags: ['offline', 'workshop'],
            excerpt: '從零開始學習 Android 應用程式開發，適合初學者參加。'
          },
          {
            id: 6,
            title: '深入淺出 Chrome 開發者工具 (DevTools)',
            date: '2025-04-29T18:30:00',
            location: 'E101 教室',
            tags: ['offline', 'workshop'],
            excerpt: '學習如何使用 Chrome DevTools 進行網頁除錯與效能優化。'
          },
          {
            id: 7,
            title: 'React 進階開發技巧與狀態管理',
            date: '2025-04-20T18:30:00',
            location: 'E203 教室',
            tags: ['offline', 'workshop'],
            excerpt: '探討 React 進階開發技巧，包括 Context API、自定義 Hooks 和多種狀態管理解決方案。'
          },
          {
            id: 8,
            title: 'Express.js 與 Node.js 實戰工作坊',
            date: '2025-04-20T18:30:00',
            location: 'E203 教室',
            tags: ['offline', 'workshop'],
            excerpt: '學習如何使用 Express.js 和 Node.js 開發 RESTful API，並與前端應用程式整合。'
          },
          {
            id: 9,
            title: 'AI 開發實戰工作坊 - TensorFlow.js 入門',
            date: '2025-04-04T18:30:00',
            location: '線上 Zoom',
            tags: ['online', 'workshop'],
            excerpt: '使用 TensorFlow.js 在瀏覽器中實現機器學習模型，無需後端即可打造智慧型應用。'
          },
          {
            id: 10,
            title: '網路安全與資料隱私專題講座',
            date: '2025-03-22T19:00:00',
            location: '學生活動中心',
            tags: ['offline', 'talk'],
            excerpt: '探討最新網路安全威脅與資料隱私保護策略，以及如何在應用開發中實踐安全原則。'
          },
          {
            id: 11,
            title: 'DevOps 與 CI/CD 自動化實務',
            date: '2025-03-17T18:30:00',
            location: 'E101 教室',
            tags: ['offline', 'workshop'],
            excerpt: '學習如何建置自動化部署流程，使用 GitHub Actions、Docker 和 Kubernetes 實現 CI/CD。'
          },
          {
            id: 12,
            title: '網頁效能最佳化技巧分享',
            date: '2025-03-05T19:00:00',
            location: '線上 Zoom',
            tags: ['online', 'talk'],
            excerpt: '分析並改善網頁載入速度的實用技巧，包括資源最佳化、延遲載入和快取策略。'
          },
          {
            id: 13,
            title: 'PWA 實戰工作坊 - 打造離線可用的網頁應用',
            date: '2025-02-22T18:30:00',
            location: 'E202 教室',
            tags: ['offline', 'workshop'],
            excerpt: '學習如何將既有網頁轉換為漸進式網頁應用 (PWA)，實現離線使用、推送通知和安裝到主螢幕功能。'
          }
        ]

        // 處理搜尋、篩選和日期過濾
        let filteredData = [...dummyEvents]

        // 只顯示現在時間之後的活動（即將到來的活動）
        if (future === true) {
          const now = new Date()
          filteredData = filteredData.filter(item => new Date(item.date) > now)
        }

        // 關鍵字搜尋
        if (keyword) {
          const lowerKeyword = keyword.toLowerCase()
          filteredData = filteredData.filter(item =>
            item.title.toLowerCase().includes(lowerKeyword) ||
            item.excerpt.toLowerCase().includes(lowerKeyword) ||
            item.location.toLowerCase().includes(lowerKeyword)
          )
        }

        // 標籤篩選
        if (tags.length > 0) {
          filteredData = filteredData.filter(item =>
            tags.some(tag => item.tags.includes(tag))
          )
        }

        // 依照日期排序（從近到遠）
        filteredData.sort((a, b) => new Date(b.date) - new Date(a.date))

        // 限制返回的資料數量
        const limitedData = filteredData.slice((page - 1) * limit, page * limit)

        setEvents(limitedData)
        setTotalPages(Math.ceil(filteredData.length / limit) || 1)
      } catch (e) {
        setError('載入活動失敗: ' + e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [page, limit, keyword, tags.join(','), future])

  return {
    events,
    loading,
    error,
    totalPages
  }
}
