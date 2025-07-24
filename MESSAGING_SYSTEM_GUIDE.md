# RARE NY Messaging System Guide

## Overview
The RARE NY platform includes a comprehensive real-time messaging system that allows artists to communicate with each other directly. The system features live chat, online status tracking, and seamless integration throughout the platform.

## How to Use the Messaging System

### 1. Starting a Conversation

#### From Artist Cards:
1. Go to the Artists page (`/artists`)
2. Click on any artist card to view their details in a modal
3. Click the **"Send Message"** button to start a conversation
4. You'll be redirected to the Messages page with a new conversation

#### From Listing Details:
1. Browse listings (`/listings`) and click on any listing
2. On the listing details page, find the **"Message Owner"** button
3. Click to start a conversation with the listing owner

### 2. Accessing Your Messages

#### Via Navigation:
- Click **"Messages"** in the main navigation bar
- The Messages link shows an unread count badge when you have new messages
- Also available in the user dropdown menu

#### Direct URL:
- Navigate to `/messages` in your browser

### 3. Using the Chat Interface

#### Conversation List (Left Sidebar):
- View all your conversations
- See the last message preview
- Unread conversations are highlighted
- Click any conversation to open it

#### Chat Window (Main Area):
- Send messages using the text input at the bottom
- Messages appear instantly for both users
- Your messages appear on the right (blue)
- Other user's messages appear on the left (gray)
- Scroll to see message history

#### Typing Indicators:
- See "... is typing" when the other person is writing
- Your typing status is shown to the other person

### 4. Online Status Features

#### Status Indicators:
- **Green dot**: User is online and active
- **Yellow dot**: User is away (inactive for a while)
- **Gray dot**: User is offline

#### Where You'll See Status:
- Artist cards in the Artists page
- Conversation list
- Chat headers
- Throughout the platform

### 5. Mobile Experience

The messaging system is fully responsive:
- **Mobile**: Conversation list and chat toggle between views
- **Desktop**: Side-by-side layout with conversation list and chat

## Technical Features

### Real-time Communication
- **WebSocket Connection**: Messages appear instantly
- **Action Cable**: Rails WebSocket implementation
- **Presence System**: Live online status updates
- **Activity Detection**: Automatic away status after inactivity

### Message Features
- **Read Status**: Track which messages have been read
- **Message History**: Full conversation history preserved
- **Unread Counts**: Badge notifications for new messages
- **Conversation Threading**: Each conversation maintains its own thread

### Integration Points
- **Artist Profiles**: Message any artist directly
- **Listings**: Contact listing owners
- **Navigation**: Always accessible via main navigation
- **Notifications**: Unread count badges throughout the UI

## Database Structure

### Tables Created:
- **conversations**: Links two users in a messaging thread
- **messages**: Individual messages with sender, recipient, content
- **users**: Enhanced with online_status and last_seen_at columns

### Key Relationships:
- Users can have many conversations (as participant 1 or 2)
- Conversations contain many messages
- Messages belong to a conversation and have a sender/recipient

## Troubleshooting

### Common Issues:

#### "Messages not appearing":
- Ensure you're logged in
- Check your internet connection
- Refresh the page to reconnect WebSocket

#### "Can't start conversations":
- Verify you're authenticated
- Make sure the other user exists
- Try refreshing the page

#### "Online status not updating":
- The system updates status based on activity
- Status changes automatically after periods of inactivity
- Refresh the page if status seems stuck

### Browser Requirements:
- WebSocket support (all modern browsers)
- JavaScript enabled
- Cookies enabled for authentication

## Developer Notes

### Redux State Management:
- **messagingSlice**: Handles all messaging state
- **Actions**: fetchConversations, sendMessage, markAsRead
- **Selectors**: Optimized selectors for conversations and messages

### WebSocket Implementation:
- **ConversationChannel**: Real-time messaging
- **PresenceChannel**: Online status updates
- **Automatic Reconnection**: Handles connection drops

### Components:
- **Messages**: Main messaging page
- **ConversationList**: Sidebar with all conversations
- **ChatWindow**: Main chat interface
- **MessageButton**: Reusable button to start conversations
- **OnlineStatus**: Status indicator component

## API Endpoints

### Messaging APIs:
- `GET /api/conversations` - List user's conversations
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:id/messages` - Get conversation messages
- `POST /api/conversations/:id/messages` - Send new message
- `PUT /api/conversations/:id/mark_as_read` - Mark conversation as read
- `GET /api/messages/unread_count` - Get unread message count

### User Status APIs:
- `PUT /api/users/:id/status` - Update user online status
- `GET /api/users/me/conversations_count` - Get conversation count

## Security & Privacy

### Authentication:
- All messaging requires user authentication
- Session-based authentication system
- Users can only access their own conversations

### Privacy Features:
- Users can only message other users directly
- No public messaging or group chats
- Conversation history is private between participants

### Data Protection:
- Messages are stored securely in the database
- Online status is only visible to other authenticated users
- No personal information exposed without permission

---

**Need Help?** If you're experiencing issues with the messaging system, please check your internet connection and try refreshing the page. For technical support, contact the development team.