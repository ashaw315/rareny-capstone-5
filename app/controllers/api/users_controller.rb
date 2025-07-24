class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show, :update_status]

  # GET /api/users/online
  def online
    online_users = User.active.select(:id, :username, :online_status, :last_seen_at, :discipline)
    
    users_data = online_users.map do |user|
      {
        id: user.id,
        username: user.username,
        online_status: user.online_status,
        last_seen_at: user.last_seen_at&.iso8601,
        discipline: user.discipline,
        last_seen_text: user.last_seen_text
      }
    end

    render json: { users: users_data }
  end

  # GET /api/users/:id
  def show
    return render json: { error: 'User not found' }, status: :not_found unless @user

    render json: {
      user: {
        id: @user.id,
        username: @user.username,
        online_status: @user.online_status,
        last_seen_at: @user.last_seen_at&.iso8601,
        discipline: @user.discipline,
        bio: @user.bio,
        website: @user.website,
        last_seen_text: @user.last_seen_text,
        member_since: @user.member_since
      }
    }
  end

  # PUT /api/users/:id/status
  def update_status
    return render json: { error: 'User not found' }, status: :not_found unless @user
    return render json: { error: 'Unauthorized' }, status: :forbidden unless @user == current_user

    status = params[:status]
    return render json: { error: 'Invalid status' }, status: :unprocessable_entity unless %w[online away offline].include?(status)

    case status
    when 'online'
      @user.set_online!
    when 'away'
      @user.set_away!
    when 'offline'
      @user.set_offline!
    end

    # Broadcast status change to all active conversations
    broadcast_status_change(@user)

    render json: {
      user: {
        id: @user.id,
        online_status: @user.online_status,
        last_seen_at: @user.last_seen_at&.iso8601,
        last_seen_text: @user.last_seen_text
      }
    }
  end

  # GET /api/users/me/conversations_count
  def conversations_count
    unread_count = current_user.unread_conversations_count
    total_count = current_user.conversations.count

    render json: {
      unread_conversations: unread_count,
      total_conversations: total_count
    }
  end

  private

  def set_user
    @user = User.find_by(id: params[:id])
  end

  def broadcast_status_change(user)
    # Find all conversations involving this user
    conversations = user.conversations
    
    conversations.each do |conversation|
      ActionCable.server.broadcast(
        "conversation_#{conversation.id}",
        {
          type: 'user_status_change',
          user_id: user.id,
          online_status: user.online_status,
          last_seen_at: user.last_seen_at&.iso8601,
          last_seen_text: user.last_seen_text
        }
      )
    end

    # Also broadcast to general presence channel
    ActionCable.server.broadcast(
      'presence_channel',
      {
        type: 'user_status_change',
        user_id: user.id,
        username: user.username,
        online_status: user.online_status,
        last_seen_at: user.last_seen_at&.iso8601,
        last_seen_text: user.last_seen_text
      }
    )
  end

  def current_user
    # This should be implemented based on your authentication system
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end