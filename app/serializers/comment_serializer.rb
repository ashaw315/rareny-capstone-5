class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body
  has_one :user
  has_one :forum_post
  has_one :comment
end
