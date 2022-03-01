class RemoveForumIdFromForumPosts < ActiveRecord::Migration[6.1]
  def change
    remove_column :forum_posts, :forum_id, :bigint
  end
end
