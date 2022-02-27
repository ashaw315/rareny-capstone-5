class Post < ApplicationRecord

    validates :title, presence: true
    validates :image1, presence: true
    # validates :image1, format: { with: URI.regexp }, if: 'image1.present?'
    validates :image2, presence: true
    # validates :url, :url => true
end
