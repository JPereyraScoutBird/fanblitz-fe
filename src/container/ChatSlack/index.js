import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './style.css'; 


const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [message, setMessage] = useState(''); 
  const [messages, setMessages] = useState([]); 

  useEffect(() => {
    setMessages([...messages]);
  }, []);

  const sendMessage = async () => {
    try {
      await axios.post('YOUR_AWS_API_URL', {
        text: message,
        channelId: 'YOUR_SLACK_CHANNEL_ID', 
      });

      setMessages([...messages, message]);
      setMessage(''); 
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <button 
        className="floating-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'X' : 'Chat'}
      </button>

      {isOpen && (
        <div className="chat-interface">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </div>
          <div className="chat-input">
            <input 
              type="text" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;