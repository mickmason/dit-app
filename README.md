#DIT grangeMobile App

This project represents my submission for the final assignment for the Social Media Applications module in DIT's part-time Creative Digital Media program.

Please see [the program description here]([http://www.dit.ie/postgrad/programmes/dt539bmscincreativedigitalmediapart-time/).

I used jQuery mobile for the mobile behaviour. The app is set up using a single HTML page where each page has a `data-role="page"` attribute. I will recreate this using AngularJS and a Google Materials CSS framework as that is the basis for the app style. 

##Setup

Clone the project onto a server that supports PHP and you'll need MySQL.

Create a database using the `db_dump\collegedata.sql` dump. Set up your user in `data_endpoint\db_config`.

Load `index.html` into the browser and you should be good to go.

##Files and folders

###`css\app.css` 

This contains styling for the app that overrides the jQuery Mobile styling. 

Styling could be improved a lot. I used Google Materials Design for the styling and ended up in a wrestling match with jQuery Mobile styling. Needs to change.

###`js\app.js` 

This contains the app-specific JavaScript that does the work of getting and presenting data from various APIs and services. 

###`img` 

Contains the limited number of images that are used in the page. 

###`data-endpoint` 

This is *nearly* an API. It needs some work to get it there yet. Either way, app.js makes most of its queries through the php files there. Most of the files are named fairly obviously. 

####`json-data-google-directions.php` 

This is possibly of interest. It takes an origin, and endpoint and a travel mode and creates uses those to send a request to the [Google Maps API Web Services](https://developers.google.com/maps/documentation/webservices/). This is done on the server as the maps service issues a server api key rather than a client one. 

The returned data from Google Maps is encoded as JSON and it contains one or more possible routes, each of which is comprise of one or more legs, with start and end coordinates for each and a HTML description for each. It also includes a set of encoded [Maps polyline points](https://developers.google.com/maps/documentation/utilities/polylinealgorithm). I use [`includes\Polyline.php`](https://github.com/emcconville/google-map-polyline-encoding-tool) to decode the points. I pass each encoded point to `Polyline.php` and get back a coordinate for each - even = latitude, odd = longitute. That is added to an array, and the array is added to the JSON to be returned. 

In `app.js' I get out the value for each coordinate and create a Google Maps polyline instance whose path is the returned coordinate values. 

The HTML descriptions are appended to the Get Directions page. 

All other PHP scripts do what they say on the tin.
