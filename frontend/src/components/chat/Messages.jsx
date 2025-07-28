import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listChat, getMessages, receiveNewMessages, setOnlineUsers, createTempNewChat } from "../../slices/ChatSlice";
import socket from './socket.jsx';
import Search from '../search/Search.jsx';

export default function MessagesUI() {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);
  const loading = useSelector((state) => state.chat.loading);
  const messages = useSelector((state) => state.chat.selectedChatMessages);
  // const [messageUpdateTrigger, setMessageUpdateTrigger] = useState(false);
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const [selected, setSelected] = useState({});
  const user = JSON.parse(localStorage.getItem('currentUser')) || {};
  const [input, setInput] = useState("");
  const eventBound = useRef(false);

  useEffect(() => {
    if (user?.user?._id) {
      if (!socket.connected) {
        socket.connect();
        console.log("Socket connected after login")
      }
      console.log("Inital Message Load: ", user.user._id);
      dispatch(listChat());
      socket.emit("registerUser", user.user._id);
    }
  }, []); // initial load only

  // useEffect(() => {
  //   if (messageUpdateTrigger) {
  //     dispatch(listChat());
  //     setMessageUpdateTrigger(false);
  //   }
  // }, [messages])

  useEffect(() => {
    console.log("SSelected: ", selected);
  }, [selected]);

  useEffect(() => {
    if (!user?.user?._id) return;

    // socket.emit("setup", user?.user?._id);
    // socket.on("registerUser", (userId) => {
    //   if (!userSocketMap[userId]) {
    //     userSocketMap[userId] = [];
    //   }
    //   if (!userSocketMap[userId].includes(socket.id)) {
    //     userSocketMap[userId].push(socket.id);
    //     console.log(`User ${userId} registered with socket ${socket.id}`);
    //   }
    //   io.emit("getOnlineUsers", Object.keys(userSocketMap));
    // });

    socket.on('receiveMessage', (message) => {
      console.log(message, "msg2");
      dispatch(receiveNewMessages(message));
      dispatch(listChat());
      // messageUpdateTrigger(true);
    });

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    console.log("msg3");
    return () => {
      socket.off("receiveMessage");
      socket.off("getOnlineUsers");
    };
  }, []);


  const handleChatSelect = async (contact) => {
    console.log(contact);
    dispatch(getMessages(contact.recipientId));
    setSelected(contact)
  }

  const handleTempChatSelect = async (user) => {
    dispatch(createTempNewChat(user));
    dispatch(getMessages(user._id));
    setSelected(user);
  }

  const handleChange = (e) => {
    e.preventDefault();
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Prevent sending empty messages

    const currentUserId = user?.user?._id;
    const selectedUserId = selected?.recipientId || selected?._id;

    const messageData = {
      senderId: currentUserId,
      receiverId: selectedUserId,
      message: input,
    }

    console.log("Message sent:", messageData);

    socket.emit('sendMessage', messageData);
    // setMessageUpdateTrigger(true);

    // dispatch(receiveNewMessages(messageData));

    setInput("");

  }

  return (
    <div className="flex h-screen border border-gray-200 rounded-lg overflow-hidden shadow-sm font-sans">
      {/* Sidebar */}
      <div className="w-20 sm:w-1/3 border-r border-gray-200 flex flex-col items-center sm:items-stretch">
        <div className="p-2 sm:p-4 font-bold text-lg border-b border-gray-200 hidden sm:block">
          Messages
        </div>
        <Search handleSelect={handleTempChatSelect}></Search>
        <div className="flex-1 overflow-auto w-full">
          {chatList.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 cursor-pointer hover:bg-gray-100 transition-colors ${selected.id === contact.id ? "bg-gray-100" : ""
                }`}
              onClick={() => { handleChatSelect(contact) }}
            >
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mx-auto sm:mx-0 flex-shrink-0"
              />

              {/* Hide name & message on mobile */}
              <div className="hidden sm:block min-w-0 flex-1">
                <div className="font-semibold text-sm truncate">{contact.username}</div>
                <div className="text-xs text-gray-500 truncate">
                  {/* {console.log("Inside: ", contact)} */}
                  {contact.lastMessage || "No messages yet"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {selected?._id || selected?.recipientId ? (
          <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <img
                src={selected.avatar}
                alt={selected.username}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm sm:text-base truncate">{selected.username}</h3>
                <p className="text-xs text-gray-500 truncate">
                  {onlineUsers.includes(selected.recipientId) ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
            <h3 className="font-semibold text-sm sm:text-base text-gray-500">Select a chat to start messaging</h3>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
          {selected?._id || selected?.recipientId ? (
            <div className="space-y-3">
              {messages.length > 0 && messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.senderId === user?.user?._id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md lg:max-w-lg px-3 py-2 rounded-lg text-sm break-words ${message.senderId === user?.user?._id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <p className="text-sm sm:text-base">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        {(selected?._id || selected?.recipientId) && (
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
            <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${input.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
