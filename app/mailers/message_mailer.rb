class MessageMailer < ApplicationMailer
  def message_alert(message)
    @message = message
    @sender = message.sender.name
    @recipient = message.recipient.name
    @token = Token.create(token: SecureRandom.urlsafe_base64, user: message.recipient).token
    mail(to: "josephtibbertsma@gmail.com", subject: "Somebody actually sent a message")
  end
end
