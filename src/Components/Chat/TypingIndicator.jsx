import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="message bot">
      <div className="message-content typing-indicator">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
