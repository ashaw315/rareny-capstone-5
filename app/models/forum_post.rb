class ForumPost < ApplicationRecord
  # belongs_to :forum
  belongs_to :subforum
  belongs_to :user
  has_many :comments, dependent: :destroy


  validates :title, length: { in: 3..48 }, presence: true
  validates :body, length: { in: 8..20_000 }, presence: true
end
