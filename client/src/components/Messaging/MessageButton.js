import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createConversation } from '../../store/slices/messagingSlice';
import './MessageButton.css';

const MessageButton = ({ 
  userId, 
  username, 
  variant = 'primary', 
  size = 'medium',
  className = '',
  children,
  ...props 
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartConversation = async () => {
    try {
      const result = await dispatch(createConversation({ userId })).unwrap();
      // Navigate to messages page with the conversation selected
      navigate('/messages');
    } catch (error) {
      console.error('Failed to create conversation:', error);
      // Could show a toast notification here
    }
  };

  const getButtonContent = () => {
    if (children) return children;
    
    return (
      <>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="message-icon"
        >
          <path 
            d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <span>Message {username || 'User'}</span>
      </>
    );
  };

  return (
    <button
      className={`message-button ${variant} ${size} ${className}`}
      onClick={handleStartConversation}
      title={`Send a message to ${username || 'this user'}`}
      {...props}
    >
      {getButtonContent()}
    </button>
  );
};

export default MessageButton;