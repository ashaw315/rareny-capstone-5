class Api::MessagesController < ApplicationController
  before_action :set_message, only: [:show, :mark_as_read]

  # GET /api/messages/:id
  def show
    return render json: { error: 'Message not found' }, status: :not_found unless @message
    return render json: { error: 'Unauthorized' }, status: :forbidden unless can_access_message?

    render json: {
      message: {
        id: @message.id,
        content: @message.content,
        sender_id: @message.sender_id,
        recipient_id: @message.recipient_id,
        conversation_id: @message.conversation_id,
        read_at: @message.read_at&.iso8601,
        created_at: @message.created_at.iso8601,
        is_from_me: @message.sender == current_user,
        sender: {
          id: @message.sender.id,
          username: @message.sender.username
        },
        recipient: {
          id: @message.recipient.id,
          username: @message.recipient.username
        }
      }
    }
  end

  # PUT /api/messages/:id/mark_as_read
  def mark_as_read
    return render json: { error: 'Message not found' }, status: :not_found unless @message
    return render json: { error: 'Unauthorized' }, status: :forbidden unless @message.recipient == current_user

    if @message.mark_as_read!
      # Broadcast read status to conversation
      ActionCable.server.broadcast(
        "conversation_#{@message.conversation_id}",
        {
          type: 'message_read',
          message_id: @message.id,
          read_at: @message.read_at.iso8601
        }
      )

      render json: {
        message: {
          id: @message.id,
          read_at: @message.read_at.iso8601
        }
      }
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /api/messages/unread_count
  def unread_count
    count = current_user.unread_messages_count
    render json: { unread_count: count }
  end

  private

  def set_message
    @message = Message.find_by(id: params[:id])
  end

  def can_access_message?
    @message.sender == current_user || @message.recipient == current_user
  end

  def current_user
    # This should be implemented based on your authentication system
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end