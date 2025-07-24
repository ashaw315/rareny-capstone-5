class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.references :sender, null: false, foreign_key: { to_table: :users }
      t.references :recipient, null: false, foreign_key: { to_table: :users }
      t.references :conversation, null: false, foreign_key: true
      t.text :content, null: false
      t.datetime :read_at

      t.timestamps
    end

    # Add indexes for efficient queries (conversation_id index created automatically by references)
    add_index :messages, [:recipient_id, :read_at]
    add_index :messages, :created_at
    add_index :messages, [:sender_id, :created_at]
  end
end
