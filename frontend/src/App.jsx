import { useState } from 'react'
import React from "react"; // 👈 Required for JSX unless you're using automatic JSX runtime

import './App.css'
import LoginPage from './components/LoginPage';
import SignupPage from './components/authentication/SignupPage';
import UserProfileHeader from './components/profile/UserProfileHeader';
import CreatePostCard from './components/post/CreatePostCard';
import PostCard from './components/post/PostCard';
import MessageCard from './components/chat/MessageCard';
import MessageInput from './components/chat/MessageInput';
import MobileNavbar from './components/MobileNavbar';
import DesktopNavbar from './components/DesktopNavbar';
import FollowNotification from './components/notifications/FollowingNotification';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div >
      {/* {/* <MessageCard/> */}
      {/* <UserProfileHeader/>  */}
      {/* <CreatePostCard/> */}
      {/* <PostCard/> */}
     {/* <MessageInput/> */}
     {/* <MobileNavbar/> */}
     {/* <DesktopNavbar/>  */}
      {/* <FollowNotification/> */}
     </div>
    </>
  )
}

export default App
