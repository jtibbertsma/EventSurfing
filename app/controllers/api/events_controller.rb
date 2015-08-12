class Api::EventsController < Api::ApiController
  before_action :ensure_logged_in

  def index
    @events = Event.all
  end

  def show
    @event = Event.find(params[:id])
    unless @event
      render json: {}, status: :not_found
    end
  end
end