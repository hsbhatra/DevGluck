import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// IMPORT PAGES
// ------------------------------------------------------------------
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import SettingsAccountPage from "./pages/SettingsAccountPage";
import SettingsNotificationsPage from "./pages/SettingsNotificationsPage";
import SettingsAppearancePage from "./pages/SettingsAppearancePage";
import SettingsPrivacyPage from "./pages/SettingsPrivacyPage";
import SettingsHelpPage from "./pages/SettingsHelpPage";
import SettingsAboutPage from "./pages/SettingsAboutPage";
import EditProfilePage from "./pages/EditProfilePage";

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
import NotificationsPage from "./pages/NotificationsPage";
//import FollowUnfollowPage from "./pages/FollowUnfollowPage";
import { ProfileProvider } from "./profileContext.jsx";
import SavedPostsPage from "./pages/SavedPostsPage";




function App() {
  return (
    <div className="App">
      <Routes>
        {/* Default route - redirect to feed */}
        <Route path="/" element={<Feed />} />
        
        {/* Authentication routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Main app routes */}
        <Route path="/feed" element={<Feed />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/saved-posts" element={<SavedPostsPage />} />
        
        {/* Settings routes */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/account" element={<SettingsAccountPage />} />
        <Route path="/settings/notifications" element={<SettingsNotificationsPage />} />
        <Route path="/settings/appearance" element={<SettingsAppearancePage />} />
        <Route path="/settings/privacy" element={<SettingsPrivacyPage />} />
        <Route path="/settings/help" element={<SettingsHelpPage />} />
        <Route path="/settings/about" element={<SettingsAboutPage />} />
        
        {/* Catch all route - redirect to feed */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
