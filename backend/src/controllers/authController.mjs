import jwt from "jsonwebtoken";
import { User } from "../models/userModel.mjs";
import { secretMessage } from "../../config.mjs";
import { isValidEmail, isValidStrongPassword } from "../utils/validators.mjs";

// Generate JWT token for authenticated user
const generateToken = (userId) =>
  jwt.sign({ id: userId }, secretMessage, {
    expiresIn: "7d",
  });

// --------------------------------------------------------------------
// Controller: Register new user
const registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password, confirmPassword } = req.body;

  try {
    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }

    // Validate strong password
    if (!isValidStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 9 characters and include uppercase, lowercase, number, and special character",
      });
    }

    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Check for existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    // Respond with user info and token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// --------------------------------------------------------------------
// Controller: Login existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Match password with stored hash
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Response with user info and token
    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export { registerUser, loginUser };
