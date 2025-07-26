import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      <main className="pt-16 sm:pt-20 w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout; 