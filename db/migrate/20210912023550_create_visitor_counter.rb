class CreateVisitorCounter < ActiveRecord::Migration[6.1]
  def change
    create_table :visitor_counters do |t|

      t.timestamps
      t.string :user_agent
      t.string :ip
    end
  end
end
