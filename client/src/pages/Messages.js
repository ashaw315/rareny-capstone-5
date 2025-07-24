import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchConversations,
  selectUnreadCount,
  selectActiveConversation,
  updateUserStatus
} from '../store/slices/messagingSlice';
import { createPresenceSubscription, subscriptionManager } from '../utils/actionCable';
import ConversationList from '../components/Messaging/ConversationList';
import ChatWindow from '../components/Messaging/ChatWindow';
import './Messages.css';

const Messages = () => {
  const dispatch = useDispatch();
  const unreadCount = useSelector(selectUnreadCount);
  const activeConversation = useSelector(selectActiveConversation);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showConversationList, setShowConversationList] = useState(true);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // On mobile, show conversation list by default, hide when conversation is selected
      if (mobile && activeConversation) {
        setShowConversationList(false);
      } else if (!mobile) {
        setShowConversationList(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeConversation]);

  // Set up presence subscription for online status
  useEffect(() => {
    const presenceSubscription = createPresenceSubscription({
      onConnected: () => {
        console.log('Connected to presence channel');
      },
      
      onUserStatusChange: (userId, username, onlineStatus, lastSeenAt) => {
        dispatch(updateUserStatus({
          userId,
          onlineStatus,
          lastSeenAt
        }));
      },
      
      onDisconnected: () => {
        console.log('Disconnected from presence channel');
      }
    });

    subscriptionManager.subscribe('presence', presenceSubscription);

    return () => {
      subscriptionManager.unsubscribe('presence');
    };
  }, [dispatch]);

  // Load conversations on mount
  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // Update page title with unread count
  useEffect(() => {
    const baseTitle = 'Messages - RARE NY';
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }

    // Cleanup on unmount
    return () => {
      document.title = 'RARE NY';
    };
  }, [unreadCount]);

  const handleSelectConversation = () => {
    if (isMobile) {
      setShowConversationList(false);
    }
  };

  const handleBackToList = () => {
    setShowConversationList(true);
  };

  return (
    <div className="messages-page">
      <div className="messages-container">
        {/* Mobile header */}
        {isMobile && (
          <div className="mobile-header">
            {!showConversationList && activeConversation ? (
              <button 
                className="back-button"
                onClick={handleBackToList}
                aria-label="Back to conversations"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M19 12H5M12 19L5 12L12 5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Messages
              </button>
            ) : (
              <h1 className="mobile-title">
                Messages
                {unreadCount > 0 && (
                  <span className="unread-count">{unreadCount}</span>
                )}
              </h1>
            )}
          </div>
        )}

        {/* Main content area */}
        <div className="messages-content">
          {/* Conversation List */}
          <div className={`conversation-sidebar ${
            isMobile ? (showConversationList ? 'visible' : 'hidden') : 'visible'
          }`}>
            <ConversationList onSelectConversation={handleSelectConversation} />
          </div>

          {/* Chat Window */}
          <div className={`chat-area ${
            isMobile ? (showConversationList ? 'hidden' : 'visible') : 'visible'
          }`}>
            <ChatWindow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;