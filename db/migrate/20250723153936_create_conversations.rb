class CreateConversations < ActiveRecord::Migration[7.1]
  def change
    create_table :conversations do |t|
      t.references :participant_1, null: false, foreign_key: { to_table: :users }
      t.references :participant_2, null: false, foreign_key: { to_table: :users }
      t.datetime :last_message_at

      t.timestamps
    end

    # Add indexes for efficient queries
    add_index :conversations, [:participant_1_id, :participant_2_id], unique: true
    add_index :conversations, :last_message_at
    
    # Add check constraint to ensure participants are different
    execute <<-SQL
      ALTER TABLE conversations ADD CONSTRAINT check_different_participants 
      CHECK (participant_1_id != participant_2_id)
    SQL
  end
end
