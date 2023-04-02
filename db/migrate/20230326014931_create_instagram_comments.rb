class CreateInstagramComments < ActiveRecord::Migration[7.0]
  def change
    create_table :instagram_comments do |t|
      t.integer :photo_id
      t.integer :user_id
      t.string :content
      t.timestamps
    end
  end
end
