class SubforumSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :forum
  has_many :users
  has_many :forum_posts
end
