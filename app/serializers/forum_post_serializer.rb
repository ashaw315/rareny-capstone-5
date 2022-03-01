class ForumPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body
  # has_one :forum
  has_one :subforum
  has_one :user
end
