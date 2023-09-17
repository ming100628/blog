class AddTableBlocks < ActiveRecord::Migration[7.0]
  def change
    create_table :blocks do |t|
      t.timestamps
      t.integer :blocked_id
      t.integer :blocker_id
    end
  end
end
