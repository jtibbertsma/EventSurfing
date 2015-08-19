class ChangeLatLngPrecision < ActiveRecord::Migration
  def change
    change_column :places, :lat, :decimal, precision: 10, scale: 6
    change_column :places, :lng, :decimal, precision: 10, scale: 6
  end
end
