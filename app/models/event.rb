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
#

class Event < ActiveRecord::Base
  belongs_to :organizer, class_name: :User
  has_many :event_joins
  has_many :attenders, through: :event_joins, source: :attender

  validates(
    :organizer,
    :title,
    :description,
    :start_time,
    presence: true
  )

  after_save :join_organizer

  private

  def join_organizer
    EventJoin.create(attender: organizer, event: self)
  end
end
