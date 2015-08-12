class EventJoin < ActiveRecord::Base
  belongs_to :event
  belongs_to :attender, class_name: :User

  validates :attender, :event, presence: true
end
