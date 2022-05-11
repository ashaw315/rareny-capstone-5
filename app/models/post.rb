class Post < ApplicationRecord

    validates :title, presence: true
    validates :image1, presence: true
    validates :image2, presence: true
end
