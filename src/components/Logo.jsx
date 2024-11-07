import React, { useEffect } from 'react';
import logoImage from '../assets/logo1.png'; // Adjust the path as needed

const Logo = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
      <div className="text-center">
        <div className="relative inline-block">
          <img
            src={logoImage}
            alt="NPK Dashboard Logo"
            className="w-64 h-64 mb-8"
          />
          <div className="absolute inset-0 rounded-full bg-white opacity-25 filter blur-xl"></div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Fertile Future
        </h1>
        <p className="text-xl text-green-100 drop-shadow-md">
          Nurturing Tomorrow's Harvest
        </p>
      </div>
    </div>
  );
};

export default Logo;