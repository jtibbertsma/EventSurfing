# == Schema Information
#
# Table name: tokens
#
#  id         :integer          not null, primary key
#  token      :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Token < ActiveRecord::Base
  belongs_to :user
  validates :user, :token, presence: true
end
