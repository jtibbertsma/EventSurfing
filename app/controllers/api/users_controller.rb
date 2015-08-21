class Api::UsersController < Api::ApiController
  before_action :ensure_logged_in

  def show
    @user = User.find(params[:id])
    unless @user
      render json: {}, status: :not_found
    end
  end

  def update
    location = Place.find_by(place_id: location_params[:place_id])
    location = Place.create(location_params) unless location
    @user = User.find(params[:id])
    @user.location = location if location
    if @user.update(user_params)
      Image.create(image_params)
      render json: @user
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :description_head)
  end

  def image_params
    params.permit(:image_url, :thumb_url).merge(imageable: @user)
  end
end