import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { logoutUser, loginUser, checkAuthStatus } from './authSlice'
import { reconnectActionCable } from '../../utils/actionCable'

// Async thunks for messaging API calls
export const fetchConversations = createAsyncThunk(
  'messaging/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/conversations')
      if (!response.ok) {
        throw new Error('Failed to fetch conversations')
      }
      const data = await response.json()
      return data.conversations
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchMessages = createAsyncThunk(
  'messaging/fetchMessages',
  async ({ conversationId, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages?page=${page}`)
      if (!response.ok) {
        throw new Error('Failed to fetch messages')
      }
      const data = await response.json()
      return { conversationId, messages: data.messages, pagination: data.pagination }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const sendMessage = createAsyncThunk(
  'messaging/sendMessage',
  async ({ conversationId, content }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      const data = await response.json()
      return { conversationId, message: data.message }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createConversation = createAsyncThunk(
  'messaging/createConversation',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      })
      if (!response.ok) {
        throw new Error('Failed to create conversation')
      }
      const data = await response.json()
      return data.conversation
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const markConversationAsRead = createAsyncThunk(
  'messaging/markConversationAsRead',
  async ({ conversationId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}/mark_as_read`, {
        method: 'PUT',
      })
      if (!response.ok) {
        throw new Error('Failed to mark conversation as read')
      }
      return { conversationId }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchUnreadCount = createAsyncThunk(
  'messaging/fetchUnreadCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/messages/unread_count')
      if (!response.ok) {
        throw new Error('Failed to fetch unread count')
      }
      const data = await response.json()
      return data.unread_count
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  conversations: [],
  messages: {}, // { conversationId: [messages] }
  activeConversationId: null,
  unreadCount: 0,
  typingUsers: {}, // { conversationId: [userIds] }
  isLoading: false,
  error: null,
  subscription: null,
  onlineUsers: {}, // { userId: { online_status, last_seen_at, etc } }
}

const messagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversationId = action.payload
    },
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = []
      }
      
      // Check if message already exists to prevent duplicates
      const existingMessage = state.messages[conversationId].find(m => m.id === message.id)
      if (!existingMessage) {
        state.messages[conversationId].push(message)
      }
      
      // Update conversation's last message
      const conversation = state.conversations.find(c => c.id === conversationId)
      if (conversation) {
        conversation.last_message = {
          id: message.id,
          content: message.content,
          sender_id: message.sender_id,
          created_at: message.created_at,
          is_from_me: message.is_from_me
        }
        conversation.last_message_at = message.created_at
        
        // Update unread count if message is not from current user
        if (!message.is_from_me) {
          conversation.unread_count = (conversation.unread_count || 0) + 1
          state.unreadCount += 1
        }
      }
    },
    markMessageAsRead: (state, action) => {
      const { conversationId, messageId, readAt } = action.payload
      const messages = state.messages[conversationId]
      if (messages) {
        const message = messages.find(m => m.id === messageId)
        if (message) {
          message.read_at = readAt
        }
      }
    },
    markAllMessagesAsRead: (state, action) => {
      const { conversationId } = action.payload
      const conversation = state.conversations.find(c => c.id === conversationId)
      if (conversation && conversation.unread_count > 0) {
        state.unreadCount -= conversation.unread_count
        conversation.unread_count = 0
      }
      
      const messages = state.messages[conversationId]
      if (messages) {
        messages.forEach(message => {
          if (!message.is_from_me && !message.read_at) {
            message.read_at = new Date().toISOString()
          }
        })
      }
    },
    setTypingUser: (state, action) => {
      const { conversationId, userId, username, isTyping } = action.payload
      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = []
      }
      
      const existingIndex = state.typingUsers[conversationId].findIndex(u => u.userId === userId)
      
      if (isTyping) {
        if (existingIndex === -1) {
          state.typingUsers[conversationId].push({ userId, username })
        }
      } else {
        if (existingIndex > -1) {
          state.typingUsers[conversationId].splice(existingIndex, 1)
        }
      }
    },
    updateUserStatus: (state, action) => {
      const { userId, onlineStatus, lastSeenAt, lastSeenText } = action.payload
      state.onlineUsers[userId] = {
        online_status: onlineStatus,
        last_seen_at: lastSeenAt,
        last_seen_text: lastSeenText
      }
      
      // Update user status in conversations
      state.conversations.forEach(conversation => {
        if (conversation.other_participant.id === userId) {
          conversation.other_participant.online_status = onlineStatus
          conversation.other_participant.last_seen_at = lastSeenAt
        }
      })
    },
    subscribeToConversation: (state, action) => {
      // This will be handled by middleware or thunks
    },
    unsubscribeFromConversation: (state, action) => {
      // This will be handled by middleware or thunks
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch conversations
      .addCase(fetchConversations.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.isLoading = false
        state.conversations = action.payload
        // Calculate total unread count
        state.unreadCount = action.payload.reduce((total, conv) => total + (conv.unread_count || 0), 0)
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false
        const { conversationId, messages } = action.payload
        if (!state.messages[conversationId]) {
          state.messages[conversationId] = []
        }
        
        // Get existing message IDs to avoid duplicates
        const existingIds = new Set(state.messages[conversationId].map(m => m.id))
        const newMessages = messages.filter(m => !existingIds.has(m.id))
        
        // Prepend only new messages (for pagination)
        state.messages[conversationId] = [...newMessages, ...state.messages[conversationId]]
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        // Message will be added via WebSocket callback
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload
      })
      
      // Create conversation
      .addCase(createConversation.fulfilled, (state, action) => {
        const conversation = action.payload
        const existingConv = state.conversations.find(c => c.id === conversation.id)
        if (!existingConv) {
          state.conversations.unshift(conversation)
        }
        state.activeConversationId = conversation.id
      })
      
      // Mark as read
      .addCase(markConversationAsRead.fulfilled, (state, action) => {
        const { conversationId } = action.payload
        const conversation = state.conversations.find(c => c.id === conversationId)
        if (conversation && conversation.unread_count > 0) {
          state.unreadCount -= conversation.unread_count
          conversation.unread_count = 0
        }
      })
      
      // Fetch unread count
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload
      })
      
      // Clear messaging state on logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.conversations = []
        state.messages = {}
        state.activeConversationId = null
        state.unreadCount = 0
        state.typingUsers = {}
        state.onlineUsers = {}
        state.subscription = null
        state.error = null
      })
      
      // Reconnect Action Cable on login
      .addCase(loginUser.fulfilled, (state) => {
        // Reconnect Action Cable with new user session
        setTimeout(() => {
          reconnectActionCable()
        }, 100) // Small delay to ensure session is set
      })
      
      // Reconnect Action Cable on auth check (page reload)
      .addCase(checkAuthStatus.fulfilled, (state) => {
        // Reconnect Action Cable if user is authenticated
        setTimeout(() => {
          reconnectActionCable()
        }, 100)
      })
  }
})

