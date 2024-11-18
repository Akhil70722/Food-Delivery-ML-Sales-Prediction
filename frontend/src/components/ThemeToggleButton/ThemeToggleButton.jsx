// src/components/ThemeToggleButton/ThemeToggleButton.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext'; // Adjust the path as necessary

const ThemeToggleButton = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme} className="theme-toggle-button">
            {isDarkMode ? '☀️' : '🌙'} {/* Sun for dark mode, moon for light mode */}
        </button>
    );
};

export default ThemeToggleButton;
