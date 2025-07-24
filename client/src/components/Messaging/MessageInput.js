import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../store/slices/messagingSlice';
import './MessageInput.css';

const MessageInput = ({ 
  conversationId, 
  onSendMessage, 
  onTyping, 
  disabled = false,
  placeholder = "Type a message..." 
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const dispatch = useDispatch();

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [message]);

  // Handle typing indicators
  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    // Send typing indicator
    if (!isTyping && value.length > 0) {
      setIsTyping(true);
      if (onTyping) onTyping(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (onTyping) onTyping(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || disabled) return;

    const messageContent = message.trim();
    setMessage('');

    // Stop typing indicator
    if (isTyping) {
      setIsTyping(false);
      if (onTyping) onTyping(false);
    }

    // Clear typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Send message
    try {
      if (onSendMessage) {
        onSendMessage(messageContent);
      } else {
        await dispatch(sendMessage({ 
          conversationId, 
          content: messageContent 
        })).unwrap();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Optionally restore message on error
      setMessage(messageContent);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (isTyping && onTyping) {
        onTyping(false);
      }
    };
  }, [isTyping, onTyping]);

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="message-textarea"
            rows={1}
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="send-button"
            title="Send message"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M2 21L23 12L2 3L2 10L17 12L2 14L2 21Z" 
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        
        {message.length > 800 && (
          <div className="character-count">
            {message.length}/1000
          </div>
        )}
      </form>
    </div>
  );
};

export default MessageInput;