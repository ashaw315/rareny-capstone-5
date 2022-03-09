class ArtistResource < ApplicationRecord
    belongs_to :borough
    has_many :addresses
end
