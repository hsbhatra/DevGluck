import express from "express";
import authRoutes from "./authRoutes.mjs";
import userRoutes from "./userRoutes.mjs";
import notificationRoutes from "./notificationRoutes.mjs";
// Importing the protect middleware to secure routes
// import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/notifications", notificationRoutes);
router.use("/users", userRoutes);

// -----------------------------------------------------------

// Temporary route for testing purposes:
// This route will only be accessible if the user is authenticated (checks user is authenticated/loggedIn or not).
// Uncomment the below given route to test protect middleware.

// router.get("/test-protected", protect, (req, res) => {
//   res.json({
//     message: "Access granted",
//     user: req.user
//   });
// });

// NOTE:
// Use protect middleware to secure access to the other routes for logged in users only.

// -----------------------------------------------------------

export default router;
