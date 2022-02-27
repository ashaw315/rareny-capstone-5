class AddNewColumnsToListings < ActiveRecord::Migration[6.1]
  def change
    add_column :listings, :neighborhood, :string
    add_column :listings, :nyc_borough, :string
  end
end
