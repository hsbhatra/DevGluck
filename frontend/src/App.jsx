import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Import all pages
// import ProfilePage from "./pages/ProfilePage";
// import UserPersonalPosts from "./pages/UserPersonalPosts";
// import SettingsAccountPage from "./pages/SettingsAccountPage";
// import SettingsGeneralPage from "./pages/SettingsGeneralPage";
// import NotificationsPage from "./pages/NotificationsPage";
// import Blogs from "./pages/Blogs";
import LoginPage from "./components/authentication/LoginPage";
import SignupPage from "./components/authentication/SignUpPage";

// Import components
// import FollowNotification from "./components/notifications/FollowingNotification";

// import Feed from "./components/feed/Feed";
// import Comments from "./components/feed/Comments";
// import FollowersFollowing from "./components/feed/FollowersFollowing";
// import SignUp from './components/authentication/SignUp';


function App() {
  return (
    <div className="App">
      {/* <SignupPage /> */}
      <LoginPage/>
      {/* <NotificationsPage/> */}
      {/* <ProfilePage/> */}
      {/* <SettingsGeneralPage/> */}
      {/* <SettingsAccountPage/> */}
      {/* <UserPersonalPosts/> */}
      {/* <Blog/> */}
    </div>
  );
}

export default App;
