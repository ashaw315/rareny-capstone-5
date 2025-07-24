class ConversationChannel < ApplicationCable::Channel
  def subscribed
    conversation = Conversation.find(params[:conversation_id])
    
    # Check if the current user is a participant in this conversation
    if conversation && conversation.involves_user?(current_user)
      stream_from "conversation_#{conversation.id}"
      
      # Mark messages as read when user joins the channel
      conversation.mark_as_read_for(current_user)
      
      # Broadcast that user is now viewing this conversation
      ActionCable.server.broadcast(
        "conversation_#{conversation.id}",
        {
          type: 'user_joined',
          user_id: current_user.id,
          username: current_user.username
        }
      )
    else
      reject
    end
  end

  def unsubscribed
    # Broadcast that user left the conversation
    if @conversation
      ActionCable.server.broadcast(
        "conversation_#{@conversation.id}",
        {
          type: 'user_left',
          user_id: current_user.id,
          username: current_user.username
        }
      )
    end
  end

  def send_message(data)
    conversation = Conversation.find(params[:conversation_id])
    return unless conversation && conversation.involves_user?(current_user)

    recipient = conversation.other_participant(current_user)
    
    message = conversation.messages.create!(
      sender: current_user,
      recipient: recipient,
      content: data['content']
    )

    # Broadcasting is handled in the Message model after_create callback
  rescue ActiveRecord::RecordInvalid => e
    # Send error back to the sender
    transmit({ 
      type: 'error', 
      message: e.record.errors.full_messages.join(', ') 
    })
  end

  def typing(data)
    conversation = Conversation.find(params[:conversation_id])
    return unless conversation && conversation.involves_user?(current_user)

    ActionCable.server.broadcast(
      "conversation_#{conversation.id}",
      {
        type: 'typing',
        user_id: current_user.id,
        username: current_user.username,
        is_typing: data['is_typing']
      }
    )
  end

  def mark_as_read(data)
    conversation = Conversation.find(params[:conversation_id])
    return unless conversation && conversation.involves_user?(current_user)

    message = Message.find(data['message_id'])
    return unless message.recipient == current_user

    message.mark_as_read!
  end

  private

  def current_user
    # This should match your authentication system
    # For now, we'll assume the user is passed in connection params
    @current_user ||= User.find(connection.current_user.id) if connection.current_user
  end
end