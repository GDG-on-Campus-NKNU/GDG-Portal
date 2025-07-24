import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import AnnouncementsPage from './pages/AnnouncementsPage'
import AnnouncementDetailPage from './pages/AnnouncementDetailPage'
import EventsPage from './pages/EventsPage'
import HistoricalEventsPage from './pages/HistoricalEventsPage'
import EventDetailPage from './pages/EventDetailPage'
import CoreTeamPage from './pages/CoreTeamPage'
import CoreTeamDetailPage from './pages/CoreTeamDetailPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import AuthErrorPage from './pages/AuthErrorPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import TestDataPage from './pages/TestDataPage'
import ProtectedRoute, { RoleProtectedRoute, MemberRoute, CoreTeamRoute, AdminRoute } from './pages/ProtectedRoute'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { ScrollEffects, CursorEffect, PageTransition } from './components/general'
import { usePageShow } from './hooks/usePageShow'
import EventGalleryPage from './pages/EventGalleryPage'
import UserProfilePage from './pages/UserProfilePage'
import UserProfilePageDebug from './pages/UserProfilePageDebug'
import { default as DevQuickLogin } from './components/DevQuickLogin'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

// 檢測 Google 登入重定向的組件
function GoogleLoginHandler() {
  const { checkAuthStatus } = useAuth();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 檢測 URL 參數中的 login=success
    if (searchParams.get('login') === 'success') {
      // Google 登入成功，刷新認證狀態
      checkAuthStatus();

      // 清除 URL 參數
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams, checkAuthStatus]);

  return null;
}

function App() {
  usePageShow(() => {
    window.location.reload()
  });

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollEffects>
          <CursorEffect />
          <div className="App min-h-screen">
            {/* 處理 Google 登入重定向 */}
            <GoogleLoginHandler />

            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                } />
                <Route path="/announcements" element={
                  <PageTransition>
                    <AnnouncementsPage />
                  </PageTransition>
                } />
                <Route path="/announcements/:id" element={
                  <PageTransition>
                    <AnnouncementDetailPage />
                  </PageTransition>
                } />
                <Route path="/events" element={
                  <PageTransition>
                    <EventsPage />
                  </PageTransition>
                } />
                <Route path="/events/historical" element={
                  <PageTransition>
                    <HistoricalEventsPage />
                  </PageTransition>
                } />
                <Route path="/events/gallery" element={
                  <PageTransition>
                    <EventGalleryPage />
                  </PageTransition>
                } />
                <Route path="/events/:id" element={
                  <PageTransition>
                    <EventDetailPage />
                  </PageTransition>
                } />
                <Route path="/members" element={
                  <PageTransition>
                    <CoreTeamPage />
                  </PageTransition>
                } />
                <Route path="/members/:id" element={
                  <PageTransition>
                    <CoreTeamDetailPage />
                  </PageTransition>
                } />
                <Route path="/users/:id" element={
                  <UserProfilePage />
                } />
                <Route path="/login" element={
                  <PageTransition>
                    <LoginPage />
                  </PageTransition>
                } />                <Route path="/register" element={
                  <PageTransition>
                    <RegisterPage />
                  </PageTransition>
                } />
                <Route path="/auth/error" element={
                  <PageTransition>
                    <AuthErrorPage />
                  </PageTransition>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <PageTransition>
                      <DashboardPage />
                    </PageTransition>
                  </ProtectedRoute>
                } />
                <Route path="/test-data" element={
                  <AdminRoute>
                    <PageTransition>
                      <TestDataPage />
                    </PageTransition>
                  </AdminRoute>
                } />
                <Route path="*" element={
                  <PageTransition>
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="text-6xl">😢</div>
                        <h1 className="text-2xl font-bold text-slate-800">找不到頁面</h1>
                        <p className="text-slate-600">您訪問的頁面不存在</p>
                        <a
                          href="/"
                          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow"
                        >
                          返回首頁
                        </a>
                      </div>
                    </div>
                  </PageTransition>
                } />
              </Routes>
            </AnimatePresence>

            {/* 開發模式快速登入工具 */}
            <DevQuickLogin />
          </div>
        </ScrollEffects>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
