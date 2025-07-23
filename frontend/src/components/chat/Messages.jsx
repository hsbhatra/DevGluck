import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
    <div className="flex h-screen border border-gray-200 rounded-lg overflow-hidden shadow-sm font-sans">
      {/* Sidebar */}
      <div className="w-20 sm:w-1/3 border-r border-gray-200 flex flex-col items-center sm:items-stretch">
        <div className="p-4 font-bold text-lg border-b border-gray-200 hidden sm:block">
          Messages
        </div>
        <div className="flex-1 overflow-auto w-full">
          {chatList.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${selected.id === contact.id ? "bg-gray-100" : ""
                }`}
              onClick={() => { handleChatSelect(contact) }}
            >

              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover mx-auto sm:mx-0"
              />


              {/* Hide name & message on mobile */}
              <div className="hidden sm:block min-w-0">
                <div className="font-semibold text-sm">{contact.name}</div>
                <div className="text-xs text-gray-500 truncate">
                  {/* {console.log("Inside: ", contact)} */}
                  {contact?.messages || "new message"}
                </div>
              </div>
              <div className="text-xs">
                {
                  onlineUsers.includes(contact.recipientId)
                    ? <span className="text-green-500">Online</span>
                    : <span className="text-gray-500">Offline</span>
                }
              </div>
            </div>
          ))}
        </div>
        {/* Hide New Message button on mobile */}
        <button
          className="m-3 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 
        text-sm hidden sm:block"
        >
          New Message
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {(selected && Object.keys(selected).length > 0) ? <>
          {/* Top bar */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={selected?.avatar}
                alt={selected?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{selected.name}</div>
                <div className="text-xs text-gray-500">Marketing Manager</div>
              </div>
            </div>
            {
              onlineUsers.includes(selected.recipientId)
                ? <div className="text-sm text-green-500">Online</div>
                : <div className="text-sm text-gray-500">Offline</div>
            }

          </div>

          {/* Messages */}

          <div className="flex-1 p-4 overflow-auto bg-gray-50">
            {messages?.map((message, index) => {
              return (
                (message.senderId === user?.user._id) ?
                  <div className="flex items-start gap-3 justify-end" key={index}>
                    <div className="bg-blue-600 text-white p-3 rounded-lg shadow-sm max-w-[70%]">
                      <p className="text-sm">
                        {message.message || "New message sent"}
                      </p>
                      <div className="text-xs text-blue-200 mt-1 text-right">12:55 PM</div>
                    </div>
                    <img
                      src="https://i.pravatar.cc/40?img=5"
                      alt="You"
                      className="w-8 h-8 rounded-full object-cover mt-1"
                    />
                  </div>
                  : <div className="flex items-start gap-3 mb-4" key={index}>
                    <img
                      src={selected.avatar}
                      alt={selected.name}
                      className="w-8 h-8 rounded-full object-cover mt-1"
                    />
                    <div className="bg-white p-3 rounded-lg shadow-sm max-w-[70%] border border-gray-100">
                      <p className="text-gray-800 text-sm">
                        {message.message || "New message received"}
                      </p>
                      <div className="text-xs text-gray-400 mt-1">12:45 PM</div>
                    </div>
                  </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={input}
              placeholder="Message ..."
              className="flex-1 border border-gray-300 rounded-lg p-2 outline-none text-sm"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="ml-2 p-3 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300"
              title="Send"
              onClick={handleSendMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75l16.5 7.5-16.5 7.5 3.75-7.5L3.75 3.75zM10.5 12h9.75"
                />
              </svg>
            </button>

          </div>
        </>
          : <></>}
      </div>
    </div>
  );
}
