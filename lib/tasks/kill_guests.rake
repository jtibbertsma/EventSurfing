task :kill_guests do
  User.where(name: 'Guest').destroy_all
end
