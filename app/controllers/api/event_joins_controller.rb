class Api::EventJoinsController < Api::ApiController
  before_action :ensure_logged_in

  def create
    @event_join = EventJoin.new(
      event_id: params[:event_join][:event_id],
      attender: current_user
    )

    if @event_join.save
      render json: @event_join
    else
      render json: @event_join.errors.full_messages,
             status: :unprocessable_entity
    end
  end

  def destroy
    @event_join = EventJoin.find(params[:id])
    if (current_user != @event_join.attender)
      render json: [], status: :forbidden
    else
      @event_join.destroy
      render json: @event_join
    end
  end
end