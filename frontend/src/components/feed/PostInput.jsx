import React, { useState } from "react";
import { FiImage } from "react-icons/fi";

const PostInput = () => {
  const [postText, setPostText] = useState("");

  const handlePost = () => {
    console.log("Posted:", postText);
    setPostText("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <textarea
        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
        placeholder="Write something to share..."
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-4">
          {/* Image icon with tooltip */}
          <div className="relative group cursor-pointer">
            <FiImage className="text-xl text-gray-600 group-hover:text-blue-500" />
            <span className="absolute -bottom-6 left-0 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
              Image
            </span>
          </div>
        </div>
        <button
          onClick={handlePost}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostInput;
