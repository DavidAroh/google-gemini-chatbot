import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Google AI SDK
import { FaUserAlt } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import "../styles/ChatWindow.css";

const ChatWindow = ({ geminiKey }) => {
  const [messages, setMessages] = useState([]); // Chat history
  const [input, setInput] = useState(""); // User input field
  const chatEndRef = useRef(null); // For auto-scrolling to the latest message

  // Initialize the Google Generative AI model
  const genAI = new GoogleGenerativeAI(geminiKey); // Create instance with API Key
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]); // Add user's message to chat

    // Call Google Gemini API for a response
    const aiResponse = await fetchGeminiResponse(input);

    const geminiMessage = { sender: "gemini", text: aiResponse };
    setMessages((prev) => [...prev, geminiMessage]); // Add AI's response to chat
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchGeminiResponse = async (message) => {
    try {
      console.log("Sending message to Gemini AI:", message);

      const result = await model.generateContent(message);

      const responseText =
        result?.response?.text ||
        (result?.candidates && result.candidates[0]?.output) ||
        "Sorry, no valid response!";

      console.log("AI Response received:", responseText);

      return responseText;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Error contacting Gemini AI";
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat UI</h2>
      </div>
      <div className="chat-content">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender}`}>
            {msg.sender === "user" ? (
              <div className="user-icon2 icons">
                <FaUserAlt className="message-icon user-icon" />
              </div>
            ) : (
              <div className="ai-icon2 icons">
                <BsStars className="message-icon ai-icon" /> 
              </div>
            )}
            <pre className={`message ${msg.sender}`}>
              <span>{typeof msg.text === "function" ? msg.text() : msg.text}</span>
            </pre>
          </div>
        ))}
        <div ref={chatEndRef} /> 
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Send a message"
        />
        <button onClick={handleSendMessage} disabled={!input.trim()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
