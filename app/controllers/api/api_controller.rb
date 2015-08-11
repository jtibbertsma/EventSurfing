class Api::ApiController < ApplicationController
  protected

  def ensure_logged_in
    unless signed_in?
      render json: {}, status: :forbidden
    end
  end
end