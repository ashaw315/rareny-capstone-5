class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :forum_post
  belongs_to :comment
  belongs_to :comment, optional: true
  has_many :comments, dependent: :destroy
  validates :body, length: { in: 2..400 }, presence: true
end
