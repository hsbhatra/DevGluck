import { Follow } from "../models/followModel.js";
import { User } from "../models/userModel.js";
import mongoose from "mongoose";

// Follow a user
export const followUser = async (req, res) => {
  try {
    const { userId } = req.params; // User to follow
    const followerId = req.user.id; // Current authenticated user

    // Validation checks
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_USER_ID",
        message: "Invalid user ID format"
      });
    }

    if (followerId === userId) {
      return res.status(400).json({
        success: false,
        error: "INVALID_OPERATION",
        message: "You cannot follow yourself"
      });
    }

    // Check if user to follow exists and is active
    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        error: "USER_NOT_FOUND",
        message: "User does not exist"
      });
    }

    // Check if user is active and not deleted
    if (!userToFollow.isActive || userToFollow.isDeleted) {
      return res.status(400).json({
        success: false,
        error: "USER_UNAVAILABLE",
        message: "This user account is not available for following"
      });
    }

    // Verify current user is also active and not deleted
    const currentUser = await User.findById(followerId);
    if (!currentUser || !currentUser.isActive || currentUser.isDeleted) {
      return res.status(403).json({
        success: false,
        error: "ACCOUNT_INACTIVE",
        message: "Your account is not active"
      });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: userId
    });

    if (existingFollow) {
      return res.status(409).json({
        success: false,
        error: "ALREADY_FOLLOWING",
        message: "You are already following this user"
      });
    }

    // Create follow relationship
    const follow = new Follow({
      follower: followerId,
      following: userId
    });

    await follow.save();

    res.status(201).json({
      success: true,
      message: "Successfully followed user",
      data: {
        follower_id: followerId,
        following_id: userId,
        followed_at: follow.createdAt,
        user_info: {
          username: userToFollow.username,
          firstName: userToFollow.firstName,
          lastName: userToFollow.lastName,
          avatar: userToFollow.avatar
        }
      }
    });

  } catch (error) {
    console.error("Follow user error:", error);
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while following the user"
    });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params; // User to unfollow
    const followerId = req.user.id; // Current authenticated user

    // Validation checks
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_USER_ID",
        message: "Invalid user ID format"
      });
    }

    // Verify current user is active and not deleted
    const currentUser = await User.findById(followerId);
    if (!currentUser || !currentUser.isActive || currentUser.isDeleted) {
      return res.status(403).json({
        success: false,
        error: "ACCOUNT_INACTIVE",
        message: "Your account is not active"
      });
    }

    // Find and delete the follow relationship
    const follow = await Follow.findOneAndDelete({
      follower: followerId,
      following: userId
    });

    if (!follow) {
      return res.status(400).json({
        success: false,
        error: "NOT_FOLLOWING",
        message: "You are not following this user"
      });
    }

    // Get user info for response (optional, even if user is inactive/deleted)
    const userInfo = await User.findById(userId, 'username firstName lastName avatar');

    res.status(200).json({
      success: true,
      message: "Successfully unfollowed user",
      data: {
        follower_id: followerId,
        unfollowed_id: userId,
        unfollowed_at: new Date(),
        user_info: userInfo ? {
          username: userInfo.username,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          avatar: userInfo.avatar
        } : null
      }
    });

  } catch (error) {
    console.error("Unfollow user error:", error);
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while unfollowing the user"
    });
  }
};

// Check follow status
export const getFollowStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "INVALID_USER_ID",
        message: "Invalid user ID format"
      });
    }

    // Verify current user is active and not deleted
    const currentUser = await User.findById(followerId);
    if (!currentUser || !currentUser.isActive || currentUser.isDeleted) {
      return res.status(403).json({
        success: false,
        error: "ACCOUNT_INACTIVE",
        message: "Your account is not active"
      });
    }

    // Get target user info
    const targetUser = await User.findById(userId, 'username firstName lastName avatar isActive isDeleted');
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        error: "USER_NOT_FOUND",
        message: "User does not exist"
      });
    }

    // Check follow relationship
    const follow = await Follow.findOne({
      follower: followerId,
      following: userId
    });

    res.status(200).json({
      success: true,
      data: {
        is_following: !!follow,
        followed_at: follow ? follow.createdAt : null,
        user_info: {
          username: targetUser.username,
          firstName: targetUser.firstName,
          lastName: targetUser.lastName,
          avatar: targetUser.avatar,
          is_active: targetUser.isActive && !targetUser.isDeleted
        },
        can_follow: targetUser.isActive && !targetUser.isDeleted && followerId !== userId
      }
    });

  } catch (error) {
    console.error("Get follow status error:", error);
    res.status(500).json({
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while checking follow status"
    });
  }
};