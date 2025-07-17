import React from 'react';
import UserProfileHeader from '../components/profile/UserProfileHeader';
import Feed from '../components/feed/Feed';
import FollowersFollowing from '../components/feed/FollowersFollowing';

const UserPersonalPosts = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Profile Info */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold text-lg text-gray-800">Robert Fox</h3>
                <p className="text-sm text-gray-500 mb-4">Software Engineer</p>
                
                {/* Stats */}
                <div className="flex justify-around w-full text-center border-t pt-4">
                  <div>
                    <p className="font-semibold text-gray-800">12</p>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">207</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">64</p>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="mt-6 space-y-2">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-9-9z"/>
                  </svg>
                  Home
                </button>
                <button className="w-full text-left px-4 py-2 text-blue-600 bg-blue-50 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  </svg>
                  Messages
                </button>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                  </svg>
                  Notifications
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            {/* Profile Header */}
            <UserProfileHeader />
            
            {/* Feed */}
            <div className="mt-6">
              <Feed />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-6">
              <FollowersFollowing />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPersonalPosts;
