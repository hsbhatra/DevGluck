import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import Comments from "./Comments";
import SharePopup from "./SharePopUp";

const Post = ({ type }) => {
  // ✅ states for interactions
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(12);
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Daniel Brown',
      username: 'daniel_b',
      avatar: '/general/avatar2.png',
      text: 'Fantastic post! Your content always brings a smile to my face. Keep up the great work! 👏',
      time: '2 hours ago',
      likes: 5
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      username: 'sarah_w',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'Love this! Amazing photography skills 📸',
      time: '1 hour ago',
      likes: 3
    }
  ]);

  // ✅ handlers
  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setSaved(prev => !prev);
  };

  const handleComment = () => {
    setShowComments(prev => !prev);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    
    const newComment = {
      id: Date.now(),
      user: 'You',
      username: 'you',
      avatar: '/general/avatar.png',
      text: commentInput.trim(),
      time: 'Just now',
      likes: 0
    };
    
    setComments(prev => [newComment, ...prev]);
    setCommentInput('');
  };

  const handleShare = () => {
    setShowShare(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 w-full overflow-hidden">
        {/* POST CONTENT */}
        <div className={`flex gap-3 sm:gap-4 ${type === "status" ? "flex-col" : ""}`}>
          {/* AVATAR */}
          {type !== "status" && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="/general/avatar.png"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* CONTENT */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            {/* TOP */}
            <div className="w-full flex justify-between items-start">
              <Link to="/AniketWebDev" className="flex gap-3 sm:gap-4 min-w-0 flex-1">
                {type === "status" && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="/general/avatar.png"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`flex items-center gap-2 flex-wrap min-w-0 ${
                    type === "status" ? "flex-col gap-0 items-start" : ""
                  }`}
                >
                  <h1 className="text-md font-bold truncate">Aniket Dev</h1>
                  <span
                    className={`text-gray-500 truncate ${
                      type === "status" ? "text-sm" : ""
                    }`}
                  >
                    @AniketWebDev
                  </span>
                  {type !== "status" && (
                    <span className="text-gray-500 text-sm">1 day ago</span>
                  )}
                </div>
              </Link>

              {/* three dots or info icon */}
              <button className="text-gray-500 hover:text-black flex-shrink-0 ml-2">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* TEXT & MEDIA */}
            <Link to="/AniketWebDev/status/123" className="min-w-0">
              <p className={`${type === "status" ? "text-lg" : ""} text-gray-800 leading-relaxed break-words`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
                animi. Laborum commodi aliquam alias molestias odio, ab in,
                reprehenderit excepturi temporibus, ducimus necessitatibus fugiat
                iure nam voluptas soluta pariatur inventore.
              </p>
            </Link>

            {/* MEDIA IMAGE */}
            <img
              src="/general/post.jpg"
              alt="post"
              className="rounded-md w-full h-auto mt-3"
            />

            {type === "status" && (
              <span className="text-gray-500 text-sm">8:41 PM · Dec 5, 2024</span>
            )}

            {/* INTERACTIONS - Clean and Simple */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 sm:space-x-6">
                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-1 sm:space-x-2 transition-colors ${
                    liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${liked ? 'fill-current' : ''}`} />
                  <span className="text-xs sm:text-sm font-medium">{likes} likes</span>
                </button>

                {/* Comment Button */}
                <button
                  onClick={handleComment}
                  className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">{comments.length} comments</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                >
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">Share</span>
                </button>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className={`transition-colors flex-shrink-0 ${
                  saved ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${saved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SHARE POPUP */}
      {showShare && <SharePopup onClose={() => setShowShare(false)} />}

      {/* COMMENTS MODAL */}
      {showComments && (
        <>
          <div className="fixed inset-0 backdrop-blur-md bg-white/20 z-50" onClick={() => setShowComments(false)}></div>
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={() => setShowComments(false)}>
            <div className="bg-white rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold text-lg">Comments</h3>
                <button
                  onClick={() => setShowComments(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Comments List */}
              <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button className="text-xs text-gray-500 hover:text-red-500 flex items-center space-x-1">
                          <span>❤️</span>
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-xs text-gray-500 hover:text-blue-500">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div className="p-4 border-t">
                <form onSubmit={handleAddComment} className="flex items-center space-x-3">
                  <img
                    src="/general/avatar.png"
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={!commentInput.trim()}
                    className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${
                      commentInput.trim()
                        ? 'text-blue-600 hover:text-blue-700'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Post;
