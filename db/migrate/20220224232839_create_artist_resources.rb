class CreateArtistResources < ActiveRecord::Migration[6.1]
  def change
    create_table :artist_resources do |t|
      t.string :name
      t.string :location
      t.integer :phone
      t.text :description
      t.string :website

      t.timestamps
    end
  end
end
