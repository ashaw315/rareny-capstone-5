class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :price, :sq_footage, :email, :description, :image1, :image2, :image3, :image4, :image5, :neighborhood, :nyc_borough, :created_at, :listing_summary, :post_date
  has_one :user

  def created_at
    object.created_at.strftime('%A, %B %e, %Y')
  end

  # def price
  #     "$#{'%.2f' % object.price}"
  # end

  def listing_summary
    "#{object.title[0..20]}..."
  end

  def post_date
    object.created_at.strftime('%m/%d/%Y')
  end

  
end
