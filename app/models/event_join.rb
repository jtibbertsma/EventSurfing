# == Schema Information
#
# Table name: event_joins
#
#  id          :integer          not null, primary key
#  attender_id :integer
#  event_id    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class EventJoin < ActiveRecord::Base
  belongs_to :event
  belongs_to :attender, class_name: :User

  validates :attender, :event, presence: true
  vaidate :cant_join_an_event_with_no_spots

  private

  def cant_join_an_event_with_no_spots
    if event.spots == 0
      errors.add(:event, "has no spots left")
    end
  end
end
