#DIT grangeMobile App

This project represents my submission for the final assignment for the Social Media Applications module in DIT's part-time Creative Digital Media program.

Please see [the program description here]([http://www.dit.ie/postgrad/programmes/dt539bmscincreativedigitalmediapart-time/).

I used jQuery mobile for the mobile behaviour. The app is set up using a single HTML page where each page has a `data-role="page"` attribute.

##Setup

Clone the project onto a server that supports PHP and you'll need MySQL.

Create a database using the `db_dump\collegedata.sql` dump. Set up your user in `data_endpoint\db_config`.

Load `index.html` into the browser and you're good to go.

##Files and folders

`css\app.css` contains styling for the app that overrides the jQuery Mobile styling. 

`js\app.js` contains the app-specific JavaScript that does the work of getting and presenting data from various APIs and services. 

`img` contains the limited number of images that are used in the page. 
