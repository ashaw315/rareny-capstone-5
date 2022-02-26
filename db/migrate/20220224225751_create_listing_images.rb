class CreateListingImages < ActiveRecord::Migration[6.1]
  def change
    create_table :listing_images do |t|
      t.string :image1
      t.string :image2
      t.string :image3
      t.string :image4
      t.string :image5
      t.belongs_to :listing, null: false, foreign_key: true

      t.timestamps
    end
  end
end
