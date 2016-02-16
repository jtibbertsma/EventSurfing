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
#  location_id      :integer
#

class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!
      redirect_to root_url
    else
      render :new
    end
  end
end
