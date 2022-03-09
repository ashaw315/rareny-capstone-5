class ArtistResource < ApplicationRecord
    belongs_to :borough
    has_one :address
end
