import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/Login/LoginScreen';
import InvoiceGenerator from './components/InvoiceGenerator/InvoiceGenerator';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    // Set body class based on login state
    if (isLoggedIn) {
      document.body.classList.remove('login-active');
    } else {
      document.body.classList.add('login-active');
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={isLoggedIn ? <Navigate to="/" /> : <LoginScreen onLogin={handleLogin} />} 
        />
        <Route 
          path="/" 
          element={isLoggedIn ? <InvoiceGenerator onSignOut={handleSignOut} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
