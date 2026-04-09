import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App           from './App.jsx'
import LoginPage     from './LoginPage.jsx'
import PublicBooking from './PublicBooking.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<PublicBooking />} />
        <Route path="/admin/login"  element={<LoginPage />} />
        <Route path="/admin"        element={<App />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
