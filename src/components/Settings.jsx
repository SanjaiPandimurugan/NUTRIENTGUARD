import React, { useState } from 'react';

const translations = {
  en: {
    settings: "Settings",
    language: "Language",
    switchToTamil: "Switch to Tamil",
    switchToEnglish: "Switch to English",
    notifications: "Notifications",
    darkMode: "Dark Mode",
    on: "On",
    off: "Off"
  },
  ta: {
    settings: "அமைப்புகள்",
    language: "மொழி",
    switchToTamil: "தமிழுக்கு மாறவும்",
    switchToEnglish: "ஆங்கிலத்திற்கு மாறவும்",
    notifications: "அறிவிப்புகள்",
    darkMode: "இருண்ட பயன்முறை",
    on: "இயக்கு",
    off: "அணை"
  }
};

const Settings = () => {
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ta' : 'en');
  };

  const t = (key) => translations[language][key];

  return (
    <div className="p-6 space-y-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-emerald-800">{t('settings')}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">{t('language')}</span>
          <button 
            onClick={toggleLanguage}
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
          >
            {language === 'en' ? t('switchToTamil') : t('switchToEnglish')}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">{t('notifications')}</span>
          <button 
            onClick={() => setNotifications(!notifications)}
            className={`${notifications ? 'bg-emerald-500' : 'bg-gray-300'} text-white font-bold py-2 px-4 rounded`}
          >
            {notifications ? t('on') : t('off')}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">{t('darkMode')}</span>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`${darkMode ? 'bg-emerald-500' : 'bg-gray-300'} text-white font-bold py-2 px-4 rounded`}
          >
            {darkMode ? t('on') : t('off')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;