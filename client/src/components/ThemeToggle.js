import { useEffect, useState } from "react";
import "../styles/themeToggle.css";

function ThemeToggle() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";

    setDarkMode(savedTheme);

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme ? "dark" : "light"
    );
  }, []);

  const toggleTheme = () => {

    const newMode = !darkMode;
    setDarkMode(newMode);

    document.documentElement.setAttribute(
      "data-theme",
      newMode ? "dark" : "light"
    );

    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div className="theme-switch" onClick={toggleTheme}>
      <div className={`switch-circle ${darkMode ? "dark" : ""}`} />
    </div>
  );
}

export default ThemeToggle;
