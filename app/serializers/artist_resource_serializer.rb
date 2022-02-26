class ArtistResourceSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :phone, :description, :website
end
