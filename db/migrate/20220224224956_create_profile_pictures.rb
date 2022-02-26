class CreateProfilePictures < ActiveRecord::Migration[6.1]
  def change
    create_table :profile_pictures do |t|
      t.string :picture
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
