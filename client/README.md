# Getting Started with Pound Sand Client
Run these commands in the terminal before starting.
- `bundle install`
- `npm start`

## Description
This application is for keeping track of inventory at multiple sites. It has the capability to switch views on compiled data by date and shipment. Also complete sites to just a view without the ability of updating site. This application saves time on reviewing information and limit human error on a spreadsheet.

## File Breakdown
- src folder
    - App.js
        - Pulls the user from API and switches from authorized and unauthorized user
    - index.js 
        - Render the application on the client-side server
    - authenticate folder 
        - Authenticated.js
            - Splits up the routes for the authorized user
            - fetches sites and completed sites from API
            - Handles local storage for page display
            - Adds sites, truck loads, and uses of sand
        - Unauthenticated.js
            - Displays route for unauthorized user 
            - Pushes for login only
    - components folder
        - DisplayNav.js
            - control panel for adding truck loads, using sand, and adjusting views
        - DisplaySand.js
            - modal for showing sand usage that matches specific date and site
        - DisplaySite.js
            - connected to display nav for adjusting view 
            - displays sand use and truck drop off at maximum per day
        - DisplayTruck.js
            - modal for showing truck loads that matches specific date and site
        - Header.js
            - shows what job site your on and name of application
        - Homepage.js
            - displays options of different active and completed sites
        - User.js
            - ability to lookup and reset password and admin level
    - forms folder
        - DownHole.js
            - add sand used on job site
        - Login.js
            - employee login landing page
        - ResetPW.js
            - new employee to set their own password
        - SandSite.js
            - adds new site for delivery and sand uses
        - SetPWReset.js
            - if employee forgets password this will reset it to backup password for a one time use
        - TruckLoad.js
            - add truck load to pile on site
        - UserAdmin.js
            - adjust admin level of employee
