class RemoveCommentIdFromComments < ActiveRecord::Migration[6.1]
  def change
    remove_column :comments, :comment_id, :bigint
  end
end
