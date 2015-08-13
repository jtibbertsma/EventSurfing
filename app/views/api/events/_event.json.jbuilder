json.extract! event, :id, :title, :start_time, :end_time
json.num_attenders event.attenders.count

join = event.event_joins.where(attender_id: current_user.id)

if join
  json.join join.first
end

unless bare_bones
  json.spots_remaining event.spots && event.spots - event.attenders.count
  json.description event.description
  json.organizer_name event.organizer.name
end