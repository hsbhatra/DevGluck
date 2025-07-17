import React, { useState } from 'react';

const SettingsGeneralPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    bio: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Saving changes:', formData);
  };

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
                <span>General</span>
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
              <div className="space-y-2">
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
                      <button className="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 rounded">General</button>
                      <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Account</button>
                      <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Logout</button>
                    </div>
                  </div>

                  {/* Settings Content */}
                  <div className="w-2/3 pl-6 border-l">
                    <h3 className="text-lg font-semibold mb-6">Settings</h3>
                    
                    <div className="space-y-6">
                      {/* Avatar Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Choose an image for avatar
                        </label>
                        <div className="flex items-center gap-4">
                          <img
                            src="https://randomuser.me/api/portraits/men/75.jpg"
                            alt="Current avatar"
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Choose Image
                          </button>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Username */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Enter your username"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Tell us about yourself"
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>

                      {/* Save Button */}
                      <div className="pt-4">
                        <button
                          onClick={handleSaveChanges}
                          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Empty for this page */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4">General Settings</h3>
              <p className="text-sm text-gray-600">
                Update your profile information and preferences here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsGeneralPage;
