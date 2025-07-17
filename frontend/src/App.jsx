import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

// Import all pages
import ProfilePage from './pages/ProfilePage';
import UserPersonalPosts from './pages/UserPersonalPosts';
import SettingsAccountPage from './pages/SettingsAccountPage';
import SettingsGeneralPage from './pages/SettingsGeneralPage';
import NotificationsPage from './pages/NotificationsPage';
import Blogs from './pages/Blogs';

// Import components
import FollowNotification from './components/notifications/FollowingNotification';

function App() {
  return (
    <div className="App">
    
  <NotificationsPage/>
  {/* <ProfilePage/> */}
    </div>
  )
}

export default App
