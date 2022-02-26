class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :image1
      t.string :image2

      t.timestamps
    end
  end
end
