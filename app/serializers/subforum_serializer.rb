class SubforumSerializer < ActiveModel::Serializer
  attributes :id, :name, :forum
  has_one :forum
  has_many :users
  has_many :forum_posts
  has_many :comments

  def forum
    object.forum.name
  end

end
