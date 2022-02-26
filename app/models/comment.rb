class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :forum_post
  belongs_to :comment
end
