import { useState, useEffect } from 'react'

export function useEventData({
  page = 1,
  limit = 5,
  keyword = '',
  tags = [],
  future = false,
  sort = 'desc' // 預設從新到舊排序
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
          sort, // 添加排序參數
        });

        if (keyword) {
          params.append('keyword', keyword);
        }

        if (tags && tags.length > 0) {
          params.append('tags', tags.join(','));
        }

        if (future) {
          params.append('future', 'true');
        }

        // 發送請求到 API 並等待回應
        const response = await fetch(`/api/events?${params}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setEvents(data.events);
        setTotalPages(data.totalPages);
      } catch (e) {
        console.error('Error fetching events:', e);
        setError('載入活動失敗: ' + e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [page, limit, keyword, tags.join(','), future, sort]) // 添加 sort 到依賴項

  return {
    events,
    loading,
    error,
    totalPages
  }
}

export function useEventDetail(id) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchEventDetail = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/events/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEvent(data);
      } catch (e) {
        console.error('Error fetching event details:', e);
        setError('載入活動詳情失敗: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [id]);

  return { event, loading, error };
}
