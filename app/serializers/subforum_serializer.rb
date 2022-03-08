class SubforumSerializer < ActiveModel::Serializer
  attributes :id, :name, :forum, :forum_posts_length, :post_date, :forum_id
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

  def post_date
    object.created_at.strftime('%m/%d/%Y')
  end
  
  def forum_id
    object.forum.id
  end

end
