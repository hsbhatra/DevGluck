import React, { useState } from "react";

const FollowersFollowing = () => {
  // ✅ Dummy JSON data right here
  const followers = [
    {
      id: 1,
      name: "Jane Doe",
      username: "janedoe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "John Smith",
      username: "johnsmith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Ella Brown",
      username: "ellab",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  const following = [
    {
      id: 4,
      name: "Alice Johnson",
      username: "alicej",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      id: 5,
      name: "Mark Lee",
      username: "marklee",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
      id: 6,
      name: "Chris Evans",
      username: "chrisevans",
      avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    },
  ];

  const [activeTab, setActiveTab] = useState("followers");
  const [followState, setFollowState] = useState({
    followers: followers.map(() => true),
    following: following.map(() => true),
  });

  const handleToggle = (listType, index) => {
    setFollowState((prev) => ({
      ...prev,
      [listType]: prev[listType].map((val, i) =>
        i === index ? !val : val
      ),
    }));
  };

  const currentList = activeTab === "followers" ? followers : following;

  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-md mx-auto">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("followers")}
          className={`flex-1 py-3 text-center font-semibold transition-colors ${
            activeTab === "followers"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`flex-1 py-3 text-center font-semibold transition-colors ${
            activeTab === "following"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Following
        </button>
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto divide-y divide-gray-200">
        {currentList.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No {activeTab}.
          </div>
        )}
        {currentList.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between py-3 px-4"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            {/* Right */}
            <button
              onClick={() => handleToggle(activeTab, index)}
              className={`px-3 py-1 text-sm font-medium rounded-full border transition-colors ${
                followState[activeTab][index]
                  ? "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
              }`}
            >
              {followState[activeTab][index] ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersFollowing;
