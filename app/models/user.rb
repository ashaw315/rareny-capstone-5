class User < ApplicationRecord
    has_secure_password
    has_many :profile_pictures, dependent: :destroy
    has_many :listings, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :forum_posts, dependent: :destroy
    has_many :subforums, through: :forum_posts, source: :subforum

    validates :username, presence: true, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true
    
    # Make these optional for user registration
    validates :website, presence: true, allow_blank: true
    validates :discipline, presence: true, allow_blank: true
    validates :bio, presence: true, allow_blank: true
    
    def member_since
        created_at.strftime("%m/%d/%Y")
    end
end
