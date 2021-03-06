class Api::MessagesController < Api::ApiController
  def create
    @message = Message.new(message_params)
    if @message.save
      alert_joseph
      render json: @message
    else
      render json: @message.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      render :show
    else
      render json: @message.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    message = Message.find(params[:id])
    message.destroy
    render json: message
  end

  private
    def message_params
      params.require(:message).permit(:subject, :content, :recipient_id)
        .merge(sender_id: current_user.id)
    end

    def alert_joseph
      unless @message.sent_by_joseph?
        MessageMailer.message_alert(@message).deliver_later
      end
    end
end