export const {
  setActiveConversation,
  addMessage,
  markMessageAsRead,
  markAllMessagesAsRead,
  setTypingUser,
  updateUserStatus,
  subscribeToConversation,
  unsubscribeFromConversation,
  clearError
} = messagingSlice.actions

export default messagingSlice.reducer

// Base selectors
const selectMessagingState = (state) => state.messaging || {}

// Memoized selectors
export const selectConversations = createSelector(
  [selectMessagingState],
  (messaging) => messaging.conversations || []
)

export const selectActiveConversationId = createSelector(
  [selectMessagingState],
  (messaging) => messaging.activeConversationId
)

export const selectActiveConversation = createSelector(
  [selectConversations, selectActiveConversationId],
  (conversations, activeId) => conversations.find(c => c.id === activeId)
)

export const selectMessages = createSelector(
  [selectMessagingState, (state, conversationId) => conversationId],
  (messaging, conversationId) => messaging.messages?.[conversationId] || []
)

export const selectUnreadCount = createSelector(
  [selectMessagingState],
  (messaging) => messaging.unreadCount || 0
)

export const selectTypingUsers = createSelector(
  [selectMessagingState, (state, conversationId) => conversationId],
  (messaging, conversationId) => messaging.typingUsers?.[conversationId] || []
)

export const selectIsLoading = createSelector(
  [selectMessagingState],
  (messaging) => messaging.isLoading || false
)

export const selectError = createSelector(
  [selectMessagingState],
  (messaging) => messaging.error
)

export const selectOnlineUsers = createSelector(
  [selectMessagingState],
  (messaging) => messaging.onlineUsers || []
)