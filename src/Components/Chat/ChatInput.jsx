import React from 'react';
import { SendIcon } from './icons';

const ChatInput = ({ value, onChange, onSend, isLoading, placeholder = "Type a message..." }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      onSend();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={value}
        placeholder={isLoading ? 'Please wait for response...' : placeholder}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <button onClick={onSend} className="send-btn" disabled={isLoading}>
        <SendIcon size={20} color="#006cfc" />
      </button>
    </div>
  );
};

export default ChatInput;
