import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchConversations, 
  setActiveConversation,
  selectConversations,
  selectActiveConversationId,
  selectIsLoading,
  selectError
} from '../../store/slices/messagingSlice';
import OnlineStatus from './OnlineStatus';
import { formatDistanceToNow } from 'date-fns';
import './ConversationList.css';

const ConversationList = ({ onSelectConversation, className = '' }) => {
  const dispatch = useDispatch();
  const conversations = useSelector(selectConversations);
  const activeConversationId = useSelector(selectActiveConversationId);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const handleConversationClick = (conversation) => {
    dispatch(setActiveConversation(conversation.id));
    if (onSelectConversation) {
      onSelectConversation(conversation);
    }
  };

  const formatLastMessageTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      return '';
    }
  };

  const truncateMessage = (message, maxLength = 50) => {
    if (!message || message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  if (isLoading && conversations.length === 0) {
    return (
      <div className={`conversation-list ${className}`}>
        <div className="conversation-list-header">
          <h3>Messages</h3>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading conversations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`conversation-list ${className}`}>
        <div className="conversation-list-header">
          <h3>Messages</h3>
        </div>
        <div className="error-state">
          <p>Failed to load conversations</p>
          <button 
            onClick={() => dispatch(fetchConversations())}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`conversation-list ${className}`}>
      <div className="conversation-list-header">
        <h3>Messages</h3>
        {conversations.length > 0 && (
          <span className="conversation-count">
            {conversations.length}
          </span>
        )}
      </div>
      
      <div className="conversations-container">
        {conversations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h4>No conversations yet</h4>
            <p>Start a conversation with other artists in the community!</p>
          </div>
        ) : (
          <div className="conversations-list">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`conversation-item ${
                  activeConversationId === conversation.id ? 'active' : ''
                } ${conversation.unread_count > 0 ? 'unread' : ''}`}
                onClick={() => handleConversationClick(conversation)}
              >
                <div className="conversation-avatar">
                  <div className="avatar-circle">
                    {conversation.other_participant.username.charAt(0).toUpperCase()}
                  </div>
                  <OnlineStatus 
                    status={conversation.other_participant.online_status}
                    lastSeenAt={conversation.other_participant.last_seen_at}
                    size="small"
                  />
                </div>
                
                <div className="conversation-content">
                  <div className="conversation-header">
                    <span className="participant-name">
                      {conversation.other_participant.username}
                    </span>
                    {conversation.other_participant.discipline && (
                      <span className="participant-discipline">
                        {conversation.other_participant.discipline}
                      </span>
                    )}
                    {conversation.last_message_at && (
                      <span className="conversation-time">
                        {formatLastMessageTime(conversation.last_message_at)}
                      </span>
                    )}
                  </div>
                  
                  <div className="conversation-preview">
                    {conversation.last_message ? (
                      <span className="last-message">
                        {conversation.last_message.is_from_me && (
                          <span className="message-prefix">You: </span>
                        )}
                        {truncateMessage(conversation.last_message.content)}
                      </span>
                    ) : (
                      <span className="no-messages">No messages yet</span>
                    )}
                    
                    {conversation.unread_count > 0 && (
                      <span className="unread-badge">
                        {conversation.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;