import React from "react";

const options = [
  "Account Privacy (Public/Private)",
  "Story Privacy",
  "Who Can Message Me",
  "Who Can Tag Me",
  "Who Can See My Activity",
  "Hide Active Status",
  "Blocked Users",
  "Restricted Accounts",
  "Two-Factor Authentication",
  "Login Activity",
  "Close Friends List"
];

const SettingsPrivacyPage = () => {
  const handleClick = (option) => {
    alert(`You clicked: ${option}`);
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Privacy & Security Settings</h2>
      <ul className="space-y-4">
        {options.map((option) => (
          <li
            key={option}
            className="p-4 bg-white rounded shadow hover:bg-gray-50 cursor-pointer"
            onClick={() => handleClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsPrivacyPage; 