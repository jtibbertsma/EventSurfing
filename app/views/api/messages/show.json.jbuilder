json.extract! @message, :id, :content, :updated_at, :recipient_id
json.subject @message.subject && !@message.subject.empty? ? @message.subject : "(no subject)"
json.recipient_name @message.recipient.name