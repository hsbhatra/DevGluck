import { User } from "../models/userModel.mjs";

// --------------------------------------------------------------------
// Controller: Deactivate User Account (temporary deactivation)
export const deactivateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required to deactivate account" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: "Account deactivated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Deactivation failed", error: err.message });
  }
};

// --------------------------------------------------------------------
// Controller: Soft Delete User (mark isDeleted true for permanent deletion of account after verifying password)
export const softDeleteUser = async (req, res) => {
  const userId = req.user._id;
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ message: "Password is required to delete account" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Password match check
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Soft delete user
    user.isDeleted = true;
    user.isActive = false; // Ensure account is inactive
    await user.save();

    return res.json({ message: "User account soft-deleted successfully" });
  } catch (err) {
    console.error("Soft delete error:", err);
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
};
