import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice.js';
import chatReducer from './slices/ChatSlice.js';
// import socketReducer from './slices/SocketSlice.js';

const store = configureStore({
    reducer: {
        users: userReducer,
        chat: chatReducer,
        // socket: socketReducer,
    }
});



export default store;