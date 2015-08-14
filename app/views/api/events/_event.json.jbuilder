json.extract! event, :id, :title, :start_time, :end_time, :organizer_id
json.num_attenders event.attenders.count

join = event.event_joins.where(attender_id: current_user.id)
json.spots_remaining event.spots && event.spots - event.attenders.count

unless join.empty?
  json.join join.first
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