json.extract! event, :id, :title, :start_time, :end_time, :organizer_id
json.num_attenders event.attenders.count

json.spots_remaining event.spots_remaining

if join = event.event_joins.where(attender_id: current_user.id).first
  json.join do
    json.extract! join, :id, :attender_id
  end
end

unless bare_bones
  json.description event.description
  json.organizer_name event.organizer.name

  json.attenders do
    json.array! event.attenders do |attender|
      json.extract! attender, :id, :name
    end
  end
end