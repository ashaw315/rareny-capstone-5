class Conversation < ApplicationRecord
  belongs_to :participant_1, class_name: 'User'
  belongs_to :participant_2, class_name: 'User'
  has_many :messages, dependent: :destroy

  validates :participant_1, presence: true
  validates :participant_2, presence: true
  validate :participants_must_be_different

  scope :involving_user, ->(user) { where('participant_1_id = ? OR participant_2_id = ?', user.id, user.id) }
  scope :by_recent_activity, -> { order(last_message_at: :desc, created_at: :desc) }

  def self.between(user1, user2)
    where(
      '(participant_1_id = ? AND participant_2_id = ?) OR (participant_1_id = ? AND participant_2_id = ?)',
      user1.id, user2.id, user2.id, user1.id
    ).first
  end

  def self.find_or_create_between(user1, user2)
    conversation = between(user1, user2)
    return conversation if conversation

    # Always put the user with the smaller ID as participant_1 for consistency
    if user1.id < user2.id
      create!(participant_1: user1, participant_2: user2)
    else
      create!(participant_1: user2, participant_2: user1)
    end
  end

  def other_participant(current_user)
    return participant_2 if participant_1 == current_user
    return participant_1 if participant_2 == current_user
    nil
  end

  def involves_user?(user)
    participant_1 == user || participant_2 == user
  end

  def last_message
    messages.order(:created_at).last
  end

  def unread_count_for(user)
    messages.where(recipient: user, read_at: nil).count
  end

  def mark_as_read_for(user)
    messages.where(recipient: user, read_at: nil).update_all(read_at: Time.current)
  end

  def update_last_message_time!
    update!(last_message_at: Time.current)
  end

  private

  def participants_must_be_different
    return unless participant_1 && participant_2
    
    if participant_1_id == participant_2_id
      errors.add(:participant_2, "can't be the same as participant 1")
    end
  end
end