import React from "react";
import { Search } from "lucide-react";

const DesktopNavbar = () => {
  return (
    <div className="hidden sm:flex justify-between items-center w-full px-8 py-3 bg-white border-b shadow-sm fixed top-0 z-50">
      {/* Logo & Brand */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
          S
        </div>
        <span className="text-xl font-semibold text-gray-800">Social</span>
      </div>

      {/* Search Bar */}
      <div className="w-1/2 max-w-md relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 pl-10 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="text-sm text-gray-600 hover:text-blue-600 transition">Logout</button>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full border-2 border-blue-500 shadow-sm object-cover hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
};

export default DesktopNavbar;
