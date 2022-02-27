class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :sq_footage, :email, :description, :image1, :image2, :image3, :image4, :image5, :neighborhood, :nyc_borough
  has_one :user
end
