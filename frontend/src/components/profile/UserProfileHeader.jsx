import React from "react";
import { Bookmark, Grid3x3 } from "lucide-react";


const UserProfileHeader = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left md:space-x-4 w-full">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mb-2 md:mb-0"
          />
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-gray-800">Robert Fox</h2>
            <p className="text-sm text-gray-500">@robert</p>
            <p className="text-sm text-gray-600">Software Engineer</p>
          </div>
        </div>
        {/* Stats - below profile info on mobile, right side on desktop */}
        <div className="flex flex-row justify-center gap-8 w-full md:w-auto md:justify-between md:gap-10">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">12</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">207</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">64</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-t pt-4 hidden md:flex space-x-8 text-sm font-medium text-gray-600">
        <button className="hover:text-black">My Posts</button>
        <button className="hover:text-black">Saved Posts</button></div>


      {/* Mobile Tabs */}
      <div className="md:hidden mt-6 border-t pt-4 flex justify-around text-gray-600">
  <button className="flex flex-col items-center">
    <Grid3x3 className="w-5 h-5" />
    <span className="text-xs mt-1">Posts</span>
  </button>
  <button className="flex flex-col items-center">
    <Bookmark className="w-5 h-5" />
    <span className="text-xs mt-1">Saved</span>
  </button>
</div>


    </div>
  );
};

export default UserProfileHeader;
