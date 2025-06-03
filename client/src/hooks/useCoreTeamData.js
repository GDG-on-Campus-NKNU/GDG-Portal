import { useState, useEffect } from 'react';

// 獲取幹部資料的 hook
export function useCoreTeamData({
  page = 1,
  limit = 20,
  keyword = '',
  categories = []
} = {}) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [categoryOptions, setCategoryOptions] = useState([]);

  // 載入分類選項
  useEffect(() => {
    const fetchCategoryOptions = async () => {
      try {
        const response = await fetch('/api/coreteam/options/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategoryOptions(data.categories);
      } catch (e) {
        console.error('Error fetching category options:', e);
      }
    };

    fetchCategoryOptions();
  }, []);

  // 載入幹部資料
  useEffect(() => {
    const fetchMembers = async () => {
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

        if (categories && categories.length > 0) {
          params.append('categories', categories.join(','));
        }

        // 發送請求到 API
        const response = await fetch(`/api/coreteam?${params}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMembers(data.members);
        setTotalPages(data.totalPages || 1);
      } catch (e) {
        console.error('Error fetching members:', e);
        setError('載入幹部資料失敗: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [page, limit, keyword, categories.join(',')]);

  return {
    members,
    loading,
    error,
    totalPages,
    categoryOptions
  };
}

// 獲取單一幹部資料的 hook
export function useMemberDetail(id) {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchMemberDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/coreteam/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 獲取API返回的資料
        let data = await response.json();

        // 確保必要的欄位都有預設值
        data = {
          // 預設值
          photo: '/assets/members/default.jpg',
          fullBio: '暫無詳細介紹',
          achievements: [],
          additionalPhotos: [],
          skills: [],
          socialLinks: {},
          contactEmail: '',
          // 合併API返回的資料
          ...data
        };

        setMember(data);
      } catch (e) {
        console.error('Error fetching member details:', e);
        setError('載入幹部資料失敗: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberDetail();
  }, [id]);

  return { member, loading, error };
}

// 格式化顯示分類標籤名稱的工具函數
export function getCategoryLabel(categoryValue) {
  const categoryMap = {
    'core': '核心幹部',
    'tech': '技術教學',
    'pr': '公關行銷',
    'design': '美術設計',
    'affairs': '總務攝影'
  };

  return categoryMap[categoryValue] || categoryValue;
}
