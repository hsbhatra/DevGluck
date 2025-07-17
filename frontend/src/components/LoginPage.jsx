import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./Other/FormInput";
import { EmailIcon, LockIcon } from "./Other/Icons";

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex flex-col lg:flex-row flex-grow items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Welcome Back
          </h2>

          <form className="space-y-6">
            <FormInput
              type="email"
              name="email"
              placeholder="Email"
              icon={<EmailIcon />}
            />

            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              showPasswordToggle={true}
              icon={<LockIcon />}
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
  );
};

export default LoginPage;
