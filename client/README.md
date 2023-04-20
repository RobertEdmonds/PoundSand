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



### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
