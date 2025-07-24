class PresenceChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'presence_channel'
    
    # Update user's online status
    current_user.set_online!
    
    # Broadcast that user came online
    ActionCable.server.broadcast(
      'presence_channel',
      {
        type: 'user_online',
        user_id: current_user.id,
        username: current_user.username,
        online_status: 'online',
        last_seen_at: current_user.last_seen_at&.iso8601
      }
    )
  end

  def unsubscribed
    # Update user's offline status
    current_user.set_offline!
    
    # Broadcast that user went offline
    ActionCable.server.broadcast(
      'presence_channel',
      {
        type: 'user_offline',
        user_id: current_user.id,
        username: current_user.username,
        online_status: 'offline',
        last_seen_at: current_user.last_seen_at&.iso8601
      }
    )
  end

  def heartbeat(data)
    # Update last seen timestamp to indicate user is still active
    current_user.update!(last_seen_at: Time.current)
    
    # Check if user should be marked as away
    # This would typically be handled by a background job, but for simplicity
    # we'll handle basic status updates here
    if data['status'] && %w[online away].include?(data['status'])
      case data['status']
      when 'online'
        current_user.set_online! unless current_user.online?
      when 'away'
        current_user.set_away! unless current_user.away?
      end
    end
  end

  def update_status(data)
    return unless %w[online away offline].include?(data['status'])
    
    case data['status']
    when 'online'
      current_user.set_online!
    when 'away'
      current_user.set_away!
    when 'offline'
      current_user.set_offline!
    end

    # Broadcast status change
    ActionCable.server.broadcast(
      'presence_channel',
      {
        type: 'user_status_change',
        user_id: current_user.id,
        username: current_user.username,
        online_status: current_user.online_status,
        last_seen_at: current_user.last_seen_at&.iso8601,
        last_seen_text: current_user.last_seen_text
      }
    )
  end

  private

  def current_user
    @current_user ||= User.find(connection.current_user.id) if connection.current_user
  end
end