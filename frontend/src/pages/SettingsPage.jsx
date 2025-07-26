import React from "react";
import { ArrowLeft, Bell, Eye, Lock, HelpCircle, Info, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 px-2 sm:px-4 py-4 sm:py-6 overflow-x-hidden">
      {/* Page Container */}
      <div className="bg-white max-w-3xl mx-auto rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center px-3 sm:px-4 py-3 sm:py-4 border-b">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 text-gray-600" />
          <h1 className="text-base sm:text-lg font-semibold text-gray-800">Settings</h1>
        </div>

        {/* Search Bar */}
        <div className="px-3 sm:px-4 py-3 border-b">
          <input
            type="text"
            placeholder="Search for a setting..."
            className="w-full px-3 sm:px-4 py-2 bg-gray-100 rounded-md text-sm outline-none"
          />
        </div>

        {/* Settings Options */}
        <div className="divide-y">
          <SettingItem icon={<User className="w-4 h-4 sm:w-5 sm:h-5" />} label="Account" path="/settings/account" navigate={navigate} />
          <SettingItem icon={<Bell className="w-4 h-4 sm:w-5 sm:h-5" />} label="Notifications" path="/settings/notifications" navigate={navigate} />
          <SettingItem icon={<Eye className="w-4 h-4 sm:w-5 sm:h-5" />} label="Appearance" path="/settings/appearance" navigate={navigate} />
          <SettingItem icon={<Lock className="w-4 h-4 sm:w-5 sm:h-5" />} label="Privacy & Security" path="/settings/privacy" navigate={navigate} />
          <SettingItem icon={<HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />} label="Help and Support" path="/settings/help" navigate={navigate} />
          <SettingItem icon={<Info className="w-4 h-4 sm:w-5 sm:h-5" />} label="About" path="/settings/about" navigate={navigate} />
        </div>
      </div>
    </div>
  );
};

const SettingItem = ({ icon, label, path, navigate }) => (
  <div
    className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 hover:bg-gray-50 cursor-pointer transition-colors"
    onClick={() => navigate(path)}
  >
    <div className="flex items-center space-x-3 sm:space-x-4 text-gray-700">
      {icon}
      <span className="text-sm sm:text-base">{label}</span>
    </div>
    <span className="text-gray-400 text-sm sm:text-base">›</span>
  </div>
);

export default SettingsPage;
