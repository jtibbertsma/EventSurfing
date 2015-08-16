json.extract! user, :id, :name, :description_head
json.avatar do
  json.extract! user.avatar, :image_url, :thumb_url
end