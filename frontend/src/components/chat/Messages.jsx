import React, { useState } from "react";

const contacts = [
  {
    id: 1,
    name: "Bessie Cooper",
    message: "Hi, Robert. I'm facing some chall ...",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Thomas Baker",
    message: "I have a job interview coming up ...",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Daniel Brown",
    message: "Not much, just planning to relax ...",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 4,
    name: "Ronald Richards",
    message: "I'm stuck on this bug in the code ...",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
];

export default function MessagesUI() {
  const [selected, setSelected] = useState(contacts[0]);

  return (
    <div className="flex h-screen border border-gray-200 rounded-lg overflow-hidden shadow-sm font-sans">
      {/* Sidebar */}
      <div className="w-20 sm:w-1/3 border-r border-gray-200 flex flex-col items-center sm:items-stretch">
        <div className="p-4 font-bold text-lg border-b border-gray-200 hidden sm:block">
          Messages
        </div>
        <div className="flex-1 overflow-auto w-full">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
                selected.id === contact.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelected(contact)}
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
                  {contact.message}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Hide New Message button on mobile */}
        <button className="m-3 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm hidden sm:block">
          New Message
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              src={selected.avatar}
              alt={selected.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold">{selected.name}</div>
              <div className="text-xs text-gray-500">Marketing Manager</div>
            </div>
          </div>
          <div className="text-sm text-gray-500">Online</div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-auto bg-gray-50">
          {/* Incoming */}
          <div className="flex items-start gap-3 mb-4">
            <img
              src={selected.avatar}
              alt={selected.name}
              className="w-8 h-8 rounded-full object-cover mt-1"
            />
            <div className="bg-white p-3 rounded-lg shadow-sm max-w-[70%] border border-gray-100">
              <p className="text-gray-800 text-sm">
                Hi, Robert. I’m facing some challenges in optimizing my code for
                performance. Can you help?
              </p>
              <div className="text-xs text-gray-400 mt-1">12:45 PM</div>
            </div>
          </div>

          {/* Outgoing */}
          <div className="flex items-start gap-3 justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-lg shadow-sm max-w-[70%]">
              <p className="text-sm">
                Hi, Bessie 👋 I’d be glad to help you with optimizing your code
                for better performance. To get started, could you provide me
                with some more details about the specific challenges you’re
                facing?
              </p>
              <div className="text-xs text-blue-200 mt-1 text-right">12:55 PM</div>
            </div>
            <img
              src="https://i.pravatar.cc/40?img=5"
              alt="You"
              className="w-8 h-8 rounded-full object-cover mt-1"
            />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 flex items-center">
          <input
            type="text"
            placeholder="Message ..."
            className="flex-1 border border-gray-300 rounded-lg p-2 outline-none text-sm"
          />
          <button
            className="ml-2 p-3 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300"
            title="Send"
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
      </div>
    </div>
  );
}
