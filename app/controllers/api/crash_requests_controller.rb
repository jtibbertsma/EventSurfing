class Api::CrashRequestsController < Api::ApiController
  def create
    request = CrashRequest.new
    if request.save(crash_request_params)
      render json: request
    else
      render json: request.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    request = CrashRequest.find(params[:id])
    if request.update(crash_request_params)
      render json: request
    else
      render json: request.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    request = CrashRequest.find(params[:id])
    request.destroy
    render json: request
  end

  private

  def crash_request_params
    params.require(:crash_request).permit(
      :hoster_id, :accepted
    ).merge(requester_id: current_user.id)
  end
end