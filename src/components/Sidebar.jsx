import React, { useState } from 'react';
import { Home, ChartBar, Settings, Info, LogOut, Menu, Globe } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo1.png'; // Make sure this path is correct

const translations = {
  en: {
    dashboard: "Dashboard",
    analytics: "Analytics",
    settings: "Settings",
    about: "About",
    logout: "Logout",
    changeLanguage: "Change Language"
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    analytics: "பகுப்பாய்வு",
    settings: "அமைப்புகள்",
    about: "பற்றி",
    logout: "வெளியேறு",
    changeLanguage: "மொழியை மாற்று"
  },
  hi: {
    dashboard: "डैशबोर्ड",
    analytics: "विश्लेषण",
    settings: "सेटिंग्स",
    about: "परिचय",
    logout: "लॉग आउट",
    changeLanguage: "भाषा बदलें"
  },
  te: {
    dashboard: "డాష్‌బోర్డ్",
    analytics: "విశ్లేషణలు",
    settings: "సెట్టింగ్‌లు",
    about: "గురించి",
    logout: "లాగ్ అవుట్",
    changeLanguage: "భాష మార్చు"
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    analytics: "ವಿಶ್ಲೇಷಣೆಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    about: "ಬಗ್ಗೆ",
    logout: "ಲಾಗ್ ಔಟ್",
    changeLanguage: "ಭಾಷೆ ಬದಲಾಯಿಸಿ"
  },
  ml: {
    dashboard: "ഡാഷ്ബോർഡ്",
    analytics: "വിശകലനങ്ങൾ",
    settings: "ക്രമീകരണങ്ങൾ",
    about: "കുറിച്ച്",
    logout: "ലോഗൗട്ട്",
    changeLanguage: "ഭാഷ മാറ്റുക"
  }
};

const languageNames = {
  en: "English",
  ta: "தமிழ்",
  hi: "हिंदी",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം"
};

const Sidebar = ({ isOpen, toggleSidebar, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

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
    <div className={`bg-emerald-800 text-white ${isOpen ? 'w-64' : 'w-20'} min-h-screen p-4 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-8">
        <div className={`overflow-hidden ${isOpen ? 'w-40' : 'w-12'} transition-all duration-300`}>
          <img src={logoImage} alt="Logo" className="h-12 w-auto" />
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path ? 'bg-emerald-700' : 'hover:bg-emerald-700'
                }`}
              >
                <item.icon size={24} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-20 left-0 right-0 px-4">
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center space-x-2 p-2 w-full hover:bg-emerald-700 rounded-lg transition-colors duration-200"
          >
            <Globe size={24} />
            {isOpen && <span>{t('changeLanguage')}</span>}
          </button>
          {showLanguageDropdown && (
            <div className="absolute bottom-full left-0 w-full bg-emerald-700 rounded-lg overflow-hidden">
              {Object.entries(languageNames).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className="block w-full text-left px-4 py-2 hover:bg-emerald-600 transition-colors duration-200"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 px-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 w-full hover:bg-emerald-700 rounded-lg transition-colors duration-200"
        >
          <LogOut size={24} />
          {isOpen && <span>{t('logout')}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;