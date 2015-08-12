# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


u = User.create(
  name: "Joseph Tibbertsma",
  email: "email@email.com",
  password: "password123"
)

15.times do
  description = 5.times.inject([]) do |memo, _|
    memo << Faker::Lorem.paragraph(10)
  end
  .join("\n")

  Event.create(
    organizer: u,
    title: Faker::Commerce.product_name,
    description: description,
    start_time: Faker::Date.forward(10),
    end_time: Faker::Date.between(10.days.from_now, 15.days.from_now),
    spots: rand(5...15)
  )
end