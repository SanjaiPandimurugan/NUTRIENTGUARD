import React, { useEffect } from 'react';
import logoImage from '../assets/logo6.png';
import plantImage from '../assets/young-plant-isolated-white.jpg';

const Logo = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${plantImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-green-400/80 z-10" />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl transform scale-110" />
            <img
              src={logoImage}
              alt="NPK Dashboard Logo"
              className="w-64 h-64 relative z-10 transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-white/30 filter blur-xl animate-pulse" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg tracking-wide">
            Fertile Future
          </h1>
          <p className="text-2xl text-green-50 drop-shadow-md font-light">
            Nurturing Tomorrow's Harvest
          </p>
          
          {/* Additional decorative elements */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-16 h-1 bg-green-200/40 rounded-full" />
            <div className="w-3 h-3 bg-green-200/40 rounded-full" />
            <div className="w-16 h-1 bg-green-200/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;