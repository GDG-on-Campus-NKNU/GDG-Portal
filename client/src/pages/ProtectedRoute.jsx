import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/general/LoadingSpinner';

// 基礎保護路由組件
export function ProtectedRoute({ children, requireAuth = true }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (requireAuth && !isAuthenticated) {
    // 保存當前路徑，登入後可以重定向回來
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // 已登入使用者不需要訪問登入/註冊頁面
    return <Navigate to="/" replace />;
  }

  return children;
}

// 角色保護路由組件
export function RoleProtectedRoute({ children, requiredRole, fallback = null }) {
  const { user, loading, hasRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasRole(requiredRole)) {
    // 如果有提供 fallback 組件，顯示它；否則顯示權限不足頁面
    if (fallback) {
      return fallback;
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">權限不足</h1>
          <p className="text-gray-600 mb-8">
            您沒有足夠的權限訪問此頁面
          </p>
          <p className="text-sm text-gray-500">
            需要角色: {requiredRole} | 您的角色: {user.role}
          </p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            返回上一頁
          </button>
        </div>
      </div>
    );
  }

  return children;
}

// 管理員保護路由
export function AdminRoute({ children, fallback = null }) {
  return (
    <RoleProtectedRoute requiredRole="admin" fallback={fallback}>
      {children}
    </RoleProtectedRoute>
  );
}

// 核心團隊保護路由 (core 或 admin)
export function CoreTeamRoute({ children, fallback = null }) {
  return (
    <RoleProtectedRoute requiredRole="core" fallback={fallback}>
      {children}
    </RoleProtectedRoute>
  );
}

// 成員保護路由 (member 或 core 或 admin)
export function MemberRoute({ children, fallback = null }) {
  return (
    <RoleProtectedRoute requiredRole="member" fallback={fallback}>
      {children}
    </RoleProtectedRoute>
  );
}

// 權限保護路由組件
export function PermissionProtectedRoute({ children, requiredPermission, fallback = null }) {
  const { user, loading, hasPermission } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasPermission(requiredPermission)) {
    if (fallback) {
      return fallback;
    }
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">權限不足</h1>
          <p className="text-gray-600 mb-8">
            您沒有足夠的權限執行此操作
          </p>
          <p className="text-sm text-gray-500">
            需要權限: {requiredPermission}
          </p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            返回上一頁
          </button>
        </div>
      </div>
    );
  }

  return children;
}

// 向後相容的預設導出
export default ProtectedRoute;
