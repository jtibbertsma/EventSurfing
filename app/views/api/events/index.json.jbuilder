json.array! @events do |event|
  json.partial! 'api/events/event', event: event, bare_bones: true
end