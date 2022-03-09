class BoroughSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :artist_resources
end
