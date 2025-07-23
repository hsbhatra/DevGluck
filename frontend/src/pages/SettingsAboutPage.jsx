import React from "react";

const options = [
  "Terms of Service",
  "Privacy Policy",
  "Community Guidelines",
  "Open Source Libraries",
  "App Version",
  "Rate Us"
];

const SettingsAboutPage = () => {
  const handleClick = (option) => {
    alert(`You clicked: ${option}`);
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">About</h2>
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

export default SettingsAboutPage; 