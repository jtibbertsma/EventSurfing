class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :place_id, null: false
      t.string :formatted_address, null: false
      t.float :lat, null: false
      t.float :lng, null: false

      t.timestamps null: false
    end
    add_index :places, :place_id, unique: true
  end
end
