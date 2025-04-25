import { useState, useEffect } from 'react'

export function useAnnouncementData({
  page = 1,
  limit = 5,
  keyword = '',
  tags = [],
  isPinned // 新增參數用於過濾置頂公告
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
          limit,
          keyword,
          tags: tags.join(',')
        })

        if (isPinned !== undefined) {
          params.append('isPinned', isPinned)
        }

        // 發送請求到 API
        const res = await fetch(`/api/announcements?${params}`)

        // 模擬資料 (待替換為真實 API)
        const dummyData = [
          {
            id: 1,
            title: 'Google I/O 2025 觀賞派對報名中!',
            date: '2025-05-01',
            excerpt: '一起來參加我們的 Google I/O 2025 觀賞派對，了解最新的 Google 技術發展與創新...',
            tags: ['event', 'tech'],
            isPinned: true
          },
          {
            id: 2,
            title: '2025 學期技術講座系列公布',
            date: '2025-04-20',
            excerpt: '本學期將舉辦 Android、Flutter、Firebase 與 AI 等多場技術講座，請密切關注報名時間...',
            tags: ['notice', 'course'],
            isPinned: true
          },
          {
            id: 3,
            title: '徵求技術分享講者',
            date: '2025-04-15',
            excerpt: '邀請有開發經驗的同學報名成為我們的技術講者，分享你的專案經驗與技術心得...',
            tags: ['notice'],
            isPinned: false
          },
          {
            id: 4,
            title: 'GDG 技術挑戰賽 - 2025 APP 創新競賽開始報名',
            date: '2025-04-10',
            excerpt: '挑戰你的創意與技術能力！本年度 APP 創新競賽主題為「永續科技」，獎金高達 10 萬元，報名至 5 月 15 日止...',
            tags: ['event', 'competition'],
            isPinned: true
          },
          {
            id: 5,
            title: 'Google 暑期實習計劃申請資訊',
            date: '2025-03-31',
            excerpt: 'Google 2025 暑期實習計劃即將截止申請，我們將於 4/12 舉辦線上說明會，協助你準備申請材料與面試...',
            tags: ['internship', 'notice'],
            isPinned: false
          },
          {
            id: 6,
            title: 'Flutter 3.0 新功能研討會',
            date: '2025-03-28',
            excerpt: 'Flutter 3.0 帶來了許多令人興奮的新功能，本次研討會將深入探討這些改進對開發流程的影響...',
            tags: ['tech', 'course'],
            isPinned: false
          },
          {
            id: 7,
            title: 'GDG 社群導師招募中',
            date: '2025-03-20',
            excerpt: '你有技術熱忱想分享給更多人嗎？我們正在招募 Android、Flutter、Web 開發領域的社群導師，加入我們的教學團隊...',
            tags: ['community', 'notice'],
            isPinned: false
          },
          {
            id: 8,
            title: '2025 程式設計工作坊系列活動',
            date: '2025-03-15',
            excerpt: '即日起至 6 月底，每週五晚間我們將舉辦不同主題的程式設計工作坊，涵蓋前後端、行動與雲端技術...',
            tags: ['event', 'course', 'tech'],
            isPinned: false
          },
          {
            id: 9,
            title: '開源專案貢獻指南 - 新手如何參與開源社群',
            date: '2025-03-05',
            excerpt: '想參與開源專案但不知從何開始？本指南將帶你了解如何尋找適合的專案、提交你的首個 PR，以及與社群互動...',
            tags: ['tech', 'community'],
            isPinned: false
          },
          {
            id: 10,
            title: '前端框架比較：React vs Vue vs Angular 2025 版',
            date: '2025-02-28',
            excerpt: '三大前端框架的最新比較，包含效能、生態系、學習曲線與企業採用情況，幫助你選擇最適合的技術棧...',
            tags: ['tech', 'course'],
            isPinned: false
          }
        ]

        // 處理搜尋、篩選和置頂過濾
        let filteredData = [...dummyData]

        if (isPinned === true) { // 只顯示置頂公告
          filteredData = filteredData.filter(item => item.isPinned === true)
        } else if (isPinned === false) { // 只顯示非置頂公告
          filteredData = filteredData.filter(item => item.isPinned === false)
        }

        if (keyword) {
          const lowerKeyword = keyword.toLowerCase()
          filteredData = filteredData.filter(item =>
            item.title.toLowerCase().includes(lowerKeyword) ||
            item.excerpt.toLowerCase().includes(lowerKeyword)
          )
        }

        if (tags.length > 0) {
          filteredData = filteredData.filter(item =>
            tags.some(tag => item.tags.includes(tag))
          )
        }

        // 排序邏輯：置頂優先，再按日期排序
        filteredData.sort((a, b) => {
          // 首先比較置頂狀態
          if (a.isPinned !== b.isPinned) {
            // 置頂的排在前面
            return b.isPinned ? 1 : -1;
          }

          // 置頂狀態相同時，再按日期排序（新的在前）
          return new Date(b.date) - new Date(a.date);
        });

        // 限制返回的資料數量
        const limitedData = filteredData.slice((page - 1) * limit, page * limit)

        setAnnouncements(limitedData)
        setTotalPages(Math.ceil(filteredData.length / limit) || 1)
      } catch (e) {
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
