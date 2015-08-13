class AddIndexToEventJoins < ActiveRecord::Migration
  def change
    add_index :event_joins, [:event_id, :attender_id], unique: true
  end
end
