import React, { useState } from "react";
import { Link } from "react-router-dom";
import PostInteractions from "./PostInteractions";
import Comments from "./Comments";
import SharePopup from "./SharePopUp";


const Post = ({ type }) => {
  // ✅ states for interactions
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(120);
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // ✅ handlers
  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (

    <>
    
      <div className="p-4 border-y border-gray-300 bg-white">
        {/* POST TYPE (Reposted info) */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="#71767b"
              d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
            />
          </svg>
          <span>Aniket Dev reposted</span>
        </div>

        {/* POST CONTENT */}
        <div className={`flex gap-4 ${type === "status" ? "flex-col" : ""}`}>
          {/* AVATAR */}
          {type !== "status" && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/general/avatar.png"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* CONTENT */}
          <div className="flex-1 flex flex-col gap-2">
            {/* TOP */}
            <div className="w-full flex justify-between">
              <Link to="/AniketWebDev" className="flex gap-4">
                {type === "status" && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src="/general/avatar.png"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`flex items-center gap-2 flex-wrap ${
                    type === "status" ? "flex-col gap-0 items-start" : ""
                  }`}
                >
                  <h1 className="text-md font-bold">Aniket Dev</h1>
                  <span
                    className={`text-gray-500 ${
                      type === "status" ? "text-sm" : ""
                    }`}
                  >
                    @AniketWebDev
                  </span>
                  {type !== "status" && (
                    <span className="text-gray-500">1 day ago</span>
                  )}
                </div>
              </Link>

              {/* three dots or info icon */}
              <button className="text-gray-500 hover:text-black">⋯</button>
            </div>

            {/* TEXT & MEDIA */}
            <Link to="/AniketWebDev/status/123">
              <p className={`${type === "status" ? "text-lg" : ""}`}>
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
              className="rounded-md max-w-full"
            />

            {type === "status" && (
              <span className="text-gray-500 text-sm">8:41 PM · Dec 5, 2024</span>
            )}

            {/* INTERACTIONS */}
            <PostInteractions
              onCommentClick={() => setShowComments((prev) => !prev)}
              onLikeClick={handleLike}
              likeCount={likes}
              liked={liked}
              onShareClick={() => setShowShare(true)}
            />

            {/* COMMENTS SECTION */}
            {showComments && <Comments />}
          </div>
        </div>
      </div>

      {/* SHARE POPUP */}
      {showShare && <SharePopup onClose={() => setShowShare(false)} />}
    </> 
    
  );
};

export default Post;
