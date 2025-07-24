class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :recipient, class_name: 'User'
  belongs_to :conversation

  validates :content, presence: true, length: { maximum: 1000 }
  validates :sender, presence: true
  validates :recipient, presence: true
  validates :conversation, presence: true
  validate :sender_and_recipient_must_be_different
  validate :sender_and_recipient_must_match_conversation

  scope :unread, -> { where(read_at: nil) }
  scope :read, -> { where.not(read_at: nil) }
  scope :recent, -> { order(:created_at) }
  scope :for_user, ->(user) { where('sender_id = ? OR recipient_id = ?', user.id, user.id) }

  after_create :update_conversation_timestamp
  after_create :broadcast_to_conversation

  def read?
    read_at.present?
  end

  def unread?
    read_at.nil?
  end

  def mark_as_read!
    return if read?
    update!(read_at: Time.current)
  end

  def sent_by?(user)
    sender == user
  end

  def received_by?(user)
    recipient == user
  end

  private

  def sender_and_recipient_must_be_different
    return unless sender && recipient
    
    if sender_id == recipient_id
      errors.add(:recipient, "can't be the same as sender")
    end
  end

  def sender_and_recipient_must_match_conversation
    return unless conversation && sender && recipient
    
    unless conversation.involves_user?(sender) && conversation.involves_user?(recipient)
      errors.add(:conversation, "must involve both sender and recipient")
    end
  end

  def update_conversation_timestamp
    conversation.update_last_message_time!
  end

  def broadcast_to_conversation
    ActionCable.server.broadcast(
      "conversation_#{conversation.id}",
      {
        type: 'new_message',
        message: {
          id: id,
          content: content,
          sender_id: sender_id,
          recipient_id: recipient_id,
          created_at: created_at.iso8601,
          read_at: read_at&.iso8601,
          sender: {
            id: sender.id,
            username: sender.username
          }
        }
      }
    )
  end
end