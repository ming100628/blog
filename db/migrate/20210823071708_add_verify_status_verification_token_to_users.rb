class AddVerifyStatusVerificationTokenToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :verify_status, :bool
    add_column :users, :verify_token, :string
  end
end
