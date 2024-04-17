//React component
import './setting.css'
import React, { useState } from 'react';

const Setting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  return (
    <div className="settings-container">
      <label style={{fontSize : "25px"}}>Appearence:</label>  
      <div className="setting-item">
      
        <label htmlFor="dark-mode-toggle">Dark mode</label>
        <input
          id="dark-mode-toggle"
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>
      <div className="setting-item">
        <label htmlFor="language-select">Language :</label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="Deutsch">Deutsch</option>
          <option value="English">English</option>
          <option value="Français">Français</option>
          <option value="русский">русский</option>
          <option value="العربية">العربية</option>
        </select>
      </div>
    </div>
  );
};

export default Setting;