import express from "express";
import { 
  followUser, 
  unfollowUser, 
  getFollowStatus,
} from "../controllers/followController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Follow a user
// POST /{base-api}/follow/:userId
router.post("/:userId", protect, followUser);

// Unfollow a user  
// DELETE /{base-api}/follow/:userId
router.delete("/:userId", protect, unfollowUser);

// Check follow status between current user and target user
// GET /{base-api}/follow/:userId/status
router.get("/status/:userId", protect, getFollowStatus);



export default router;