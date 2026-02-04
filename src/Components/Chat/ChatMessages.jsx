import React, { useRef, useEffect } from 'react';
import OptionButtons from './OptionButtons';
import TypingIndicator from './TypingIndicator';

const ChatMessages = ({ messages, streamingMessage, isTyping, onOptionClick }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  const renderMessageText = (text) => {
    return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
      part.match(/https?:\/\//) ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-link"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
        >
          <div className="message-content">
            <span>{renderMessageText(msg.text)}</span>
            {msg.options && (
              <OptionButtons options={msg.options} onOptionClick={onOptionClick} />
            )}
          </div>
          <div className="message-time-right">{msg.time}</div>
        </div>
      ))}

      {/* Streaming message with typing cursor */}
      {streamingMessage && (
        <div className="message bot">
          <div className="message-content">
            <span>
              {streamingMessage.text}
              <span className="typing-cursor"></span>
            </span>
          </div>
          <div className="message-time-right">{streamingMessage.time}</div>
        </div>
      )}

      {/* WhatsApp-style typing animation */}
      {isTyping && !streamingMessage && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
