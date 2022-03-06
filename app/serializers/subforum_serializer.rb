class SubforumSerializer < ActiveModel::Serializer
  attributes :id, :name, :forum, :forum_posts_length 
  has_one :forum
  has_many :users
  has_many :forum_posts
  has_many :comments

  def forum
    object.forum.name
  end

  def forum_posts_length
    object.forum_posts.count
  end

end
