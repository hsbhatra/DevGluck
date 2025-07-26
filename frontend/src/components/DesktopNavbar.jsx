import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Search from "./search/Search";

const DesktopNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden sm:flex justify-between items-center w-full px-8 py-3 bg-white border-b shadow-sm fixed top-0 z-50">
      {/* Logo & Brand */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow hover:bg-blue-700 transition"
        >
          S
        </button>
        <span className="text-xl font-semibold text-gray-800">Social</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <button 
          onClick={() => navigate('/')}
          className={`text-sm font-medium transition ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          Home
        </button>
        <button 
          onClick={() => navigate('/saved-posts')}
          className={`text-sm font-medium transition ${isActive('/saved-posts') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          Saved Posts
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className={`text-sm font-medium transition ${isActive('/profile') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
        >
          Profile
        </button>
      </div>

      {/* Search Bar */}
      <Search />

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="text-sm text-gray-600 hover:text-blue-600 transition">Logout</button>
        <button onClick={() => navigate('/profile')}>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-9 h-9 rounded-full border-2 border-blue-500 shadow-sm object-cover hover:scale-105 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default DesktopNavbar;
