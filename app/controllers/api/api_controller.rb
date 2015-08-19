class Api::ApiController < ApplicationController
  protected

  def ensure_logged_in
    unless signed_in?
      render json: {}, status: :forbidden
    end
  end

  def location_params
    params.require(:location).permit(:place_id, :formatted_address, :lat, :lng)
  end
end