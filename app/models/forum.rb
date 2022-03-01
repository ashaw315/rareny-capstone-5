class Forum < ApplicationRecord
    has_many :subforums, dependent: :destroy
    has_many :forum_posts, through: :subforums

end
