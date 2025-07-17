import { useState } from 'react'
import React from "react";

import './App.css'
import ProfilePage from './pages/ProfilePage';
import UserProfileHeader from './components/profile/UserProfileHeader';
import UserPersonalPosts from './pages/UserPersonalPosts'
import SettingsAccountPage from './pages/SettingsAccountPage';
import SettingsGeneralPage from './pages/SettingsGeneralPage';
import FollowNotification from './components/notifications/FollowingNotification';
import NotificationsPage from './pages/NotificationsPage';
function App() {
  return (
    <>
     {/* <ProfilePage/> */}
     {/* <UserPersonalPosts/> */}
     {/* <SettingsAccountPage/> */}
     {/* <SettingsGeneralPage/> */}
     {/* <FollowNotification/> */}
     <NotificationsPage/>
    </>
  )
}

export default App
