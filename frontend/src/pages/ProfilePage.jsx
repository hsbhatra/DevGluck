import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Smile, Image, Calendar, Clock, Hash, Type, Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Send } from "lucide-react";

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

// Comment Component
const Comment = ({ comment, onReply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [liked, setLiked] = useState(comment.liked || false);
  const [likes, setLikes] = useState(comment.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="mb-3">
      <div className="flex items-start space-x-2">
        <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs">{comment.author.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="font-semibold text-sm">{comment.author}</p>
            <p className="text-sm text-gray-800">{comment.text}</p>
          </div>
          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-1 hover:text-red-500 ${liked ? 'text-red-500' : ''}`}
            >
              <Heart className={`w-3 h-3 ${liked ? 'fill-current' : ''}`} />
              <span>{likes > 0 ? likes : ''}</span>
            </button>
            <button onClick={() => onReply(comment.id)} className="hover:text-blue-500">Reply</button>
            <span>{comment.time}</span>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
              <button 
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                {showReplies ? 'Hide' : 'View'} {comment.replies.length} replies
              </button>
              {showReplies && (
                <div className="ml-4 mt-2 space-y-2">
                  {comment.replies.map((reply) => (
                    <Comment key={reply.id} comment={reply} onReply={onReply} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Comments Modal Component
const CommentsModal = ({ isOpen, onClose, post }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      text: "Great post! Really insightful.",
      time: "2h",
      likes: 5,
      liked: false,
      replies: [
        {
          id: 2,
          author: "Jane Smith",
          text: "I agree completely!",
          time: "1h",
          likes: 2,
          liked: false
        }
      ]
    },
    {
      id: 3,
      author: "Mike Johnson",
      text: "Thanks for sharing this. Very helpful!",
      time: "3h",
      likes: 1,
      liked: true
    }
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "You",
        text: newComment,
        time: "now",
        likes: 0,
        liked: false,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleReply = (commentId) => {
    console.log("Reply to comment:", commentId);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md bg-white/20 z-50" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-lg">Comments</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} onReply={handleReply} />
            ))}
          </div>

          {/* Add Comment */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">RF</span>
              </div>
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className={`p-2 rounded-full ${
                    newComment.trim() 
                      ? 'text-blue-600 hover:bg-blue-50' 
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Share Modal Component
const ShareModal = ({ isOpen, onClose, post }) => {
  const shareOptions = [
    { name: 'Copy Link', icon: '🔗' },
    { name: 'Share to Twitter', icon: '🐦' },
    { name: 'Share to Facebook', icon: '📘' },
    { name: 'Share to LinkedIn', icon: '💼' },
    { name: 'Send via Email', icon: '📧' },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-md bg-white/20 z-50" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Share Post</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-4">
            {shareOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  console.log('Share via:', option.name);
                  onClose();
                }}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg text-left"
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-sm font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Enhanced Post Component with Instagram-like features
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [saved, setSaved] = useState(post.saved || false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        {/* Post Header */}
        <div className="flex items-start justify-between p-4 sm:p-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{post.author.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base">{post.author.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 truncate">@{post.author.username} • {post.time}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Post Content */}
        <div className="px-4 sm:px-6 pb-4">
          <p className="text-gray-800 mb-4 text-sm sm:text-base leading-relaxed">
            {post.content}
          </p>
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full rounded-md border object-cover"
            />
          )}
        </div>

        {/* Post Actions */}
        <div className="px-4 sm:px-6 pb-4">
          {/* Like count */}
          {likes > 0 && (
            <p className="text-sm text-gray-500 mb-2">
              {likes} {likes === 1 ? 'like' : 'likes'}
            </p>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">Like</span>
              </button>
              
              <button
                onClick={() => setShowComments(true)}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Comment</span>
              </button>
              
              <button
                onClick={() => setShowShare(true)}
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
              >
                <Share className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
            
            <button
              onClick={handleSave}
              className={`transition-colors ${
                saved ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Comments Modal */}
      <CommentsModal 
        isOpen={showComments} 
        onClose={() => setShowComments(false)} 
        post={post} 
      />

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShare} 
        onClose={() => setShowShare(false)} 
        post={post} 
      />
    </>
  );
};

// Updated Feed component with enhanced posts
const Feed = () => {
  const posts = [
    {
      id: 1,
      author: {
        name: "Aniket Dev",
        username: "AniketWebDev",
        initials: "AD"
      },
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, animi. Laborum commodi aliquam alias molestias odio, ab in, reprehenderit excepturi temporibus, ducimus necessitatibus fugiat iure nam voluptas soluta pariatur inventore.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      time: "1 day ago",
      likes: 12,
      liked: false,
      saved: false
    },
    {
      id: 2,
      author: {
        name: "Sarah Wilson",
        username: "sarahw",
        initials: "SW"
      },
      content: "Just finished working on an amazing React project! The component architecture is so clean and the performance is incredible. Can't wait to share more details soon! 🚀",
      image: null,
      time: "3 hours ago",
      likes: 8,
      liked: true,
      saved: false
    }
  ];

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

// Post Creation Modal Component (keeping your existing modal)
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

            {activeTab === 'image' && (
              <div className="mb-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center">
                    <Image className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-4" />
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">Click to upload or drag and drop</p>
                    <p className="text-xs sm:text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelect}
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
              </div>
            )}

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
      <div className={`min-h-screen bg-gray-100 transition-all duration-300 ${showModal ? 'blur-sm' : ''}`}>
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="space-y-4 sm:space-y-6">
            <ProfileHeader onAddClick={() => setShowModal(true)} />
            <Feed />
          </div>
        </div>
      </div>
      <PostCreationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </ProfileProvider>
  );
};

export default ProfilePage;