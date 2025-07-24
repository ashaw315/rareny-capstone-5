import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { 
  fetchMessages,
  markConversationAsRead,
  selectMessages,
  selectActiveConversation,
  selectTypingUsers,
  selectIsLoading,
  addMessage,
  setTypingUser,
  updateUserStatus,
  sendMessage
} from '../../store/slices/messagingSlice';
import { createConversationSubscription, subscriptionManager } from '../../utils/actionCable';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import OnlineStatus from './OnlineStatus';
import './ChatWindow.css';

const TypingIndicator = ({ typingUsers }) => {
  if (typingUsers.length === 0) return null;

  const getTypingText = () => {
    if (typingUsers.length === 1) {
      return `${typingUsers[0].username} is typing...`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0].username} and ${typingUsers[1].username} are typing...`;
    } else {
      return `${typingUsers.length} people are typing...`;
    }
  };

  return (
    <div className="typing-indicator">
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="typing-text">{getTypingText()}</span>
    </div>
  );
};

const ChatWindow = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const activeConversation = useSelector(selectActiveConversation);
  const messages = useSelector(state => 
    selectMessages(state, activeConversation?.id)
  );
  const typingUsers = useSelector(state => 
    selectTypingUsers(state, activeConversation?.id)
  );
  const isLoading = useSelector(selectIsLoading);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [subscription, setSubscription] = useState(null);
  const currentUserId = user?.id;

  // Check if user is at bottom of messages
  const isAtBottom = () => {
    if (!messagesContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    return Math.abs(scrollHeight - clientHeight - scrollTop) < 50; // 50px threshold
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch messages when conversation changes
  useEffect(() => {
    if (activeConversation?.id) {
      dispatch(fetchMessages({ conversationId: activeConversation.id }));
      dispatch(markConversationAsRead({ conversationId: activeConversation.id }));
      // Always scroll to bottom when switching conversations
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [activeConversation?.id, dispatch]);

  // Only auto-scroll for the initial load, not for every message change
  useEffect(() => {
    if (messages.length > 0) {
      // Only scroll to bottom if this is likely the first load or we're at the bottom
      const timer = setTimeout(() => {
        if (isAtBottom()) {
          scrollToBottom();
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [messages.length]); // Only trigger when message count changes, not content

  // Set up WebSocket subscription for real-time messaging
  useEffect(() => {
    if (!activeConversation?.id) return;

    // Clean up previous subscription
    if (subscription) {
      subscription.unsubscribe();
    }

    // Create new subscription
    const newSubscription = createConversationSubscription(
      activeConversation.id,
      {
        onConnected: () => {
          console.log('Connected to conversation WebSocket');
        },
        
        onMessage: (message) => {
          dispatch(addMessage({ 
            conversationId: activeConversation.id, 
            message 
          }));
          
          // Mark as read if message is not from current user
          if (message.sender_id !== currentUserId) {
            dispatch(markConversationAsRead({ 
              conversationId: activeConversation.id 
            }));
          }
        },
        
        onTyping: (userId, username, isTyping) => {
          if (userId !== currentUserId) {
            dispatch(setTypingUser({
              conversationId: activeConversation.id,
              userId,
              username,
              isTyping
            }));
          }
        },
        
        onUserStatusChange: (userId, onlineStatus, lastSeenAt, lastSeenText) => {
          dispatch(updateUserStatus({
            userId,
            onlineStatus,
            lastSeenAt,
            lastSeenText
          }));
        },
        
        onError: (error) => {
          console.error('WebSocket error:', error);
        }
      }
    );

    setSubscription(newSubscription);
    subscriptionManager.subscribe(`conversation_${activeConversation.id}`, newSubscription);

    return () => {
      if (newSubscription) {
        newSubscription.unsubscribe();
        subscriptionManager.unsubscribe(`conversation_${activeConversation.id}`);
      }
    };
  }, [activeConversation?.id, dispatch, currentUserId]);

  // Handle sending messages via WebSocket with fallback to Redux
  const handleSendMessage = async (content) => {
    try {
      if (subscription) {
        subscription.sendMessage(content);
      } else {
        // Fallback to Redux action if WebSocket not available
        await dispatch(sendMessage({ 
          conversationId: activeConversation.id, 
          content 
        })).unwrap();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Try Redux fallback if WebSocket failed
      try {
        await dispatch(sendMessage({ 
          conversationId: activeConversation.id, 
          content 
        })).unwrap();
      } catch (fallbackError) {
        console.error('Fallback message send also failed:', fallbackError);
      }
    }
  };

  // Handle typing indicators
  const handleTyping = (isTyping) => {
    if (subscription) {
      subscription.sendTyping(isTyping);
    }
  };

  if (!activeConversation) {
    return (
      <div className={`chat-window ${className}`}>
        <div className="no-conversation">
          <div className="no-conversation-icon">💬</div>
          <h3>Select a conversation</h3>
          <p>Choose a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-window ${className}`}>
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-participant-info">
          <div className="participant-avatar">
            <div className="avatar-circle">
              {activeConversation.other_participant.username.charAt(0).toUpperCase()}
            </div>
            <OnlineStatus 
              status={activeConversation.other_participant.online_status}
              lastSeenAt={activeConversation.other_participant.last_seen_at}
              size="small"
            />
          </div>
          
          <div className="participant-details">
            <h3 className="participant-name">
              {activeConversation.other_participant.username}
            </h3>
            <div className="participant-status">
              <OnlineStatus 
                status={activeConversation.other_participant.online_status}
                lastSeenAt={activeConversation.other_participant.last_seen_at}
                showText={true}
                size="small"
              />
              {activeConversation.other_participant.discipline && (
                <>
                  <span className="status-separator">•</span>
                  <span className="participant-discipline">
                    {activeConversation.other_participant.discipline}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Chat actions could go here */}
        <div className="chat-actions">
          {/* Future: Video call, phone call, etc. */}
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="messages-container"
        ref={messagesContainerRef}
      >
        {isLoading && messages.length === 0 ? (
          <div className="messages-loading">
            <div className="loading-spinner"></div>
            <p>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="no-messages">
            <div className="no-messages-icon">👋</div>
            <h4>Start the conversation</h4>
            <p>Send a message to {activeConversation.other_participant.username}</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message, index) => {
              const isFromMe = message.sender_id === currentUserId;
              const showAvatar = !isFromMe && (
                index === 0 || 
                messages[index - 1].sender_id !== message.sender_id
              );
              
              return (
                <MessageBubble
                  key={`${activeConversation.id}-${message.id}-${index}`}
                  message={message}
                  isFromMe={isFromMe}
                  showAvatar={showAvatar}
                />
              );
            })}
            
            {/* Typing indicator */}
            <TypingIndicator typingUsers={typingUsers} />
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <MessageInput
        conversationId={activeConversation.id}
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        placeholder={`Message ${activeConversation.other_participant.username}...`}
      />
    </div>
  );
};

export default ChatWindow;