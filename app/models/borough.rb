class Borough < ApplicationRecord
    has_many :artist_resources
    has_many :addresses, through: :artist_resources
end
