import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus, X } from "lucide-react";
import PostInput from "../components/feed/PostInput";
import UserPosts from "../components/feed/UserPosts";

const ProfileHeader = ({ onAddClick }) => {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  
  // Use real user data or fallback to defaults
  const profile = {
    name: currentUser?.name || "User",
    username: currentUser?.username || "user",
    bio: currentUser?.bio || "No bio available",
    initials: currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase() : "U",
    avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    posts: currentUser?.posts || 0,
    followers: currentUser?.followers || 0,
    following: currentUser?.following || 0
  };
  
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-start justify-between mb-6">
        {/* Profile Image and Info */}
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-yellow-200">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-yellow-200 flex items-center justify-center">
                <span className="text-gray-700 font-bold text-2xl">{profile.initials}</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h1>
            <p className="text-gray-600 text-base mb-2">@{profile.username}</p>
            <p className="text-gray-500 text-base">{profile.bio}</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">{profile.posts}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{profile.followers}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{profile.following}</div>
            <div className="text-sm text-gray-600">Following</div>
          </div>
        </div>
      </div>
      
      {/* Separator Line */}
      <div className="border-t border-gray-200 mb-6"></div>
      
      {/* Tabs and Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition"
          >
            My Posts
          </button>
          <button 
            onClick={() => navigate('/saved-posts')}
            className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition"
          >
            Saved Posts
          </button>
          <button 
            onClick={() => navigate('/edit-profile')}
            className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

// Post Creation Modal Component
const PostCreationModal = ({ isOpen, onClose }) => {
  const { currentUser } = useSelector((state) => state.users);
  
  // Debug logging
  console.log("PostCreationModal - currentUser:", currentUser);
  
  const handlePostCreated = () => {
    onClose();
    // Optionally refresh user posts here
  };

  if (!isOpen) return null;

  const userInitials = currentUser?.name ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase() : "U";
  const userName = currentUser?.name || "User";
  
  console.log("PostCreationModal - userInitials:", userInitials, "userName:", userName);

  return (
    <>
      <div className="fixed inset-0 z-50 pointer-events-auto" style={{backdropFilter: 'blur(8px)'}} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{userInitials}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm sm:text-base truncate">{userName}</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">Post to Anyone</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 flex-shrink-0 ml-2"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-base sm:text-lg text-gray-600 mb-4">What do you want to talk about?</h2>
            </div>
            
            {/* Use the reusable PostInput component */}
            <PostInput
              mode="modal"
              placeholder="Share your thoughts..."
              showUserInfo={false}
              onPostCreated={handlePostCreated}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6">
          {/* User Profile Header */}
          <ProfileHeader onAddClick={() => setShowModal(true)} />

          {/* User Posts Feed */}
          <UserPosts />
        </div>
      </div>

      {/* Post Creation Modal */}
      <PostCreationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ProfilePage;