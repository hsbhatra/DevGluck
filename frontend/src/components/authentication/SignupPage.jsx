import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import FormInput from "../Other/FormInput";
import { EmailIcon, LockIcon, UserIcon } from "../Other/Icons";

// SignupPage component handles user registration
function SignupPage() {
  const navigate = useNavigate();

  // State to store form input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update formData state when input fields change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send signup data to backend API
      const res = await axiosInstance.post("/auth/signup", formData);
      console.log("Signup Success:", res.data);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      // Handle signup errors
      console.error("Signup Failed:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Signup failed");  // Show error message in alert popup
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {/* Signup form header */}
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Create Account
          </h2>

          {/* Signup form */}
          <form className="space-y-2" onSubmit={handleSubmit}>
            {/* First and Last Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                icon={<UserIcon />}
              />
              <FormInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                icon={<UserIcon />}
              />
            </div>

            {/* Username field */}
            <FormInput
              type="text"
              name="username"
              placeholder="Create Username"
              value={formData.username}
              onChange={handleChange}
              icon={<EmailIcon />}
            />

            {/* Email field */}
            <FormInput
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              icon={<EmailIcon />}
            />

            {/* Password field */}
            <FormInput
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              showPasswordToggle={true}
              icon={<LockIcon />}
            />

            {/* Confirm Password field */}
            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              showPasswordToggle={true}
              icon={<LockIcon />}
            />

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              Create Account
            </button>

            {/* Link to login page */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
