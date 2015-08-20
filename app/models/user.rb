# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  name             :string           not null
#  email            :string           not null
#  session_token    :string           not null
#  password_digest  :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  description_head :text
#  hosting_status   :string           default("Maybe Accepting Guests"), not null
#

class User < ActiveRecord::Base
  has_many :organized_events, class_name: :Event, foreign_key: :organizer_id
  has_many :event_joins, foreign_key: :attender_id, dependent: :destroy
  has_many :joined_events, through: :event_joins, source: :event

  has_one :avatar, class_name: :Image, as: :imageable, dependent: :destroy

  attr_reader :password

  validates(
    :name,
    :email,
    :session_token,
    :password_digest,
    presence: true
  )
  
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  after_save :default_avatar

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    user if user && user.is_password?(password)
  end

  def self.new_session_token
    SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.new_session_token
    save!
    session_token
  end

  private

  def ensure_session_token
    self.session_token ||= User.new_session_token
  end

  def default_avatar
    avatar || Image.create(
      image_url: "http://vic.iabc.com/wp-content/uploads/2013/04/default-user-image.png",
      thumb_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh8m1kcPPGnI3lDmIk_85tVkyPzCOz5GsTaglwcXhG8iwwGU2l",
      imageable: self
    )
  end
end
