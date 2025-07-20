import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// IMPORT PAGES
// ------------------------------------------------------------------
import ProfilePage from "./pages/ProfilePage";
import UserPersonalPosts from "./pages/UserPersonalPosts";
// import SettingsAccountPage from "./pages/SettingsAccountPage";
// import SettingsGeneralPage from "./pages/SettingsGeneralPage";
// import NotificationsPage from "./pages/NotificationsPage";
// import Blogs from "./pages/Blogs";
import LoginPage from "./components/authentication/LoginPage";
import SignupPage from "./components/authentication/SignupPage";
import ProtectedRoute from "./components/routeLock/ProtectedRoute";
import Feed from "./components/feed/Feed";
import Post from "./components/post/PostCard";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/" element={<ProtectedRoute><Feed/></ProtectedRoute>}/>

      </Routes>
    </div>
  );
}

export default App;
