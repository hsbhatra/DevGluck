import { Post } from "../models/postModel.mjs";
import { Like } from "../models/likeModel.mjs";
import { Comment } from "../models/commentModel.mjs";

// Create a new post
export const addNewPost = async (req, res) => {
  try {
    const { content, media } = req.body;
    const author = req.user._id;
    if (!content && !media) {
      return res.status(400).json({ message: "Post content or media required." });
    }
    const post = await Post.create({
      author,
      content,
      media: media || "https://via.placeholder.com/500x300",
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName avatar username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
};

// Get all posts by a user
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const posts = await Post.find({ author: userId, isDeleted: false })
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName avatar username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user posts", error: err.message });
  }
};

// Delete a post (soft delete)
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      return res.status(404).json({ message: "Post not found." });
    }
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post." });
    }
    post.isDeleted = true;
    await post.save();
    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
};

// Like or unlike a post
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      return res.status(404).json({ message: "Post not found." });
    }
    const existingLike = await Like.findOne({ userId, refId: postId, refType: "Post" });
    if (existingLike) {
      // Unlike
      await existingLike.deleteOne();
      post.likes = Math.max(0, post.likes - 1);
      await post.save();
      return res.json({ liked: false, likes: post.likes });
    } else {
      // Like
      await Like.create({ userId, refId: postId, refType: "Post" });
      post.likes += 1;
      await post.save();
      return res.json({ liked: true, likes: post.likes });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to like/unlike post", error: err.message });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Comment text required." });
    }
    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      return res.status(404).json({ message: "Post not found." });
    }
    const comment = await Comment.create({ postId, userId, text });
    post.comments += 1;
    await post.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

// Get all comments for a post
export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId, isDeleted: false })
      .sort({ createdAt: 1 })
      .populate("userId", "firstName lastName avatar username");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments", error: err.message });
  }
};
