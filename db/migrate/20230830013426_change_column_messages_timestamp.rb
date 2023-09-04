class ChangeColumnMessagesTimestamp < ActiveRecord::Migration[7.0]
  def change
    remove_column :messages, :status
    add_column :messages, :status, :date
  end
end
