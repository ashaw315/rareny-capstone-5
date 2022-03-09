class ChangeIntegerLimitInArtistResources < ActiveRecord::Migration[6.1]
  def change
    change_column :artist_resources, :phone, :integer, limit: 8
  end
end
