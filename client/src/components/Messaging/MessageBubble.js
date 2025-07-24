import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './MessageBubble.css';

const MessageBubble = ({ message, isFromMe, showAvatar = true }) => {
  const formatTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return 'Just now';
    }
  };

  return (
    <div className={`message-bubble ${isFromMe ? 'from-me' : 'from-other'}`}>
      {!isFromMe && showAvatar && (
        <div className="message-avatar">
          <div className="avatar-circle">
            {message.sender?.username?.charAt(0)?.toUpperCase() || '?'}
          </div>
        </div>
      )}
      
      <div className="message-content">
        {!isFromMe && (
          <div className="message-sender">
            {message.sender?.username || 'Unknown'}
          </div>
        )}
        
        <div className={`message-text ${isFromMe ? 'sent' : 'received'}`}>
          {message.content}
        </div>
        
        <div className="message-meta">
          <span className="message-time">
            {formatTime(message.created_at)}
          </span>
          {isFromMe && (
            <span className="message-status">
              {message.read_at ? (
                <span className="read-indicator">✓✓</span>
              ) : (
                <span className="sent-indicator">✓</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;