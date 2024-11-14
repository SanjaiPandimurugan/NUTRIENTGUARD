import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Sidebar';
import NutrientDashboard from './components/NutrientDashboard';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import About from './components/About';
import Login from './components/Login';
import Logo from './components/Logo';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  const handleLogoFinish = () => {
    setShowLogo(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (showLogo) {
    return <Logo onFinish={handleLogoFinish} />;
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={
              isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
            } />
            <Route
              path="/*"
              element={
                isLoggedIn ? (
                  <>
                    <Navbar onLogout={handleLogout} />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                      <Routes>
                        <Route index element={<NutrientDashboard />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="about" element={<About />} />
                      </Routes>
                    </div>
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;