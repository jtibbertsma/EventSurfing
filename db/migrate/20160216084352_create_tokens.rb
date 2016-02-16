class CreateTokens < ActiveRecord::Migration
  def change
    create_table :tokens do |t|
      t.string :token, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end
    add_index :tokens, :token, unique: true
  end
end
