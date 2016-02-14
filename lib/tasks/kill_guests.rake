task :kill_guests => :environment do
  User.where(name: 'Guest').destroy_all
end
