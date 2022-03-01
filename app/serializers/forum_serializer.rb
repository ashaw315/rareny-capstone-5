class ForumSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :subforums
end
