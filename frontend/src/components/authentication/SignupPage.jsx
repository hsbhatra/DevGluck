import React from "react";
import { Link } from "react-router-dom";
import FormInput from "../Other/FormInput";
import { EmailIcon, LockIcon, UserIcon } from "../Other/Icons";

function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Account</h2>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                type="text"
                name="firstName"
                placeholder="First Name"
                icon={<UserIcon />}
              />
              <FormInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                icon={<UserIcon />}
              />
            </div>

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

            <FormInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              showPasswordToggle={true}
              icon={<LockIcon />}
            />

            <FormInput
              type="text"
              name="otp"
              placeholder="Enter OTP"
            />

            <button
              type="button"
              className="w-full py-3 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              Send OTP
            </button>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition-all"
            >
              Create Account
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
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
