# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def make_description
  rand(2...7).times.inject([]) do |memo, _|
    memo << Faker::Lorem.paragraph(10)
  end
  .join("\n")
end

test_user = User.create(
  name: "Joseph Tibbertsma",
  email: "email@email.com",
  password: "password123",
  description_head: make_description
)

# Create 3 events owned by test user
3.times do
  Event.create(
    organizer: test_user,
    title: Faker::Company.bs,
    description: make_description,
    start_time: Faker::Date.forward(10),
    end_time: Faker::Date.between(10.days.from_now, 15.days.from_now),
    spots: rand(5...15)
  )
end

# Create 30 more users
other_users = 30.times.inject([]) do |memo, _|
  memo << User.create(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password: Faker::Internet.password,
    description_head: make_description
  )
end

# Create 15 events owned by other users
15.times do
  Event.create(
    organizer: other_users.sample,
    title: Faker::Company.bs,
    description: make_description,
    start_time: Faker::Date.forward(10),
    end_time: Faker::Date.between(10.days.from_now, 15.days.from_now),
    spots: rand(5...15)
  )
end

# Have each user join 3 events
events = Event.all.to_a
User.all.each do |user|
  3.times do
    # Ignore attemps to create duplicate event joins
    begin
      EventJoin.create(
        attender: user,
        event: events.sample
      )
    rescue ActiveRecord::RecordNotUnique
    end
  end
end
