class Place < ActiveRecord::Base
  has_many :events, foreign_key: :location_id

  validates :place_id, :formatted_address, :lat, :lng, presence: true
  validates :place_id, uniqueness: true
end
