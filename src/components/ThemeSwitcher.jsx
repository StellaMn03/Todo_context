import { useState } from "react";

export const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 text-sm font-semibold rounded-lg shadow-md focus:outline-none transition-all duration-300
        bg-indigo-500 text-white hover:bg-indigo-700 dark:bg-yellow-300 dark:text-black dark:hover:bg-yellow-500"
    >
      {isDarkMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
};
