# Getting Started with Pound Sand API
Run in terminal for setup and start up
- bundle install
- rails db:migrate db:seed
- rails s

## Description
This application is for keeping track of inventory at multiple sites. The only time the data can be updated or created is after a user is logged in. On creation of the user, on first login user will need to create a new password. If user forgets password, admin user is able to reset and user will be able to create a new password. Sand used and trucks will update site on total use and total on site. 

## File Breakdown