import { useState } from 'react'
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

import Feed from './components/feed/Feed';
import Comments from './components/feed/Comments';
import FollowersFollowing from './components/feed/FollowersFollowing';
import Messages from './components/chat/Messages';

import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
function App() {
  // const [count, setCount] = useState(0);
  // const { user } = useSelector(store => store.auth);
  // const { socket } = useSelector(store => store.socketio);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user) {
  //     const socketio = io('http://localhost:8000', {
  //       query: {
  //         userId: user?._id
  //       },
  //       transports: ['websocket']
  //     });
  //     dispatch(setSocket(socketio));

  //     // listen all the events
  //     socketio.on('getOnlineUsers', (onlineUsers) => {
  //       dispatch(setOnlineUsers(onlineUsers));
  //     });


  //     return () => {
  //       socketio.close();
  //       dispatch(setSocket(null));
  //     }
  //   } else if (socket) {
  //     socket.close();
  //     dispatch(setSocket(null));
  //   }
  // }, [user, dispatch]);

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
      {/* <Comments/> */}
      
      {/* <Feed/>  */}
      {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <FollowersFollowing />
    </div> */}
     </div>
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
     {/* <Status /> */}
     {/* <Messages /> */}
    
    </>
  )
}

export default App
