export default function UserProfilePageTest() {
  console.log('🔥 TEST COMPONENT RENDERED!');
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'red',
      color: 'white',
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>✅ TEST COMPONENT WORKS!</h1>
        <p>如果您看到這個紅色畫面，表示 React 路由和渲染正常工作</p>
        <p>時間: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
