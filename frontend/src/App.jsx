// import { useState } from 'react'
import React from "react";

import './App.css'
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UserProfileHeader from './components/UserProfileHeader';
import CreatePostCard from './components/CreatePostCard';
import PostCard from './components/PostCard';
import MessageCard from './components/MessageCard';
import MessageInput from './components/MessageInput';
import MobileNavbar from './components/MobileNavbar';
import DesktopNavbar from './components/DesktopNavbar';
import FollowNotification from './components/FollowingNotification';
import Blog from './pages/Blogs'
import Status from './components/status/Status';
import StatusCard from './components/status/StatusCard';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
    {/* <div > */}
      {/* <MessageCard/>
      <UserProfileHeader/>  
      <CreatePostCard/> 
      <PostCard/> 
      <MessageInput/> 
      <MobileNavbar/> 
      <DesktopNavbar/>  
      <FollowNotification/>  */}
      {/* <Blog/> */}
      {/* <Status /> */}
      
     {/* </div> */}
     {/* <StatusCard /> */}
     <Status />
    </>
  )
}

export default App
