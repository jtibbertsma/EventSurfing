class Api::MessagesController < Api::ApiController
  def create
    @message = Message.new(message_params)
    if @message.save
      render json: @message
    else
      render json: @message.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:subject, :content, :recipient_id)
      .merge(sender_id: current_user.id)
  end
end