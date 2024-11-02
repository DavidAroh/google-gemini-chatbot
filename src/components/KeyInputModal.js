import React, { useState } from 'react';
import '../styles/KeyInputModal.css';

const KeyInputModal = ({ onSubmit }) => {
  const [key, setKey] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  
  const defaultKey = "AIzaSyBMSn4d7qhIG0Bhg-jO5d2ONf73x84miew";  // Define the default key

  const handleSubmit = (useDefault = false) => {
    const apiKey = useDefault ? defaultKey : key.trim();  // Use default key or inputted key
    if (apiKey) {
      onSubmit(apiKey);
      setShowSuccessNotification(true);  // Show notification
      setTimeout(() => setShowSuccessNotification(false), 3000);  // Hide after 3 seconds
    }
  };

  return (
    <>
      {/* Key input modal */}
      <div className="key-input-modal">
        <h2>Enter your Gemini API Key</h2>
        <p className='p1'>
          You need a Gemini API Key to use Horizon Chat UI. <br />
          Your API Key is stored locally on your browser and <br />
          never sent anywhere else.
        </p>
        <div className='input-area'>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
          <button onClick={() => handleSubmit(false)} className='save'>Save</button>
        </div>
        <div className='links'>
          <a href='https://aistudio.google.com/'>Get your API key</a> or <button onClick={() => handleSubmit(true)} className='default'>Use Default key</button>
        </div>
      </div>

      {/* Success notification */}
      {showSuccessNotification && (
        <div className="browser-notification">
          <div className="notification-content">
            <p>API Key saved successfully!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default KeyInputModal;
