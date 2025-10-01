import React, { useState, useEffect, useRef } from 'react';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import KeyInputModal from './components/KeyInputModal';
import './styles/App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [showModal, setShowModal] = useState(true);
  
  const defaultKey = "AIzaSyDgfUQfBiJ2RoPrYdhwOjgkGf4iCs1v024"; // Replace with default key

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const handleKeySubmit = (userKey) => {
    setGeminiKey(userKey || defaultKey);
    setShowModal(false);
  };

  return (
    <div className="app-container">
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="main-content">
        <ChatWindow geminiKey={geminiKey} />
      </div>
      {showModal && <KeyInputModal onSubmit={handleKeySubmit} />}
    </div>
  );
};

export default App;
