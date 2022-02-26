class AddressSerializer < ActiveModel::Serializer
  attributes :id, :street, :city, :state, :zip
  has_one :artist_resource
end
