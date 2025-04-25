import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AnnouncementsPage from './pages/AnnouncementsPage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="*" element={<p className="p-6 text-center">找不到頁面 😢</p>} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
