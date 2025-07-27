import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Trash2 } from "lucide-react";
import { likePost, addComment, fetchComments, deletePost } from "../../slices/PostSlice.js";
import Comments from "./Comments";
import SharePopup from "./SharePopUp";

const Post = ({ post, type }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { comments: postComments, likeLoading, commentLoading } = useSelector((state) => state.posts);
  
  // ✅ states for interactions
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const deleteMenuRef = useRef(null);

  // Get comments for this post
  const comments = postComments[post._id] || [];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return '1 day ago';
    return date.toLocaleDateString();
  };

  // Click outside handler for delete menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deleteMenuRef.current && !deleteMenuRef.current.contains(event.target)) {
        setShowDeleteMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ✅ handlers
  const handleLike = async () => {
    try {
      await dispatch(likePost(post._id)).unwrap();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleSave = () => {
    setSaved(prev => !prev);
  };

  const handleComment = () => {
    if (!showComments) {
      dispatch(fetchComments(post._id));
    }
    setShowComments(prev => !prev);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    
    try {
      await dispatch(addComment({ postId: post._id, commentText: commentInput.trim() })).unwrap();
      setCommentInput('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleShare = () => {
    setShowShare(true);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await dispatch(deletePost(post._id)).unwrap();
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
    setShowDeleteMenu(false);
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
                src={post.author?.avatar || "/general/avatar.png"}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* CONTENT */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            {/* TOP */}
            <div className="w-full flex justify-between items-start">
              <Link to={`/profile/${post.author?.username || post.author?._id}`} className="flex gap-3 sm:gap-4 min-w-0 flex-1">
                {type === "status" && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={post.author?.avatar || "/general/avatar.png"}
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
                  <h1 className="text-md font-bold truncate">
                    {post.author?.name}
                  </h1>
                  <span
                    className={`text-gray-500 truncate ${
                      type === "status" ? "text-sm" : ""
                    }`}
                  >
                    @{post.author?.username}
                  </span>
                  {type !== "status" && (
                    <span className="text-gray-500 text-sm">{formatDate(post.createdAt)}</span>
                  )}
                </div>
              </Link>

              {/* three dots or info icon */}
              <div className="relative flex-shrink-0 ml-2" ref={deleteMenuRef}>
                <button 
                  onClick={() => setShowDeleteMenu(!showDeleteMenu)}
                  className="text-gray-500 hover:text-black"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                
                {/* Delete Menu */}
                {showDeleteMenu && post.author?._id === currentUser?._id && (
                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* TEXT & MEDIA */}
            <Link to={`/post/${post._id}`} className="min-w-0">
              <p className={`${type === "status" ? "text-lg" : ""} text-gray-800 leading-relaxed break-words`}>
                {post.content}
              </p>
            </Link>

            {/* MEDIA IMAGE */}
            {post.media && (
              <img
                src={post.media}
                alt="post"
                className="rounded-md w-full h-auto mt-3"
              />
            )}

            {type === "status" && (
              <span className="text-gray-500 text-sm">{formatDate(post.createdAt)}</span>
            )}

            {/* INTERACTIONS - Clean and Simple */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 sm:space-x-6">
                {/* Like Button */}
                <button
                  onClick={handleLike}
                  disabled={likeLoading[post._id]}
                  className={`flex items-center space-x-1 sm:space-x-2 transition-colors ${
                    post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  } ${likeLoading[post._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs sm:text-sm font-medium">{post.likes || 0} likes</span>
                </button>

                {/* Comment Button */}
                <button
                  onClick={handleComment}
                  className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">{post.comments || 0} comments</span>
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
                {commentLoading[post._id] ? (
                  <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="flex items-start space-x-3">
                      <img
                        src={comment.userId?.avatar || "/general/avatar.png"}
                        alt={comment.userId?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">
                            {comment.userId?.name}
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No comments yet. Be the first to comment!
                  </div>
                )}
              </div>

              {/* Add Comment */}
              <div className="p-4 border-t">
                <form onSubmit={handleAddComment} className="flex items-center space-x-3">
                  <img
                    src={currentUser?.avatar || "/general/avatar.png"}
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
