import React from "react";

const options = [
  "Help Center",
  "Report a Problem",
  "Safety Center",
  "Community Guidelines",
  "Contact Us",
  "Accessibility"
];

const SettingsHelpPage = () => {
  const handleClick = (option) => {
    alert(`You clicked: ${option}`);
  };
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Help and Support</h2>
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

export default SettingsHelpPage; 