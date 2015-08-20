# == Schema Information
#
# Table name: places
#
#  id                :integer          not null, primary key
#  place_id          :string           not null
#  formatted_address :string           not null
#  lat               :decimal(10, 6)   not null
#  lng               :decimal(10, 6)   not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Place < ActiveRecord::Base
  has_many :events, foreign_key: :location_id

  validates :place_id, :formatted_address, :lat, :lng, presence: true
  validates :place_id, uniqueness: true
end
