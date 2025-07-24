class User < ApplicationRecord
    has_secure_password
    has_many :profile_pictures, dependent: :destroy
    has_many :listings, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :forum_posts, dependent: :destroy
    has_many :subforums, through: :forum_posts, source: :subforum

    # Messaging associations
    has_many :sent_messages, class_name: 'Message', foreign_key: 'sender_id', dependent: :destroy
    has_many :received_messages, class_name: 'Message', foreign_key: 'recipient_id', dependent: :destroy
    has_many :conversations_as_participant_1, class_name: 'Conversation', foreign_key: 'participant_1_id', dependent: :destroy
    has_many :conversations_as_participant_2, class_name: 'Conversation', foreign_key: 'participant_2_id', dependent: :destroy

    validates :username, presence: true, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true
    validates :online_status, inclusion: { in: %w[online away offline] }
    
    # Make these optional for user registration
    validates :website, presence: true, allow_blank: true
    validates :discipline, presence: true, allow_blank: true
    validates :bio, presence: true, allow_blank: true

    # Online status scopes
    scope :online, -> { where(online_status: 'online') }
    scope :away, -> { where(online_status: 'away') }
    scope :offline, -> { where(online_status: 'offline') }
    scope :active, -> { where(online_status: ['online', 'away']) }
    
    def member_since
        created_at.strftime("%m/%d/%Y")
    end

    # Messaging methods
    def conversations
        Conversation.involving_user(self).by_recent_activity
    end

    def conversation_with(other_user)
        Conversation.between(self, other_user)
    end

    def unread_messages_count
        received_messages.unread.count
    end

    def unread_conversations_count
        conversations.select { |conv| conv.unread_count_for(self) > 0 }.count
    end

    # Online status methods
    def online?
        online_status == 'online'
    end

    def away?
        online_status == 'away'
    end

    def offline?
        online_status == 'offline'
    end

    def active?
        online? || away?
    end

    def set_online!
        update!(online_status: 'online', last_seen_at: Time.current)
    end

    def set_away!
        update!(online_status: 'away', last_seen_at: Time.current)
    end

    def set_offline!
        update!(online_status: 'offline', last_seen_at: Time.current)
    end

    def last_seen_text
        return 'Online now' if online?
        return 'Away' if away?
        return 'Never' unless last_seen_at
        
        time_ago = Time.current - last_seen_at
        case time_ago
        when 0..1.minute
            'Just now'
        when 1.minute..1.hour
            "#{(time_ago / 1.minute).to_i} minutes ago"
        when 1.hour..1.day
            "#{(time_ago / 1.hour).to_i} hours ago"
        when 1.day..1.week
            "#{(time_ago / 1.day).to_i} days ago"
        else
            last_seen_at.strftime('%m/%d/%Y')
        end
    end

    def status_indicator_class
        case online_status
        when 'online'
            'status-online'
        when 'away'
            'status-away'
        else
            'status-offline'
        end
    end
end
