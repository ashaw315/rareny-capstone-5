class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :website, :discipline, :bio, :member_since

  has_many :listings
  has_many :comments
  has_many :forum_posts
  has_many :subforums

  def member_since
    object.created_at.strftime('%m/%d/%Y')
  end
  
end
