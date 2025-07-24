import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UserProfilePageSimple() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log('🔧 UserProfilePageSimple 組件渲染中...');
  console.log('🔧 Props ID:', id);

  useEffect(() => {
    console.log('🔍 UserProfilePageSimple mounted, ID:', id);
    
    const fetchUserProfile = async () => {
      try {
        console.log('📡 正在獲取用戶資料，ID:', id);
        setLoading(true);
        const timestamp = new Date().getTime();
        const url = `/api/auth/profile/${id}?_t=${timestamp}`;
        console.log('📡 API URL:', url);
        
        const response = await fetch(url);
        console.log('📊 API Response Status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ 成功獲取用戶資料:', data);
          setUser(data.user);
        } else {
          const errorData = await response.json();
          console.error('❌ API 錯誤回應:', errorData);
          setError(errorData.message || '無法載入使用者資料');
        }
      } catch (error) {
        console.error('💥 獲取使用者資料失敗:', error);
        setError('網路錯誤，請稍後再試');
      } finally {
        console.log('🏁 設置 loading = false');
        setLoading(false);
      }
    };

    if (id) {
      fetchUserProfile();
    } else {
      setError('未提供用戶 ID');
      setLoading(false);
    }
  }, [id]);

  console.log('🎯 當前渲染狀態:', { loading, error, user: !!user, userDetails: user?.name });

  if (loading) {
    console.log('📄 渲染 Loading 狀態');
    return (
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <h2 style={{ color: 'blue' }}>載入中...</h2>
        <p>正在獲取用戶 ID: {id} 的資料</p>
      </div>
    );
  }

  if (error) {
    console.log('📄 渲染 Error 狀態:', error);
    return (
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#ffebee', minHeight: '100vh' }}>
        <h2 style={{ color: 'red' }}>錯誤</h2>
        <p>{error}</p>
        <p>用戶 ID: {id}</p>
      </div>
    );
  }

  if (!user) {
    console.log('📄 渲染 No User 狀態');
    return (
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff3e0', minHeight: '100vh' }}>
        <h2 style={{ color: 'orange' }}>找不到用戶</h2>
        <p>用戶 ID: {id}</p>
      </div>
    );
  }

  console.log('📄 渲染 User 資料:', user);
  return (
    <div style={{ padding: '20px', backgroundColor: '#e8f5e8', minHeight: '100vh' }}>
      <h1 style={{ color: 'green' }}>✅ 簡單用戶資料頁面</h1>
      <div style={{ border: '2px solid green', padding: '10px', margin: '10px 0' }}>
        <h2>用戶名稱: {user.name}</h2>
        <p>電子郵件: {user.email}</p>
        <p>角色: {user.role}</p>
        <p>建立時間: {user.createdAt}</p>
      </div>
      {user.profile && (
        <div style={{ border: '2px solid blue', padding: '10px', margin: '10px 0' }}>
          <h3>個人資料</h3>
          <p>電話: {user.profile.phone || '未提供'}</p>
          <p>學校: {user.profile.school || '未提供'}</p>
          <p>科系: {user.profile.department || '未提供'}</p>
        </div>
      )}
      <div style={{ border: '2px solid purple', padding: '10px', margin: '10px 0' }}>
        <p>原始用戶資料:</p>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}
