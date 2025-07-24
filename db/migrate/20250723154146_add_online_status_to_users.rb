class AddOnlineStatusToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :online_status, :string, default: 'offline', null: false
    add_column :users, :last_seen_at, :datetime
    
    # Add index for efficient online user queries
    add_index :users, :online_status
    add_index :users, :last_seen_at
  end
end
