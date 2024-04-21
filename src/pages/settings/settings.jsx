import React, { useState } from 'react';
import styles from './settings.module.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = ['Deutsch', 'English', 'Français', 'العربية'];
  const mode=['dark mode ','light mode']

  const handleModeChange = (event) => {
    setDarkMode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className={styles.settingPage}>
      <div className={styles.settings}>
        <div className="appearance">
          <label>Appearance: </label>
          <select value={mode} onChange={handleModeChange}>
            {mode.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.element}>
          <label>Language:</label>
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
         
        </div>
      </div>
      {/* Rest of your app components */}
    </div>
  );
}

export default App;
