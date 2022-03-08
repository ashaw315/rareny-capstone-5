class User < ApplicationRecord
    has_secure_password
    has_many :profile_pictures
    has_many :listings
    has_many :comments, dependent: :destroy
    has_many :forum_posts, dependent: :destroy
    has_many :subforums, through: :forum_posts

    validates :username, uniqueness: true
    validates :username, presence: true
    validates :website, presence: true
    validates :discipline, presence: true
    validates :bio, presence: true
end
