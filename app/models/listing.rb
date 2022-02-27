class Listing < ApplicationRecord
  belongs_to :user
  has_many :listing_images

  validates :title, presence: true
  validates :price, numericality: {
    only_integer: true, 
    greater_than: 0
  }
  validates :sq_footage, numericality: {
    only_integer: true, 
    greater_than: 0
  }
  validates :email, format: /\w+@\w+\.{1}[a-zA-Z]{2,}/, presence: true
  validates :description, presence: true
end
