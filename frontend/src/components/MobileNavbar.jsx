import React from "react";
import { Home, Search, Bell } from "lucide-react";

const MobileNavbar = () => {
  return (
    <div className="fixed bottom-0 w-full backdrop-blur-md bg-white/80 border-t border-gray-200 shadow-xl flex justify-around items-center py-3 sm:hidden z-50">
      {/* Home */}
      <button className="group flex flex-col items-center justify-center space-y-0.5 transition duration-300 ease-in-out">
        <Home className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition" />
        <span className="text-[10px] text-gray-500 group-hover:text-blue-600">Home</span>
      </button>

      {/* Search */}
      <button className="group flex flex-col items-center justify-center space-y-0.5 transition duration-300 ease-in-out">
        <Search className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition" />
        <span className="text-[10px] text-gray-500 group-hover:text-blue-600">Search</span>
      </button>

      {/* Notifications */}
      <button className="group flex flex-col items-center justify-center space-y-0.5 transition duration-300 ease-in-out">
        <Bell className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition" />
        <span className="text-[10px] text-gray-500 group-hover:text-blue-600">Alerts</span>
      </button>

      {/* Profile */}
      <button className="group flex flex-col items-center justify-center space-y-0.5">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-7 h-7 rounded-full border-2 border-blue-500 shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
        <span className="text-[10px] text-gray-500 group-hover:text-blue-600">Profile</span>
      </button>
    </div>
  );
};

export default MobileNavbar;
