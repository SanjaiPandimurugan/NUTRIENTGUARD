import React, { useState } from 'react';
import { Home, ChartBar, Settings, Info, LogOut, Globe, Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo3.png';

const translations = {
  en: {
    dashboard: "Dashboard",
    analytics: "Analytics",
    settings: "Settings",
    about: "About",
    logout: "Logout",
    changeLanguage: "Change Language",
    projectName: "Soil Nutrient Monitor"
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    analytics: "பகுப்பாய்வு",
    settings: "அமைப்புகள்",
    about: "பற்றி",
    logout: "வெளியேறு",
    changeLanguage: "மொழியை மாற்று",
    projectName: "மண் ஊட்டச்சத்து கண்காணிப்பு"
  },
  // ... (keep other language translations)
};

const languageNames = {
  en: "English",
  ta: "தமிழ்",
  hi: "हिंदी",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം"
};

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const t = (key) => translations[language][key];

  const menuItems = [
    { icon: Home, label: t('dashboard'), path: '/' },
    { icon: ChartBar, label: t('analytics'), path: '/analytics' },
    { icon: Settings, label: t('settings'), path: '/settings' },
    { icon: Info, label: t('about'), path: '/about' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  return (
    <nav className="bg-emerald-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-4">
            <img src={logoImage} alt="Logo" className="h-20 w-auto" />
            <span className="font-bold text-xl">FertileFuture</span>
          </div>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                  ${location.pathname === item.path 
                    ? 'bg-white-700' 
                    : 'hover:bg-emerald-700'}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-emerald-700"
              >
                <Globe size={18} />
              </button>
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {Object.entries(languageNames).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-emerald-700"
            >
              <LogOut size={18} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md hover:bg-emerald-700"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-emerald-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                  ${location.pathname === item.path 
                    ? 'bg-emerald-600' 
                    : 'hover:bg-emerald-600'}`}
                onClick={() => setShowMobileMenu(false)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium w-full hover:bg-emerald-600"
            >
              <LogOut size={18} />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;