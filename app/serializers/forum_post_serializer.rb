class ForumPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :user, :user_pic, :subforum_name
  # has_one :forum
  has_one :subforum
  has_one :user

  def user
    object.user.username
  end

  def user_pic
    object.user.profile_picture
  end

  def subforum_name
    object.subforum.name
  end

end
