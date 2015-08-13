json.extract! event, :id, :title, :start_time, :end_time
json.num_attenders event.attenders.count

unless bare_bones
  json.spots_remaining event.spots && event.spots - event.attenders.count
  json.description event.description
  json.organizer_name event.organizer.name
  json.organizer_id event.organizer.id
end