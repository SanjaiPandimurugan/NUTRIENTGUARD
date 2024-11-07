import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import NutrientDashboard from './components/NutrientDashboard';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import About from './components/About';
import Login from './components/Login';
import Logo from './components/Logo';
import './index.css';

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
    <Router>
      <Routes>
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/*" element={
          isLoggedIn ? (
            <Layout onLogout={handleLogout}>
              <Routes>
                <Route index element={<NutrientDashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
                <Route path="about" element={<About />} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;