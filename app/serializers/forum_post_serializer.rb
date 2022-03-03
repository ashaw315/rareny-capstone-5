class ForumPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :user, :user_pic, :subforum_name, :userid, :comments
  # has_one :forum
  has_one :subforum
  has_one :user

  has_many :comments

  def user
    object.user.username
  end

  def userid
    object.user.id
  end

  def user_pic
    object.user.profile_picture
  end

  def subforum_name
    object.subforum.name
  end

  def comments
    object.comments
  end

end
