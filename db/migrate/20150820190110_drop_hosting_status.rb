class DropHostingStatus < ActiveRecord::Migration
  def change
    remove_column :users, :hosting_status
  end
end
