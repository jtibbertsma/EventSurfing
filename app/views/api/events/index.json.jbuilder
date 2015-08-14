json.main do
  json.array! @events do |event|
    json.partial! 'api/events/event', event: event, bare_bones: true
  end
end

json.organized do
  json.array! current_user.organized_events do |event|
    json.partial! 'api/events/event', event: event, bare_bones: true
  end
end

json.joined do
  json.array! current_user.joined_events do |event|
    json.partial! 'api/events/event', event: event, bare_bones: true
  end
end