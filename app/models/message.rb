# == Schema Information
#
# Table name: messages
#
#  id           :integer          not null, primary key
#  sender_id    :integer          not null
#  recipient_id :integer          not null
#  content      :text             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  subject      :string
#

class Message < ActiveRecord::Base
  belongs_to :recipient, class_name: :User
  belongs_to :sender, class_name: :User

  validates :sender, :recipient, :content, presence: true

  def sent_by_joseph?
    sender.email == "email@email.com"
  end
end
