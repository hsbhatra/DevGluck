import React from "react";
import { Home, Search, Bell, Bookmark } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 w-full backdrop-blur-md bg-white/80 border-t border-gray-200 shadow-xl flex justify-around items-center py-3 sm:hidden z-50">
      {/* Home */}
      <button 
        onClick={() => navigate('/')}
        className={`group flex flex-col items-center justify-center space-y-0.5 transition duration-300 ease-in-out ${
          isActive('/') ? 'text-blue-600' : ''
        }`}
      >
        <Home className={`w-6 h-6 ${isActive('/') ? 'text-blue-600' : 'text-gray-600'} group-hover:text-blue-600 transition`} />
        <span className={`text-[10px] ${isActive('/') ? 'text-blue-600' : 'text-gray-500'} group-hover:text-blue-600`}>Home</span>
      </button>

      {/* Search */}
      <button className="group flex flex-col items-center justify-center space-y-0.5 transition duration-300 ease-in-out">
        <Search className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition" />
        <span className="text-[10px] text-gray-500 group-hover:text-blue-600">Search</span>
      </button>

      {/* Saved Posts */}
      <button 
        onClick={() => navigate('/saved-posts')}
        className={`group flex flex-col items-center justify-center space-y-0.5 transition duration-300 ease-in-out ${
          isActive('/saved-posts') ? 'text-blue-600' : ''
        }`}
      >
        <Bookmark className={`w-6 h-6 ${isActive('/saved-posts') ? 'text-blue-600' : 'text-gray-600'} group-hover:text-blue-600 transition`} />
        <span className={`text-[10px] ${isActive('/saved-posts') ? 'text-blue-600' : 'text-gray-500'} group-hover:text-blue-600`}>Saved</span>
      </button>

      {/* Profile */}
      <button 
        onClick={() => navigate('/profile')}
        className={`group flex flex-col items-center justify-center space-y-0.5 transition duration-300 ease-in-out ${
          isActive('/profile') ? 'text-blue-600' : ''
        }`}
      >
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className={`w-7 h-7 rounded-full border-2 ${isActive('/profile') ? 'border-blue-600' : 'border-blue-500'} shadow-sm transition-transform duration-300 group-hover:scale-105`}
        />
        <span className={`text-[10px] ${isActive('/profile') ? 'text-blue-600' : 'text-gray-500'} group-hover:text-blue-600`}>Profile</span>
      </button>
    </div>
  );
};

export default MobileNavbar;
