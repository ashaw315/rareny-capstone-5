class CreateResidencies < ActiveRecord::Migration[6.1]
  def change
    create_table :residencies do |t|
      t.string :name
      t.string :deadline
      t.boolean :free
      t.text :description

      t.timestamps
    end
  end
end
