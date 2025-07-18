import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../Other/FormInput";
import { EmailIcon, LockIcon } from "../Other/Icons";
import axiosInstance from "../../api/axiosInstance";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/login", formData);
      console.log("Login success", res.data);

      // Save token/user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); // Redirect to home page after login
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
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
              icon={<EmailIcon />}
              value={formData.email}
              onChange={handleChange}
            />

            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              showPasswordToggle={true}
              icon={<LockIcon />}
              value={formData.password}
              onChange={handleChange}
            />

            {error && (
              <p className="text-sm text-red-600 text-center font-medium">{error}</p>
            )}

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
  );
};

export default LoginPage;
