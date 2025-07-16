class Listing < ApplicationRecord
  belongs_to :user
  has_many :listing_images, dependent: :destroy

  validates :title, presence: true
  validates :neighborhood, presence: true
  validates :nyc_borough, presence: true
  validates :price, numericality: {
    only_integer: true, 
    greater_than: 0
  }
  validates :sq_footage, numericality: {
    only_integer: true, 
    greater_than: 0
  }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true
  validates :description, presence: true
end
