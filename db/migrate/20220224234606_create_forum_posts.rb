class CreateForumPosts < ActiveRecord::Migration[6.1]
  def change
    create_table :forum_posts do |t|
      t.string :title
      t.text :body
      t.belongs_to :forum, null: false, foreign_key: true
      t.belongs_to :subforum, null: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
