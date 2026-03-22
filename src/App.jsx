import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/HomePage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import WardrobePage from './pages/WardrobePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            background: '#fff',
            color: '#18140f',
            border: '1px solid #ebe2d6',
          }
        }}
      />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/login"       element={<LoginPage />} />
        <Route path="/signup"      element={<SignupPage />} />
        <Route path="/onboarding"  element={<OnboardingPage />} />
        <Route path="/dashboard"   element={<><Navbar /><DashboardPage /></>} />
        <Route path="/wardrobe"    element={<><Navbar /><WardrobePage /></>} />
        <Route path="/profile"     element={<><Navbar /><ProfilePage /></>} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}