json.extract! event, :id, :title, :start_time, :end_time, :organizer_id
json.num_attenders event.attenders.count

json.spots_remaining event.spots_remaining

join = event.event_joins.where(attender_id: current_user.id).first
unless join.nil?
  json.join do
    json.extract! join, :id, :attender_id
  end
end

unless bare_bones
  json.spots event.spots

  json.background do
    json.extract! event.background, :image_url, :thumb_url
  end

  json.description event.description
  json.organizer_name event.organizer.name

  json.attenders do
    json.array! event.attenders.includes(:avatar) do |attender|
      json.partial! 'api/users/user', user: attender, bare_bones: true
    end
  end
end