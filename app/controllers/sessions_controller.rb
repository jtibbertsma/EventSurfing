class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      user_params[:email],
      user_params[:password]
    )

    if @user
      redirect_to root_url
    else
      login!
      @user = User.new
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end