import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AnnouncementsPage from './pages/AnnouncementsPage'
import AnnouncementDetailPage from './pages/AnnouncementDetailPage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import CoreTeamPage from './pages/CoreTeamPage'
import CoreTeamDetailPage from './pages/CoreTeamDetailPage';
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/announcements/:id" element={<AnnouncementDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/members" element={<CoreTeamPage />} />
          <Route path="/members/:id" element={<CoreTeamDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<p className="p-6 text-center">找不到頁面 😢</p>} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
