import React, { useState } from 'react';
import { Home, ChartBar, Settings, Info, LogOut, Menu } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo6.png';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: ChartBar, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: Info, label: 'About', path: '/about' },
  ];

  return (
    <nav className="bg-emerald-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-4">
            <img src={logoImage} alt="Nutrient Monitor" className="h-8" />
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

            {/* Logout Button */}
            <button
              onClick={onLogout}
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
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium w-full hover:bg-emerald-600"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;