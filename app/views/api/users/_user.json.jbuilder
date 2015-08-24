json.extract! user, :id, :name
json.avatar do
  json.extract! user.avatar, :image_url, :thumb_url
end

if user.location
  json.location_title user.location.formatted_address
end

unless bare_bones
  current = user == current_user

  json.current current
  json.email user.email
  json.description_head user.description_head

  if current
    json.sent_messages do
      json.array! user.sent_messages do |message|
        json.extract! message, :id, :updated_at, :content, :recipient_id
        json.subject message.subject && !message.subject.empty? ? message.subject : "(no subject)"
        json.recipient_name message.recipient.name
      end
    end

    json.received_messages do
      json.array! user.received_messages do |message|
        json.extract! message, :id, :updated_at, :content, :sender_id
        json.subject message.subject && !message.subject.empty? ? message.subject : "(no subject)"
        json.sender_name message.sender.name
      end
    end
  end
end