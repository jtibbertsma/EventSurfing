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
      login!
    else
      @user = User.new
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end

  def login_from_token
    @token = Token.find_by_token(params[:token])
    if @token
      login_and_delete_token!
      redirect_to root_url
    else
      redirect_to new_session_url
    end
  end

  private
    def login_and_delete_token!
      @user = @token.user
      login!
      @token.destroy
    end
end