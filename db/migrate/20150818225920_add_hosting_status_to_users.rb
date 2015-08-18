class AddHostingStatusToUsers < ActiveRecord::Migration
  def change
    add_column :users, :hosting_status, :string, null: false
  end
end
