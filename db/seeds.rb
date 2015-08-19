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
    description_head: make_description,
    hosting_status: User::HOSTING_STATUSES.sample
  )
end

# Create 15 events owned by other users
events = 15.times.inject(Event.all.to_a) do |memo, _|
  event = Event.create(
    organizer: other_users.sample,
    title: Faker::Company.bs,
    description: make_description,
    start_time: Faker::Date.forward(9),
    end_time: Faker::Date.between(10.days.from_now, 15.days.from_now),
    spots: rand(5...15)
  )

  res = RestClient.get("http://www.splashbase.co/api/v1/images/random")
  res = JSON.parse(res)
  image_params = {
    image_url: res["url"],
    thumb_url: "http://at-cdn-s01.audiotool.com/2012/07/13/" +
               "documents/hahaha_silly_remix_competition/1/" +
               "cover256x256-2284b20b805049ad823c7314cf0e466e.jpg",
    imageable: event
  }

  Image.create(image_params)

  memo << event
end

# Have each user join 3 events
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
