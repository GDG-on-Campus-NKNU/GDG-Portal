import { useState, useEffect } from 'react';

// 獲取相簿列表的 hook
export function useGalleryData({
  page = 1,
  limit = 12,
  keyword = '',
  eventType = '',
  year = '',
  tags = []
} = {}) {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const fetchGalleries = async () => {
      setLoading(true);
      setError('');
      try {
        // 建立查詢參數
        const params = new URLSearchParams({
          page,
          limit
        });

        if (keyword) {
          params.append('keyword', keyword);
        }

        if (eventType) {
          params.append('eventType', eventType);
        }

        if (year) {
          params.append('year', year);
        }

        if (tags && tags.length > 0) {
          params.append('tags', tags.join(','));
        }

        // 發送請求到 API
        const response = await fetch(`/api/gallery?${params}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGalleries(data.galleries);
        setTotalPages(data.totalPages || 1);
        setTotalImages(data.totalImages || 0);
      } catch (e) {
        console.error('Error fetching galleries:', e);
        setError('載入相簿失敗: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, [page, limit, keyword, eventType, year, tags.join(',')]);

  return {
    galleries,
    loading,
    error,
    totalPages,
    totalImages
  };
}

// 獲取單一相簿詳情的 hook
export function useGalleryDetail(id) {
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // 檢查 id 是否有效
    if (!id) {
      setError('未提供有效的相簿 ID');
      return;
    }

    const fetchGalleryDetail = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`/api/gallery/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGallery(data);
      } catch (e) {
        console.error('Error fetching gallery details:', e);
        setError('載入相簿詳情失敗: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryDetail();
  }, [id]);

  return {
    gallery,
    loading,
    error
  };
}

// 獲取精選相簿的 hook
export function useFeaturedGalleries(limit = 6) {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedGalleries = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/gallery/featured?limit=${limit}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGalleries(data.galleries);
      } catch (e) {
        console.error('Error fetching featured galleries:', e);
        setError('載入精選相簿失敗: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedGalleries();
  }, [limit]);

  return {
    galleries,
    loading,
    error
  };
}

// 獲取相簿統計資料的 hook
export function useGalleryStats() {
  const [stats, setStats] = useState({
    totalGalleries: 0,
    totalImages: 0,
    eventTypes: [],
    years: [],
    recentGalleries: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGalleryStats = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('/api/gallery/stats');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (e) {
        console.error('Error fetching gallery stats:', e);
        setError('載入相簿統計失敗: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryStats();
  }, []);

  return {
    stats,
    loading,
    error
  };
}

// 增加相簿瀏覽次數的 hook
export function useIncrementGalleryView() {
  const incrementView = async (galleryId) => {
    try {
      await fetch(`/api/gallery/${galleryId}/view`, {
        method: 'PATCH'
      });
    } catch (e) {
      console.error('Error incrementing gallery view:', e);
    }
  };

  return { incrementView };
}
