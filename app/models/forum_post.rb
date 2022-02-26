class ForumPost < ApplicationRecord
  belongs_to :forum
  belongs_to :subforum
  belongs_to :user
end
