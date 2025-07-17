import React from 'react';
import FollowNotification from '../components/notifications/FollowingNotification';

const NotificationsPage = () => {
  // Sample notification data
  const notifications = [
    {
      id: 1,
      name: "Bessie Cooper",
      message: "start following you",
      time: "10 minutes ago",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      type: "follow"
    },
    {
      id: 2,
      name: "Samuel Lee",
      message: "liked your post",
      time: "1 hour ago",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      type: "like"
    },
    {
      id: 3,
      name: "Joseph Rodriguez",
      message: "comment on your post",
      time: "yesterday",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
      type: "comment"
    }
  ];

  // Sample suggested friends data
  const suggestedFriends = [
    {
      id: 1,
      name: "Olivia Anderson",
      role: "Financial Analyst",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 2,
      name: "Thomas Baker",
      role: "Project Manager",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      name: "Lily Lee",
      role: "Graphic Designer",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 4,
      name: "Andrew Harris",
      role: "Data Scientist",
      image: "https://randomuser.me/api/portraits/men/78.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">DevGluck</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="text-gray-600 hover:text-gray-800">
                Logout
              </button>
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
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold text-lg text-gray-800">Robert Fox</h3>
                <p className="text-sm text-gray-500 mb-4">Software Engineer</p>
              </div>

              {/* Navigation Menu */}
              <div className="mt-6 space-y-2">
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-9-9z"/>
                  </svg>
                  Home
                </button>
                
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                  </svg>
                  Profile
                </button>
                
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  Messages
                </button>
                
                <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                  </svg>
                  Notifications
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Notifications */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        src={notification.image}
                        alt={notification.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">{notification.name}</span> {notification.message}.
                        </p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Suggested Friends */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Suggested Friends</h3>
              
              <div className="space-y-4">
                {suggestedFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={friend.image}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm text-gray-800">{friend.name}</p>
                        <p className="text-xs text-gray-500">{friend.role}</p>
                      </div>
                    </div>
                    <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="mt-8 pt-4 border-t text-center">
                <p className="text-xs text-gray-500">© 2023 DevCut. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2">
                  <a href="#" className="text-xs text-gray-500 hover:text-gray-700">About</a>
                  <a href="#" className="text-xs text-gray-500 hover:text-gray-700">Help</a>
                  <a href="#" className="text-xs text-gray-500 hover:text-gray-700">Privacy & Terms</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
