import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { listChat, getMessages, receiveNewMessages, setOnlineUsers } from "../../slices/ChatSlice";
import socket from './socket.jsx';

export default function MessagesUI() {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);
  const loading = useSelector((state) => state.chat.loading);
  const messages = useSelector((state) => state.chat.selectedChatMessages);
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const [selected, setSelected] = useState({});
  const user = JSON.parse(localStorage.getItem('currentUser')) || {};
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(listChat());
  }, [messages])

  useEffect(() => {
    console.log("msg1");
    socket.on('receiveMessage', (message) => {
      console.log(message, "msg2");
      dispatch(receiveNewMessages(message));
    });

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    console.log("msg3");
    return () => {
      socket.off("recieveMessage");
      socket.off("getOnlineUsers");
    };
  }, [dispatch]);

  const handleChatSelect = async (contact) => {
    dispatch(getMessages(contact.recipientId));
    setSelected(contact)
  }

  const handleChange = (e) => {
    e.preventDefault();
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Prevent sending empty messages

    const currentUserId = user?.user?._id;
    const selectedUserId = selected?.recipientId;

    const messageData = {
      senderId: currentUserId,
      receiverId: selectedUserId,
      message: input,
    }

    console.log("Message sent:", messageData);

    socket.emit('sendMessage', messageData);

    // dispatch(receiveNewMessages(messageData));

    setInput("");

  }

  return (
    <motion.div 
      className="flex h-screen border border-gray-200 rounded-lg overflow-hidden shadow-sm font-sans"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Sidebar */}
      <motion.div 
        className="w-20 sm:w-1/3 border-r border-gray-200 flex flex-col items-center sm:items-stretch"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div 
          className="p-2 sm:p-4 font-bold text-lg border-b border-gray-200 hidden sm:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Messages
        </motion.div>
        <div className="flex-1 overflow-auto w-full">
          <AnimatePresence>
            {chatList.map((contact, index) => (
              <motion.div
                key={contact.id}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                  selected.id === contact.id ? "bg-gray-100" : ""
                }`}
                onClick={() => { handleChatSelect(contact) }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.3 + (index * 0.1),
                  ease: "easeOut"
                }}
                whileHover={{ 
                  backgroundColor: "#f3f4f6",
                  x: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover mx-auto sm:mx-0 flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Hide name & message on mobile */}
                <div className="hidden sm:block min-w-0 flex-1">
                  <div className="font-semibold text-sm truncate">{contact.name}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {/* {console.log("Inside: ", contact)} */}
                    {contact.lastMessage || "No messages yet"}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Chat Area */}
      <motion.div 
        className="flex-1 flex flex-col"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Chat Header */}
        <AnimatePresence mode="wait">
          {selected.id ? (
            <motion.div 
              key="selected-chat"
              className="p-3 sm:p-4 border-b border-gray-200 bg-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <motion.img
                  src={selected.avatar}
                  alt={selected.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base truncate">{selected.name}</h3>
                  <p className="text-xs text-gray-500 truncate">
                    {onlineUsers.includes(selected.recipientId) ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="no-chat"
              className="p-3 sm:p-4 border-b border-gray-200 bg-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold text-sm sm:text-base text-gray-500">Select a chat to start messaging</h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
          <AnimatePresence>
            {selected.id ? (
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${message.senderId === user?.user?._id ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <motion.div
                      className={`max-w-xs sm:max-w-md lg:max-w-lg px-3 py-2 rounded-lg text-sm break-words ${
                        message.senderId === user?.user?._id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {message.message}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center text-gray-500">
                  <p className="text-sm sm:text-base">Choose a conversation to start messaging</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Message Input */}
        <AnimatePresence>
          {selected.id && (
            <motion.div 
              className="p-3 sm:p-4 border-t border-gray-200 bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
                <motion.input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim()}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    input.trim()
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={input.trim() ? { scale: 1.05 } : {}}
                  whileTap={input.trim() ? { scale: 0.95 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  Send
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
