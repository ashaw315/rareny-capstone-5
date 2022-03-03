class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user
  has_one :user
  has_one :forum_post

  def user
    object.user.username
  end

end
