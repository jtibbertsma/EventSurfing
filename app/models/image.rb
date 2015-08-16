# == Schema Information
#
# Table name: images
#
#  id             :integer          not null, primary key
#  imageable_id   :integer          not null
#  imageable_type :string           not null
#  image_url      :string           not null
#  thumb_url      :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Image < ActiveRecord::Base
  belong_to :imageable, polymorphic: true

  validates :imageable, :image_url, :thumb_url, presence: true
end
