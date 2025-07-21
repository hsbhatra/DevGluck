import express from "express";
import { 
  followUser, 
  unfollowUser, 
  getFollowStatus,
} from "../controllers/followController.js";
import { authenticateToken } from "../middleware/authMiddleware.js"; // Assuming you have auth middleware
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Follow a user
// POST /api/follow/:userId
router.post("/:userId",protect,followUser);

// Unfollow a user  
// DELETE /api/follow/:userId
router.delete("/:userId",protect, unfollowUser);

// Check follow status between current user and target user
// GET /api/follow/:userId/status
router.get("/:userId/status",protect, getFollowStatus);



export default router;