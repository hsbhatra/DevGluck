import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Smile, Image, Calendar, Clock, Hash, Type, Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Send } from "lucide-react";
import Post from "../components/feed/Post";

// Mock Profile Context (since we don't have the actual context)
const ProfileContext = React.createContext();
const ProfileProvider = ({ children }) => {
  const profile = {
    name: "Robert Fox",
    username: "robert",
    bio: "Software Engineer",
    initials: "RF",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    posts: 12,
    followers: 207,
    following: 64
  };
  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

const ProfileHeader = ({ onAddClick }) => {
  const { profile } = useContext(ProfileContext);
  const navigate = useNavigate();
  
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
  const [postContent, setPostContent] = useState("");
  const [activeTab, setActiveTab] = useState("text");
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePost = () => {
    if (postContent.trim() === "") return;
    console.log("Posted:", postContent);
    if (selectedImage) {
      console.log("With image:", selectedImage.name);
    }
    setPostContent("");
    setSelectedImage(null);
    setActiveTab("text");
    onClose();
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log("Image selected:", file.name);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 pointer-events-auto" style={{backdropFilter: 'blur(8px)'}} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">RF</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm sm:text-base truncate">Robert Fox</h3>
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
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your thoughts..."
              />
              {/* Show selected image preview */}
              {selectedImage && (
                <div className="mt-3 p-2 bg-blue-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <Image className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-blue-700 truncate">{selectedImage.name}</span>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-400 hover:text-red-500 flex-shrink-0 ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Media Options Tabs */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-1 sm:space-x-2">
                <button
                  className={`p-2 rounded-full transition-colors ${activeTab === 'image' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab(activeTab === 'image' ? 'text' : 'image')}
                  title="Add image"
                >
                  <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Dynamic Content Based on Active Tab */}
            {activeTab === 'image' && (
              <div className="mb-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center">
                    <Image className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">Click to upload or drag and drop</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-sm sm:text-base"
                    >
                      Choose Image
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Post Button */}
            <div className="flex justify-end">
              <button
                onClick={handlePost}
                disabled={postContent.trim() === ""}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  postContent.trim() === ""
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <ProfileProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="space-y-4 sm:space-y-6">
            {/* User Profile Header */}
            <ProfileHeader onAddClick={() => setShowModal(true)} />

            {/* User Posts Feed */}
            <div className="space-y-4">
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
        </div>
      </div>

      {/* Post Creation Modal */}
      <PostCreationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </ProfileProvider>
  );
};

export default ProfilePage;