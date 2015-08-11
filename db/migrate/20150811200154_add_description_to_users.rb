class AddDescriptionToUsers < ActiveRecord::Migration
  def change
    add_column :users, :description_head, :text
  end
end
