source 'https://rubygems.org'
File.open('.ruby-version') do |f|
  ruby f.read.strip
end

gem 'rails', '4.2.3'
gem 'pg'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'bcrypt', '~> 3.1.7'
gem 'backbone-on-rails'
gem 'bootstrap-sass'
gem 'momentjs-rails'
gem 'faker'
gem 'cloudinary'
gem 'figaro'
gem 'rest-client'
gem 'seed_dump'
gem 'router-visualizer'
gem 'pry-rails'

group :production do
  gem 'rails_12factor'
  gem 'puma'
end

group :development, :test do
  gem 'byebug'
  gem 'web-console', '~> 2.0'
  gem 'spring'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'annotate'
  gem 'bullet'
  # open emails in browser
  gem 'letter_opener'
  gem 'letter_opener_web', '~> 1.2.0'
end
