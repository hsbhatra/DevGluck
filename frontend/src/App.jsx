import { useState } from 'react'
import React from "react";

import './App.css'
import ProfilePage from './pages/ProfilePage';
import UserProfileHeader from './components/profile/UserProfileHeader';
import UserPersonalPosts from './pages/UserPersonalPosts'
import SettingsAccountPage from './pages/SettingsAccountPage';
import SettingsGeneralPage from './pages/SettingsGeneralPage';
function App() {
  return (
    <>
     {/* <ProfilePage/> */}
     {/* <UserPersonalPosts/> */}
     {/* <SettingsAccountPage/> */}
     <SettingsGeneralPage/>
    </>
  )
}

export default App
