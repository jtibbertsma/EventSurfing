class Api::EventsController < Api::ApiController
  before_action :ensure_logged_in

  def index
    @events = Event.includes(:location).all
  end

  def show
    @event = Event.includes(:organizer, :location).find(params[:id])
  end

  def create
    location = Place.find_by(place_id: location_params[:place_id])
    location = Place.create(location_params) unless location
    @event = Event.new(event_params)
    @event.location = location
    if @event.save
      i = Image.create(image_params)   # Just ignore if unsuccessful
      #fail
      render :show
    else
      render json: @event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    location = Place.find_by(place_id: location_params[:place_id])
    location = Place.create(location_params) unless location
    @event = Event.find(params[:id])
    @event.location = location unless location.place_id.empty?
    if @event.update(event_params)
      Image.create(image_params)   # Just ignore if unsuccessful
      render :show
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