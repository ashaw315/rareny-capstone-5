class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :forum_post
  
  validates :body, length: { in: 2..400 }, presence: true


end
