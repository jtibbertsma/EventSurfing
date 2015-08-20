json.extract! user, :id, :name
json.avatar do
  json.extract! user.avatar, :image_url, :thumb_url
end

unless bare_bones
  json.current user == current_user
  json.email user.email
  json.description_head user.description_head
end