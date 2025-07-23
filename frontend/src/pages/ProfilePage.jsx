import React, { useState } from "react";
import { Plus, X, Smile, Image, Calendar, Clock, Hash, Type } from "lucide-react";

// Mock UserProfileHeader component
const UserProfileHeader = ({ onAddClick }) => (
  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
        <span className="text-white font-bold text-lg sm:text-xl">RF</span>
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Robert Fox</h1>
        <p className="text-gray-600">@robert</p>
        <p className="text-gray-500 text-sm sm:text-base">Software Engineer</p>
      </div>
      <div className="flex space-x-6 sm:space-x-8 text-center">
        <div>
          <div className="text-lg sm:text-xl font-bold">12</div>
          <div className="text-xs sm:text-sm text-gray-600">Posts</div>
        </div>
        <div>
          <div className="text-lg sm:text-xl font-bold">207</div>
          <div className="text-xs sm:text-sm text-gray-600">Followers</div>
        </div>
        <div>
          <div className="text-lg sm:text-xl font-bold">64</div>
          <div className="text-xs sm:text-sm text-gray-600">Following</div>
        </div>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 border-t pt-4 space-y-3 sm:space-y-0">
      <div className="flex justify-center sm:justify-start space-x-4">
        <button className="text-blue-600 border-b-2 border-blue-600 pb-1 text-sm sm:text-base">My Posts</button>
        <button className="text-gray-600 hover:text-blue-600 text-sm sm:text-base">Saved Posts</button>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center justify-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium bg-blue-50 px-3 py-2 rounded-full sm:bg-transparent sm:px-0 sm:py-0"
      >
        <Plus className="w-4 h-4" />
        <span>Add</span>
      </button>
    </div>
  </div>
);

// Mock Feed component
const Feed = () => (
  <div className="space-y-4">
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">AD</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base">Aniket Dev</h3>
          <p className="text-xs sm:text-sm text-gray-500 truncate">@AniketWebDev • 1 day ago</p>
        </div>
      </div>
      <p className="text-gray-800 mb-4 text-sm sm:text-base leading-relaxed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, animi. Laborum commodi aliquam alias molestias odio, ab in, reprehenderit excepturi temporibus, ducimus necessitatibus fugiat iure nam voluptas soluta pariatur inventore.
      </p>
      <img
        src="/general/post.jpg"
        alt="Post"
        className="w-full rounded-md border object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = '/general/post.jpg'; }}
      />
    </div>
  </div>
);

// Emoji Picker Component
const EmojiPicker = () => {
  const emojis = ['😀', '😂', '😍', '🤔', '👍', '❤️', '🎉', '🔥', '💯', '🚀', '✨', '🌟'];
  
  return (
    <div className="grid grid-cols-6 gap-2 p-4 bg-gray-50 rounded-lg">
      {emojis.map((emoji, index) => (
        <button
          key={index}
          className="text-2xl hover:bg-gray-200 rounded p-2 transition-colors"
          onClick={() => {
            // Add emoji to textarea - you can implement this functionality
            console.log('Emoji selected:', emoji);
          }}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

// Image Upload Component
const ImageUpload = ({ onImageSelect }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center">
      <Image className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
      <p className="text-gray-600 mb-2 text-sm sm:text-base">Click to upload or drag and drop</p>
      <p className="text-xs sm:text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageSelect}
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="mt-2 sm:mt-4 inline-block bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 text-sm rounded-lg cursor-pointer hover:bg-blue-700"
      >
        Choose File
      </label>
    </div>
  </div>
);

// Calendar/Schedule Component
const SchedulePost = () => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <h3 className="font-medium mb-3 text-sm sm:text-base">Schedule Post</h3>
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
        <input
          type="time"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
);

// More Options Component
const MoreOptions = () => (
  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Hash className="w-4 h-4 text-gray-600" />
        <span className="text-sm">Add hashtags</span>
      </div>
      <button className="text-blue-600 text-sm">Add</button>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Type className="w-4 h-4 text-gray-600" />
        <span className="text-sm">Text formatting</span>
      </div>
      <button className="text-blue-600 text-sm">Format</button>
    </div>
  </div>
);

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
      {/* Blurred overlay without black background */}
      <div className="fixed inset-0 z-50 pointer-events-auto" style={{backdropFilter: 'blur(8px)'}} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">AK</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm sm:text-base truncate">Anvi Kapoor</h3>
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

          {/* Modal Content */}
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
                <ImageUpload onImageSelect={handleImageSelect} />
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
    <>
      <div className={`min-h-screen bg-gray-100 transition-all duration-300 ${showModal ? 'blur-sm' : ''}`}>
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="space-y-4 sm:space-y-6">
            {/* User Profile Header */}
            <UserProfileHeader onAddClick={() => setShowModal(true)} />

            {/* Feed */}
            <Feed />
          </div>
        </div>
      </div>

      {/* Post Creation Modal */}
      <PostCreationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default ProfilePage;