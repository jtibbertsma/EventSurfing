class CreateCrashRequests < ActiveRecord::Migration
  def change
    create_table :crash_requests do |t|
      t.integer :hoster_id, null: false
      t.integer :requester_id, null: false
      t.boolean :accepted, default: false, null: false

      t.timestamps null: false
    end

    add_index :crash_requests, :hoster_id
    add_index :crash_requests, :requester_id
    add_index :crash_requests, [:hoster_id, :requester_id], unique: true
  end
end
