import React from 'react';

const SettingsAccountPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">S</span>
                </div>
                <span className="font-semibold text-lg">Social</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span>Profile</span>
                <span>—</span>
                <span>Account</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="text-blue-600 hover:text-blue-800">Logout</button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Profile Info */}
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold text-lg text-gray-800">Robert Fox</h3>
                <p className="text-sm text-gray-500">Software Engineer</p>
              </div>

              {/* Navigation Menu */}
              <div className="mt-6 space-y-2">
                <Link to="/posts" className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-9-9z"/>
                  </svg>
                  Home
                </Link>
                
                <Link to="/profile" className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                  </svg>
                  Profile
                </Link>
                
                <Link to="/blogs" className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  Messages
                </Link>
                
                <div className="w-full text-left px-4 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                  </svg>
                  Notifications
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profile Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">Robert Fox</h2>
                      <p className="text-gray-500">@robert</p>
                      <p className="text-sm text-gray-600">Software Engineer</p>
                    </div>
                  </div>
                  <div className="flex gap-8 text-center">
                    <div>
                      <p className="text-lg font-semibold">12</p>
                      <p className="text-sm text-gray-500">Posts</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">207</p>
                      <p className="text-sm text-gray-500">Followers</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">64</p>
                      <p className="text-sm text-gray-500">Following</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b">
                <button className="px-6 py-3 text-gray-600 hover:text-gray-800">My Posts</button>
                <button className="px-6 py-3 text-gray-600 hover:text-gray-800">Saved Posts</button>
                <button className="px-6 py-3 text-blue-600 border-b-2 border-blue-600 font-medium">Settings</button>
              </div>

              {/* Settings Content */}
              <div className="p-6">
                <div className="flex">
                  {/* Settings Sidebar */}
                  <div className="w-1/3 pr-6">
                    <div className="space-y-1">
                      <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">General</button>
                      <button className="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 rounded">Account</button>
                      <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Logout</button>
                    </div>
                  </div>

                  {/* Settings Content */}
                  <div className="w-2/3 pl-6 border-l">
                    <h3 className="text-lg font-semibold mb-6">Settings</h3>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-red-800 mb-2">Delete Account</h4>
                      <p className="text-sm text-red-700 mb-4">
                        This action is irreversible and will permanently delete all your data associated with this account.
                      </p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Empty for this page */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4">Account Settings</h3>
              <p className="text-sm text-gray-600">
                Manage your account settings and preferences here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccountPage;
