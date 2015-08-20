# == Schema Information
#
# Table name: events
#
#  id           :integer          not null, primary key
#  organizer_id :integer          not null
#  title        :string           not null
#  description  :text             not null
#  start_time   :datetime         not null
#  end_time     :datetime
#  spots        :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  location_id  :integer          not null
#

class Event < ActiveRecord::Base
  belongs_to :organizer, class_name: :User
  belongs_to :location, class_name: :Place
  has_many :event_joins, dependent: :destroy
  has_many :attenders, through: :event_joins, source: :attender

  has_one :background, class_name: :Image, as: :imageable, dependent: :destroy

  validates :organizer, :title, :description, :start_time, :location, presence: true

  after_save :default_background
  after_save :join_organizer

  def spots_remaining
    return nil if spots.nil?

    spots - attenders.count
  end

  private

  def join_organizer
    EventJoin.find_or_create_by(attender: organizer, event: self)
  end

  def default_background
    background || Image.create(
      image_url: "http://batescreative.com/wp-content/themes/batescreative_02/library/img/default-page-background.jpg",
      thumb_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIYm8bc4lyF1dW5mrcXGgnUfZ43Vujxkf3oZ3sJhLu-Eq_EXGQ",
      imageable: self
    )
  end
end
