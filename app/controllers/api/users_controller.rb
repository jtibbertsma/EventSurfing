class Api::UsersController < Api::ApiController
  before_action :ensure_logged_in

  def show
    @user = User.find(params[:id])
    unless @user
      render json: {}, status: :not_found
    end
  end
end