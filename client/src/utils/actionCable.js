import { createConsumer } from '@rails/actioncable'

// Create ActionCable consumer - connect to Rails server
let consumer = createConsumer('ws://localhost:3000/cable')

export default consumer

// Function to reconnect Action Cable with fresh session
export const reconnectActionCable = () => {
  // Disconnect all existing subscriptions
  subscriptionManager.unsubscribeAll()
  
  // Disconnect the old consumer
  if (consumer) {
    consumer.disconnect()
  }
  
  // Create a new consumer with fresh session
  consumer = createConsumer('ws://localhost:3000/cable')
  
  // Return the new consumer
  return consumer
}

// Helper functions for managing Action Cable subscriptions
export const createConversationSubscription = (conversationId, callbacks = {}) => {
  return consumer.subscriptions.create(
    {
      channel: 'ConversationChannel',
      conversation_id: conversationId
    },
    {
      connected() {
        if (callbacks.onConnected) callbacks.onConnected()
      },

      disconnected() {
        if (callbacks.onDisconnected) callbacks.onDisconnected()
      },

      received(data) {
        
        switch (data.type) {
          case 'new_message':
            if (callbacks.onMessage) callbacks.onMessage(data.message)
            break
          case 'message_read':
            if (callbacks.onMessageRead) callbacks.onMessageRead(data.message_id, data.read_at)
            break
          case 'typing':
            if (callbacks.onTyping) callbacks.onTyping(data.user_id, data.username, data.is_typing)
            break
          case 'user_joined':
            if (callbacks.onUserJoined) callbacks.onUserJoined(data.user_id, data.username)
            break
          case 'user_left':
            if (callbacks.onUserLeft) callbacks.onUserLeft(data.user_id, data.username)
            break
          case 'user_status_change':
            if (callbacks.onUserStatusChange) {
              callbacks.onUserStatusChange(data.user_id, data.online_status, data.last_seen_at, data.last_seen_text)
            }
            break
          case 'error':
            if (callbacks.onError) callbacks.onError(data.message)
            break
          default:
            // Unknown message type - ignore
        }
      },

      // Send a message through the WebSocket
      sendMessage(content) {
        this.perform('send_message', { content })
      },

      // Send typing indicator
      sendTyping(isTyping) {
        this.perform('typing', { is_typing: isTyping })
      },

      // Mark message as read
      markAsRead(messageId) {
        this.perform('mark_as_read', { message_id: messageId })
      }
    }
  )
}

export const createPresenceSubscription = (callbacks = {}) => {
  return consumer.subscriptions.create(
    { channel: 'PresenceChannel' },
    {
      connected() {
        // Send periodic heartbeat to maintain presence
        this.heartbeatInterval = setInterval(() => {
          this.perform('heartbeat', { status: 'online' })
        }, 30000) // Every 30 seconds
        
        if (callbacks.onConnected) callbacks.onConnected()
      },

      disconnected() {
        if (this.heartbeatInterval) {
          clearInterval(this.heartbeatInterval)
        }
        if (callbacks.onDisconnected) callbacks.onDisconnected()
      },

      received(data) {
        
        switch (data.type) {
          case 'user_online':
          case 'user_offline':
          case 'user_status_change':
            if (callbacks.onUserStatusChange) {
              callbacks.onUserStatusChange(
                data.user_id,
                data.username,
                data.online_status,
                data.last_seen_at
              )
            }
            break
          default:
            // Unknown presence type - ignore
        }
      },

      // Update user status
      updateStatus(status) {
        this.perform('update_status', { status })
      },

      // Send heartbeat
      heartbeat(status = 'online') {
        this.perform('heartbeat', { status })
      }
    }
  )
}

// Helper to manage multiple subscriptions
export class SubscriptionManager {
  constructor() {
    this.subscriptions = new Map()
  }

  subscribe(key, subscription) {
    // Unsubscribe from existing subscription with same key
    this.unsubscribe(key)
    
    this.subscriptions.set(key, subscription)
    return subscription
  }

  unsubscribe(key) {
    const subscription = this.subscriptions.get(key)
    if (subscription) {
      subscription.unsubscribe()
      this.subscriptions.delete(key)
    }
  }

  unsubscribeAll() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe()
    })
    this.subscriptions.clear()
  }

  get(key) {
    return this.subscriptions.get(key)
  }

  has(key) {
    return this.subscriptions.has(key)
  }
}

// Global subscription manager instance
export const subscriptionManager = new SubscriptionManager()

// Auto-detect user activity and update status
let activityTimer
let isAway = false

const updateActivityStatus = () => {
  if (isAway) {
    isAway = false
    const presenceSubscription = subscriptionManager.get('presence')
    if (presenceSubscription) {
      presenceSubscription.updateStatus('online')
    }
  }
  
  // Clear existing timer
  if (activityTimer) {
    clearTimeout(activityTimer)
  }
  
  // Set user as away after 5 minutes of inactivity
  activityTimer = setTimeout(() => {
    isAway = true
    const presenceSubscription = subscriptionManager.get('presence')
    if (presenceSubscription) {
      presenceSubscription.updateStatus('away')
    }
  }, 5 * 60 * 1000) // 5 minutes
}

// Listen for user activity
const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

activityEvents.forEach(event => {
  document.addEventListener(event, updateActivityStatus, { passive: true })
})

// Listen for page visibility changes
document.addEventListener('visibilitychange', () => {
  const presenceSubscription = subscriptionManager.get('presence')
  if (!presenceSubscription) return
  
  if (document.hidden) {
    // Page is hidden, set user as away
    presenceSubscription.updateStatus('away')
  } else {
    // Page is visible, set user as online
    presenceSubscription.updateStatus('online')
    updateActivityStatus() // Reset activity timer
  }
})

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  const presenceSubscription = subscriptionManager.get('presence')
  if (presenceSubscription) {
    presenceSubscription.updateStatus('offline')
  }
})