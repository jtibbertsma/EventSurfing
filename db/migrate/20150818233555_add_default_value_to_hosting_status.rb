class AddDefaultValueToHostingStatus < ActiveRecord::Migration
  def change
    change_column_default :users, :hosting_status, "Maybe Accepting Guests"
  end
end
