class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer  :organizer_id, null: false
      t.string   :title,        null: false
      t.text     :description,  null: false
      t.datetime :start,        null: false
      t.datetime :end
      t.integer  :spots

      t.timestamps null: false
    end
    add_index :events, :organizer_id
  end
end
