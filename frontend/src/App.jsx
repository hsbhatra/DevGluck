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



function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/signup" element={<SignupPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/" element={<ProtectedRoute><Feed/></ProtectedRoute>}/>
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} /> */}
        {/* <Route path="/profile" element={<ProfilePage />}/> */}
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/account" element={<SettingsAccountPage />} />
        <Route path="/settings/notifications" element={<SettingsNotificationsPage />} />
        <Route path="/settings/appearance" element={<SettingsAppearancePage />} />
        <Route path="/settings/privacy" element={<SettingsPrivacyPage />} />
        <Route path="/settings/help" element={<SettingsHelpPage />} />
        <Route path="/settings/about" element={<SettingsAboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* <Route path="/follow" element={<FollowUnfollowPage />}/>  */}
      </Routes>
      
    </div>
  );
}

export default App;
