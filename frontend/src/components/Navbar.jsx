import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Bell, MessageCircle, User, LogOut, Menu, X, BookOpen } from "lucide-react";
import SearchComponent from "./search/Search";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const NavItem = ({ to, icon: Icon, label, mobileOnly = false, desktopOnly = false }) => (
    <Link
      to={to}
      className={`group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
        isActive(to)
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
      } ${mobileOnly ? "sm:hidden" : ""} ${desktopOnly ? "hidden sm:flex" : ""}`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-medium">{label}</span>
    </Link>
  );

  const MobileNavItem = ({ to, icon: Icon, label }) => (
    <Link
      to={to}
      className={`group flex flex-col items-center justify-center space-y-1 p-3 rounded-lg transition-all duration-200 ${
        isActive(to)
          ? "text-blue-600 bg-blue-50"
          : "text-gray-600 hover:text-blue-600"
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {Icon && <Icon className="w-6 h-6" />}
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:flex justify-between items-center w-full px-6 py-4 bg-white border-b shadow-sm fixed top-0 z-50">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">
            DG
          </div>
          <span className="text-xl font-semibold text-gray-800">DevGluck</span>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center space-x-1">
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/notifications" icon={Bell} label="Notifications" />
          <NavItem to="/messages" icon={MessageCircle} label="Messages" />
          <NavItem to="/blogs" icon={BookOpen} label="Blogs" />
          <NavItem to="/profile" icon={User} label="Profile" />
        </div>

        {/* Search Bar */}
        {/* <div className="flex-1 max-w-md mx-8">
          <SearchComponent />
        </div> */}

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
          {/* <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-blue-500 shadow-sm object-cover hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate("/profile")}
          /> */}
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="sm:hidden fixed top-0 w-full bg-white border-b shadow-sm z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm">
            DG
            </div>
            <span className="text-lg font-semibold text-gray-800">DevGluck</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {/* <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-500 shadow-sm object-cover"
              onClick={() => navigate("/profile")}
            /> */}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {/* <div className="mt-3">
          <SearchComponent />
        </div> */}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-2">
            <NavItem to="/" icon={Home} label="Home" />
            <NavItem to="/notifications" icon={Bell} label="Notifications" />
            <NavItem to="/messages" icon={MessageCircle} label="Messages" />
            <NavItem to="/blogs" icon={BookOpen} label="Blogs" />
            <NavItem to="/profile" icon={User} label="Profile" />
            
            <div className="border-t pt-4 mt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 w-full backdrop-blur-md bg-white/90 border-t border-gray-200 shadow-xl flex justify-around items-center py-2 z-50">
        <MobileNavItem to="/" icon={Home} label="Home" />
        <MobileNavItem to="/notifications" icon={Bell} label="Alerts" />
        <MobileNavItem to="/messages" icon={MessageCircle} label="Chat" />
        <MobileNavItem to="/blogs" icon={BookOpen} label="Blogs" />
        <MobileNavItem to="/profile" icon={User} label="Profile" />
      </div>
    </>
  );
};

export default Navbar; 