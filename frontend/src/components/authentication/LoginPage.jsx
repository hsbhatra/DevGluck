import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../Other/FormInput";
import { EmailIcon, LockIcon } from "../Other/Icons";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../slices/UserSlice";
import Loader from "../loaders/Loader";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.users.loading);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    let errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    setError(errors);

    if(Object.keys(errors).length > 0) return;

    try {
      const res = await dispatch(signInUser(formData));
      if (signInUser.fulfilled.match(res)) {
        console.log("Login Success:", res.payload);
        // Redirect to home page after successful login
        navigate("/");
      } else {
        // signInUser Promise Rejected
        alert(res.error?.message || "Login failed");
      }
      navigate("/"); // Redirect to home page after login
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
    {loading && <div className="w-12/12 h-12/12 fixed top-0 left-0 z-50 bg-white opacity-90 flex justify-center items-center">
      <Loader/>
    </div>}
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex flex-col lg:flex-row flex-grow items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Welcome Back
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              error={error.email}
              icon={<EmailIcon />}
              value={formData.email}
              onChange={handleChange}
            />

            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              error={error.password}
              showPasswordToggle={true}
              icon={<LockIcon />}
              value={formData.password}
              onChange={handleChange}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            >
              Sign in
            </button>

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
