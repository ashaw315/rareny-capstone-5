class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :website, :discipline, :bio

  has_many :listings
  has_many :comments
  has_many :forum_posts
  
end
