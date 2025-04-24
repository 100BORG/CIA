import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import InvoicePage from './pages/InvoicePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Check authentication on initial load
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsAuthenticated(isLoggedIn)
    
    // Check dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.body.classList.add('dark-mode')
    }
  }, [])

  // Update body class when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  // Redirect based on authentication status
  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      navigate('/')
    } else if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [isAuthenticated, location.pathname, navigate])

  const handleLogin = (email) => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', email)
    localStorage.setItem('lastLogin', new Date().toString())
    setIsAuthenticated(true)
    navigate('/')
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    setIsAuthenticated(false)
    navigate('/login')
  }

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <LoginPage onLogin={handleLogin} />
        } />
        
        <Route path="/" element={
          isAuthenticated ? 
            <InvoicePage 
              onLogout={handleLogout} 
              darkMode={darkMode} 
              toggleDarkMode={toggleDarkMode}
            /> : 
            <Navigate to="/login" replace />
        } />
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
