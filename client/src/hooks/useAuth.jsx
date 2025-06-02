import { useState, useEffect, useContext, createContext } from 'react';
import { 
  mockUsers, 
  mockRoles, 
  getCurrentUser, 
  setCurrentUser, 
  validateCredentials, 
  hasPermission, 
  hasRole, 
  simulateApiDelay 
} from '../data/mockData';

// 是否使用假資料模式 (開發時設為 false，使用真實API)
const USE_MOCK_DATA = false;

// 創建認證上下文
const AuthContext = createContext();

// 使用認證 Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必須在 AuthProvider 內使用');
  }
  return context;
}

// 權限 Hook
export function usePermission(permission) {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
}

// 角色 Hook
export function useRole(role) {
  const { hasRole } = useAuth();
  return hasRole(role);
}

// 認證 Provider 組件
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 檢查初始認證狀態
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // 檢查認證狀態
  const checkAuthStatus = async () => {
    try {
      if (USE_MOCK_DATA) {
        // 使用假資料模式
        await simulateApiDelay(300);
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } else {
        // 真實 API 模式
        const response = await fetch('/api/auth/status', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.isAuthenticated && data.user) {
            setUser(data.user);
            setIsAuthenticated(true);
          }
        }
      }
    } catch (error) {
      console.error('檢查認證狀態失敗:', error);
    } finally {
      setLoading(false);
    }
  };

  // 登入
  const login = async (email, password) => {
    try {
      if (USE_MOCK_DATA) {
        // 使用假資料模式
        await simulateApiDelay(800);
        
        const validUser = validateCredentials(email, password);
        if (validUser) {
          const userWithLastLogin = {
            ...validUser,
            lastLogin: new Date().toISOString()
          };
          setCurrentUser(userWithLastLogin);
          setUser(userWithLastLogin);
          setIsAuthenticated(true);
          return { success: true, message: '登入成功！' };
        } else {
          return { success: false, message: '電子郵件或密碼錯誤' };
        }
      } else {
        // 真實 API 模式
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          setIsAuthenticated(true);
          return { success: true, message: data.message };
        } else {
          return { success: false, message: data.message || '登入失敗' };
        }
      }
    } catch (error) {
      console.error('登入錯誤:', error);
      return { success: false, message: '網路錯誤，請稍後再試' };
    }
  };

  // 註冊
  const register = async (name, email, password) => {
    try {
      if (USE_MOCK_DATA) {
        // 使用假資料模式
        await simulateApiDelay(1000);
        
        // 檢查電子郵件是否已存在
        const existingUser = Object.values(mockUsers).find(u => u.email === email);
        if (existingUser) {
          return { success: false, message: '此電子郵件已被註冊' };
        }
        
        // 創建新使用者
        const newUser = {
          id: `user_${Date.now()}`,
          name,
          email,
          password, // 實際應用中不應儲存明文密碼
          role: 'member',
          permissions: ['read', 'comment', 'join_events'],
          avatar: null,
          joinDate: new Date().toISOString(),
          isActive: true,
          profile: {
            title: '',
            department: '',
            bio: '',
            skills: [],
            social: {}
          },
          lastLogin: new Date().toISOString()
        };
        
        setCurrentUser(newUser);
        setUser(newUser);
        setIsAuthenticated(true);
        return { success: true, message: '註冊成功！歡迎加入 GDG Portal' };
      } else {
        // 真實 API 模式
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          setIsAuthenticated(true);
          return { success: true, message: data.message };
        } else {
          return { success: false, message: data.message || '註冊失敗' };
        }
      }
    } catch (error) {
      console.error('註冊錯誤:', error);
      return { success: false, message: '網路錯誤，請稍後再試' };
    }
  };

  // 登出
  const logout = async () => {
    try {
      if (USE_MOCK_DATA) {
        // 使用假資料模式
        await simulateApiDelay(300);
        setCurrentUser(null);
      } else {
        // 真實 API 模式
        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });
      }
    } catch (error) {
      console.error('登出錯誤:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // 更新使用者資料
  const updateProfile = async (profileData) => {
    try {
      if (USE_MOCK_DATA) {
        // 使用假資料模式
        await simulateApiDelay(600);
        
        if (!user) {
          return { success: false, message: '使用者未登入' };
        }
        
        const updatedUser = {
          ...user,
          ...profileData,
          profile: {
            ...user.profile,
            ...profileData.profile
          }
        };
        
        setCurrentUser(updatedUser);
        setUser(updatedUser);
        return { success: true, message: '個人資料更新成功' };
      } else {
        // 真實 API 模式
        const response = await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(profileData),
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          return { success: true, message: data.message };
        } else {
          return { success: false, message: data.message || '更新失敗' };
        }
      }
    } catch (error) {
      console.error('更新資料錯誤:', error);
      return { success: false, message: '網路錯誤，請稍後再試' };
    }
  };

  // 變更密碼
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || '變更密碼失敗' };
      }
    } catch (error) {
      console.error('變更密碼錯誤:', error);
      return { success: false, message: '網路錯誤，請稍後再試' };
    }
  };

  // 刷新 Token
  const refreshToken = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Token 刷新成功，檢查使用者狀態
        await checkAuthStatus();
        return true;
      } else {
        // Token 刷新失敗，清除認證狀態
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Token 刷新錯誤:', error);
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  // 檢查權限
  const hasUserRole = (requiredRole) => {
    if (USE_MOCK_DATA) {
      return hasRole(user, requiredRole);
    } else {
      // 原本的角色層級檢查邏輯
      if (!user) return false;
      
      const roleHierarchy = {
        guest: 0,
        member: 1,
        core: 2,
        admin: 3
      };

      const userRoleLevel = roleHierarchy[user.role] || 0;
      const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

      return userRoleLevel >= requiredRoleLevel;
    }
  };

  // 檢查權限
  const hasUserPermission = (permission) => {
    if (USE_MOCK_DATA) {
      return hasPermission(user, permission);
    } else {
      // 原本的權限檢查邏輯
      if (!user || !user.permissions) return false;
      return user.permissions.includes(permission);
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    
    // 管理員擁有所有權限
    if (user.role === 'admin') return true;
    
    // 根據角色定義權限
    const permissions = {
      member: ['view_member_content', 'register_events'],
      guest: ['view_public_content']
    };

    return permissions[user.role]?.includes(permission) || false;
  };

  const value = {
    // 狀態
    user,
    loading,
    isAuthenticated,
    
    // 方法
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    refreshToken,
    checkAuthStatus,
    
    // 權限檢查 (使用新的函數名稱避免衝突)
    hasRole: hasUserRole,
    hasPermission: hasUserPermission,
    
    // 額外的便利方法
    isAdmin: () => hasUserRole('admin'),
    isCoreTeam: () => hasUserRole('core') || hasUserRole('admin'),
    isMember: () => hasUserRole('member') || hasUserRole('core') || hasUserRole('admin'),
    
    // 快速權限檢查
    canManageUsers: () => hasUserPermission('manage_users'),
    canManageEvents: () => hasUserPermission('manage_events'),
    canManageAnnouncements: () => hasUserPermission('manage_announcements'),
    canWrite: () => hasUserPermission('write'),
    canDelete: () => hasUserPermission('delete'),
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
