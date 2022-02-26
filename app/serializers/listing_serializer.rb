class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :sq_footage, :email, :description
  has_one :user
end
