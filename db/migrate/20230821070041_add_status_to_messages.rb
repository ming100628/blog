class AddStatusToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :status, :boolean, default: false
  end
end
