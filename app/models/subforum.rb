class Subforum < ApplicationRecord
  belongs_to :forum
  has_many :forum_posts, dependent: :destroy
  has_many :users, through: :forum_posts

  validates :name, length: { in: 3..32 }, presence: true,
                   uniqueness: { case_sensitive: false }
end
