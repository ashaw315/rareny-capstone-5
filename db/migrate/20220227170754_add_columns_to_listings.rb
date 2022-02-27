class AddColumnsToListings < ActiveRecord::Migration[6.1]
  def change
    add_column :listings, :image1, :string
    add_column :listings, :image2, :string
    add_column :listings, :image3, :string
    add_column :listings, :image4, :string
    add_column :listings, :image5, :string
  end
end
