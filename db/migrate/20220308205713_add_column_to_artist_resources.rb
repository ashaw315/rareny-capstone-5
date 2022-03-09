class AddColumnToArtistResources < ActiveRecord::Migration[6.1]
  def change
    add_reference :artist_resources, :borough, null: false, foreign_key: true
  end
end
