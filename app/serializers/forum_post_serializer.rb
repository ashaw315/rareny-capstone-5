class ForumPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :user, :subforum_name, :subforum_id, :userid, :comments, :title_summary, :post_date
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

  def subforum_name
    object.subforum.name
  end

  def subforum_id
    object.subforum.id
  end

  def comments
    object.comments
  end

  def title_summary
    "#{object.title[0..20]}..."
  end

  def post_date
    object.created_at.strftime('%m/%d/%Y')
  end


end
