source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "~> 3.0.0"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.4"

# Use sqlite3 as the database for Active Record
# gem "sprockets-rails"
# Use the Puma web server [https://github.com/puma/puma]
# gem "importmap-rails"
gem "puma", "~> 5.0"

# gem 'redis'

gem "bcrypt", "~> 3.1.7"
gem 'active_model_serializers'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem "rack-cors"

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
  # gem "sqlite3", "~> 1.4"
end

group :development do
  gem 'listen', '~> 3.3'
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  gem "spring"
end

# group :production do 

# end
gem "pg", "~> 1.5"


# gem "rack-cors", "~> 2.0"
