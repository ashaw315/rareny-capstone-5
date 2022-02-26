class ListingImageSerializer < ActiveModel::Serializer
  attributes :id, :image1, :image2, :image3, :image4, :image5
  has_one :listing
end
