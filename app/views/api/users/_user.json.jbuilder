json.extract! user, :id, :name
json.avatar do
  json.extract! user.avatar, :image_url, :thumb_url
end

unless bare_bones
  json.description_head user.description_head
end