class CreateEventJoins < ActiveRecord::Migration
  def change
    create_table :event_joins do |t|
      t.integer :attender_id
      t.integer :event_id

      t.timestamps null: false
    end
    add_index :event_joins, :attender_id
    add_index :event_joins, :event_id
  end
end
