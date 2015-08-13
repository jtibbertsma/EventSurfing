class Api::EventsController < Api::ApiController
  before_action :ensure_logged_in

  def index
    @events = Event.includes(:attenders).all
  end

  def show
    @event = Event.find(params[:id])
    unless @event
      render json: {}, status: :not_found
    end
  end

  def current
    @events = current_user.joined_events
    render :index
  end
end