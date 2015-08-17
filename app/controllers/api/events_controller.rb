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

  def create
    @event = Event.new(event_params)
    if @event.save
      Image.create(image_params)   # Just ignore if unsuccessful
      render json: @event
    else
      render json: @event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params)
      Image.create(image_params)   # Just ignore if unsuccessful
      render json: @event
    else
      render json: @event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    render json: @event
  end

  private

  def event_params
    params.require(:event).permit(
      :title, :description, :start_time, :end_time, :spots,
    ).merge(organizer: current_user)
  end

  def image_params
    params.permit(:image_url, :thumb_url).merge(imageable: @event)
  end
end