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
import Blogs from "./pages/Blogs";
import LoginPage from "./components/authentication/LoginPage";
import SignupPage from "./components/authentication/SignupPage";
import ProtectedRoute from "./components/routeLock/ProtectedRoute";
import Feed from "./components/feed/Feed";
import Post from "./components/post/PostCard";
import NotificationsPage from "./pages/NotificationsPage";
import FollowUnfollow from "./pages/FollowUnfollow";
import ChatPage from "./components/chat/ChatPage";
import Layout from "./components/Layout";


function App() {

  return (
    <div className="App">
      <Routes>
        {/* Authentication routes - no navbar */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes with navbar */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Feed />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Layout>
              <NotificationsPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/messages" element={
          <ProtectedRoute>
            <Layout>
              <ChatPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <Layout>
              <SettingsPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings/account" element={
          <ProtectedRoute>
            <Layout>
              <SettingsAccountPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings/notifications" element={
          <ProtectedRoute>
            <Layout>
              <SettingsNotificationsPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings/appearance" element={
          <ProtectedRoute>
            <Layout>
              <SettingsAppearancePage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings/privacy" element={
          <ProtectedRoute>
            <Layout>
              <SettingsPrivacyPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings/help" element={
          <ProtectedRoute>
            <Layout>
              <SettingsHelpPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings/about" element={
          <ProtectedRoute>
            <Layout>
              <SettingsAboutPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/blogs" element={
          <ProtectedRoute>
            <Layout>
              <Blogs />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* <Route path="/follow" element={<FollowUnfollow />}/>  */}
      </Routes>
    </div>
  );
}

export default App;
