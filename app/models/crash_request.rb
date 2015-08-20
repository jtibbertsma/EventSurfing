# == Schema Information
#
# Table name: crash_requests
#
#  id           :integer          not null, primary key
#  hoster_id    :integer          not null
#  requester_id :integer          not null
#  accepted     :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class CrashRequest < ActiveRecord::Base
  belongs_to :hoster, class_name: :User
  belongs_to :requester, class_name: :User

  validates :hoster, :requester, presence: true
end
