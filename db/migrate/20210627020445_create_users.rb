class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|

      t.timestamps
      t.string :username
      t.string :password
      t.string :token

    end
  end
end
