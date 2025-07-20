import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Other/FormInput";
import { EmailIcon, LockIcon, UserIcon } from "../Other/Icons";
import { signUpUser } from "../../slices/UserSlice";
import Loader from "../loaders/Loader";

// SignupPage component handles user registration
function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);

  // State to store form validation errors
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    setError(null); 
    
    let errors = {};

    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setError(errors);

    // Stops the Func if there are validation errors
    if (Object.keys(errors).length > 0) return;
    
    try {
      // Send signup data to backend API through Redux action
      const res = await dispatch(signUpUser(formData));

      // If successful, it will update the currentUser state in UserSlice
      if(signUpUser.fulfilled.match(res)){
          console.log("Signup Success:", res.payload);
          // Redirect to login page after successful signup
          navigate("/login"); 
      }else{
          // signUpUser Promise Rejected
          alert(res.error?.message || "Signup failed");
      }
    } catch (err) {
      // Handle signup errors 
      console.error("Signup Failed:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
    {loading && <div className="w-12/12 h-12/12 fixed top-0 left-0 z-50 bg-white opacity-90 flex justify-center items-center">
      <Loader/>
    </div>}
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
                error={error.firstName}
                value={formData.firstName}
                onChange={handleChange}
                icon={<UserIcon />}
              />
              <FormInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                error={error.lastName}
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
              error={error.username}
              value={formData.username}
              onChange={handleChange}
              icon={<EmailIcon />}
            />

            {/* Email field */}
            <FormInput
              type="email"
              name="email"
              placeholder="Enter Email"
              error={error.email}
              value={formData.email}
              onChange={handleChange}
              icon={<EmailIcon />}
            />

            {/* Password field */}
            <FormInput
              type="password"
              name="password"
              placeholder="Create Password"
              error={error.password}
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
              error={error.confirmPassword}
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
    </>
  );
}

export default SignupPage;
