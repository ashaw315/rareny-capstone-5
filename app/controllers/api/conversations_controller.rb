class Api::ConversationsController < ApplicationController
  before_action :set_conversation, only: [:show, :messages, :mark_as_read]
  
  # GET /api/conversations
  def index
    conversations = current_user.conversations.includes(:participant_1, :participant_2, :messages)
    
    conversations_data = conversations.map do |conversation|
      other_user = conversation.other_participant(current_user)
      last_message = conversation.last_message
      
      {
        id: conversation.id,
        other_participant: {
          id: other_user.id,
          username: other_user.username,
          online_status: other_user.online_status,
          last_seen_at: other_user.last_seen_at,
          discipline: other_user.discipline
        },
        last_message: last_message ? {
          id: last_message.id,
          content: last_message.content,
          sender_id: last_message.sender_id,
          created_at: last_message.created_at.iso8601,
          is_from_me: last_message.sender == current_user
        } : nil,
        unread_count: conversation.unread_count_for(current_user),
        last_message_at: conversation.last_message_at&.iso8601,
        created_at: conversation.created_at.iso8601
      }
    end

    render json: { conversations: conversations_data }
  end

  # GET /api/conversations/:id
  def show
    return render json: { error: 'Conversation not found' }, status: :not_found unless @conversation
    return render json: { error: 'Unauthorized' }, status: :forbidden unless @conversation.involves_user?(current_user)

    other_user = @conversation.other_participant(current_user)
    
    render json: {
      conversation: {
        id: @conversation.id,
        other_participant: {
          id: other_user.id,
          username: other_user.username,
          online_status: other_user.online_status,
          last_seen_at: other_user.last_seen_at,
          discipline: other_user.discipline
        },
        created_at: @conversation.created_at.iso8601
      }
    }
  end

  # GET /api/conversations/:id/messages
  def messages
    return render json: { error: 'Conversation not found' }, status: :not_found unless @conversation
    return render json: { error: 'Unauthorized' }, status: :forbidden unless @conversation.involves_user?(current_user)

    page = params[:page]&.to_i || 1
    per_page = 50
    offset = (page - 1) * per_page

    messages = @conversation.messages
                            .includes(:sender, :recipient)
                            .order(created_at: :desc)
                            .limit(per_page)
                            .offset(offset)

    messages_data = messages.reverse.map do |message|
      {
        id: message.id,
        content: message.content,
        sender_id: message.sender_id,
        recipient_id: message.recipient_id,
        read_at: message.read_at&.iso8601,
        created_at: message.created_at.iso8601,
        is_from_me: message.sender == current_user,
        sender: {
          id: message.sender.id,
          username: message.sender.username
        }
      }
    end

    render json: { 
      messages: messages_data,
      pagination: {
        current_page: page,
        has_more: messages.count == per_page
      }
    }
  end

  # POST /api/conversations/:id/messages
  def create_message
    return render json: { error: 'Conversation not found' }, status: :not_found unless @conversation
    return render json: { error: 'Unauthorized' }, status: :forbidden unless @conversation.involves_user?(current_user)

    recipient = @conversation.other_participant(current_user)
    
    message = @conversation.messages.build(
      sender: current_user,
      recipient: recipient,
      content: params[:content]
    )

    if message.save
      render json: {
        message: {
          id: message.id,
          content: message.content,
          sender_id: message.sender_id,
          recipient_id: message.recipient_id,
          read_at: message.read_at&.iso8601,
          created_at: message.created_at.iso8601,
          is_from_me: true,
          sender: {
            id: current_user.id,
            username: current_user.username
          }
        }
      }, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/conversations
  def create
    other_user = User.find_by(id: params[:user_id])
    return render json: { error: 'User not found' }, status: :not_found unless other_user
    return render json: { error: 'Cannot create conversation with yourself' }, status: :unprocessable_entity if other_user == current_user

    conversation = Conversation.find_or_create_between(current_user, other_user)
    
    render json: {
      conversation: {
        id: conversation.id,
        other_participant: {
          id: other_user.id,
          username: other_user.username,
          online_status: other_user.online_status,
          last_seen_at: other_user.last_seen_at,
          discipline: other_user.discipline
        },
        created_at: conversation.created_at.iso8601
      }
    }, status: conversation.persisted? ? :ok : :created
  end

  # PUT /api/conversations/:id/mark_as_read
  def mark_as_read
    return render json: { error: 'Conversation not found' }, status: :not_found unless @conversation
    return render json: { error: 'Unauthorized' }, status: :forbidden unless @conversation.involves_user?(current_user)

    @conversation.mark_as_read_for(current_user)
    render json: { success: true }
  end

  private

  def set_conversation
    @conversation = Conversation.find_by(id: params[:id])
  end

  def current_user
    # This should be implemented based on your authentication system
    # For now, assuming you have a current_user method
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end