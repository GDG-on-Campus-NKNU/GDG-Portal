import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UserProfilePageDebug() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('🔧 UserProfilePageDebug 開始獲取資料，ID:', id);
        setLoading(true);
        
        const timestamp = new Date().getTime();
        const url = `/api/auth/profile/${id}?_t=${timestamp}`;
        console.log('📡 API URL:', url);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        console.log('📊 Response Status:', response.status);
        console.log('📊 Response Headers:', Object.fromEntries(response.headers.entries()));
        
        if (response.ok) {
          const data = await response.json();
          console.log('📦 完整的 API 回應:', data);
          console.log('👤 用戶基本資料:', data.user);
          console.log('📋 用戶 Profile 資料:', data.user?.profile);
          
          setApiResponse(data);
          setUser(data.user);
          
          // 檢查資料結構
          if (data.user) {
            console.log('✅ 用戶 ID:', data.user.id);
            console.log('✅ 用戶名稱:', data.user.name);
            console.log('✅ 用戶角色:', data.user.role);
            console.log('✅ 頭像 URL:', data.user.avatarUrl);
            console.log('✅ 加入日期:', data.user.joinDate);
            
            if (data.user.profile) {
              console.log('📋 Profile Bio:', data.user.profile.bio);
              console.log('📋 Profile Location:', data.user.profile.location);
              console.log('📋 Profile Company:', data.user.profile.company);
              console.log('📋 Profile Website:', data.user.profile.website);
              console.log('📋 Profile Banner URL:', data.user.profile.bannerUrl);
              console.log('📋 Profile Skills (原始):', data.user.profile.skills);
              console.log('📋 Profile Interests (原始):', data.user.profile.interests);
              
              // 嘗試解析 skills 和 interests
              try {
                const skills = JSON.parse(data.user.profile.skills || '[]');
                const interests = JSON.parse(data.user.profile.interests || '[]');
                console.log('📋 解析後的 Skills:', skills);
                console.log('📋 解析後的 Interests:', interests);
              } catch (e) {
                console.error('❌ 解析 skills/interests 失敗:', e);
              }
            } else {
              console.warn('⚠️ 沒有 profile 資料');
            }
          } else {
            console.error('❌ 沒有 user 資料');
          }
        } else {
          const errorData = await response.json();
          console.error('❌ API 錯誤:', errorData);
          setError(errorData.message || '無法載入使用者資料');
        }
      } catch (error) {
        console.error('💥 網路錯誤:', error);
        setError('網路錯誤，請稍後再試');
      } finally {
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

  // 樣式化的 JSON 顯示
  const JsonDisplay = ({ title, data }) => (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <pre className="text-sm overflow-auto bg-white p-3 rounded border">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );

  if (loading) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#fef3c7', 
        color: '#92400e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        🔄 正在載入用戶資料...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#fca5a5', 
        color: '#991b1b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontSize: '24px',
        fontWeight: 'bold',
        flexDirection: 'column'
      }}>
        <div>❌ 載入失敗</div>
        <div style={{ fontSize: '16px', marginTop: '10px' }}>錯誤：{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#fbbf24', 
        color: '#92400e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        ⚠️ 沒有用戶資料
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#dcfce7', 
      color: '#166534',
      padding: '20px',
      overflowY: 'auto',
      zIndex: 9999
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
          ✅ 用戶資料調試頁面
        </h1>
        
        <div style={{ marginBottom: '20px', fontSize: '18px' }}>
          <strong>用戶 ID:</strong> {id}<br/>
          <strong>載入狀態:</strong> 成功<br/>
          <strong>用戶名稱:</strong> {user.name}<br/>
          <strong>用戶角色:</strong> {user.role}
        </div>

        <JsonDisplay title="完整 API 回應" data={apiResponse} />
        <JsonDisplay title="用戶基本資料" data={user} />
        <JsonDisplay title="用戶 Profile 資料" data={user.profile} />
        
        {user.profile?.skills && (
          <div className="mb-6 p-4 bg-blue-100 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Skills 解析測試</h3>
            <div><strong>原始資料:</strong> {user.profile.skills}</div>
            <div><strong>解析結果:</strong> {JSON.stringify(JSON.parse(user.profile.skills || '[]'))}</div>
          </div>
        )}
        
        {user.profile?.interests && (
          <div className="mb-6 p-4 bg-purple-100 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Interests 解析測試</h3>
            <div><strong>原始資料:</strong> {user.profile.interests}</div>
            <div><strong>解析結果:</strong> {JSON.stringify(JSON.parse(user.profile.interests || '[]'))}</div>
          </div>
        )}
      </div>
    </div>
  );
}
