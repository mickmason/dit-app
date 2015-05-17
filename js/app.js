	//Used to identify a type of user and if a user is logged in.
	var userType = "student";
	var userID = 126;
	//User identifies themselves 
	$('#lecturer-user').on('click', function(e) {
		e.preventDefault();
		$('body').addClass("lecturer-user");
		document.cookie = "DITUser=true" ;
		$('#user-modal').css('display', 'none') ;
		alert('Thanks, you can change user type via the main menu') ;

	});
	$('#student-user').on('click', function(e) {
		e.preventDefault();
		$('body').addClass("student-user");
		document.cookie = "DITUser=true" ;
		$('#user-modal').css('display', 'none') ;
		alert('Thanks, you can change user type via the main menu') ;
	});

	var getAJAXData = function(url, success, xd) {
		
		$.ajax(url, {
		  success: success
		});
	}
	var getData = function(path, cb) {
		$.getJSON(path, function (data) {	

			if (data) {
				
				return cb(data);	
			} else {
				return cb("Sorry no data");
			}
			
		}) ;		
	}
	var checkUser = function() {
		if (document.cookie.indexOf("DITUser=true") == -1) {
			$('#user-modal').css('display', 'block') ;
		}
	}
	//Shows one module - added to the #module page
	var showOneModule = function(data) {
		//Get the module page object
		var modPage = $('#module') ;
		//For paras to be appended - each contains some data about the module
		var paras = [] ;
		for (var i=0; i<data.modules.length; i++) {
			//Add title to the app bar
			modPage.find('.inner-header').find('h3').text(data.modules[i].moduleName);
			//ECT credits
			paras.push($('<p></p>').attr('class', 'mod-credits').append("ECT credits: "+data.modules[i].credits));
			//Module due date
			paras.push($('<p></p>').attr('class', 'mod-duedate').append("Due date: "+data.modules[i].dueDate));
			//Make a link to the module website
			var website = $('<a></a>').attr({'href': data.modules[i].website }).text(data.modules[i].website);
			//Append that prefixed with "Website"
			paras.push($('<p></p>').attr('class', 'mod-website').append("Website: ").append(website));
			//Room no
			paras.push($('<p></p>').attr('class', 'mod-room').append("Room: "+data.modules[i].room));

		}		
		//Clear the #module page
		modPage.find('.mod-full').text('') ;
		//For each para 
		for (var i in paras) {
			//Append to the module page
			modPage.find('.mod-full').append(paras[i]) ;
		}
	}//showMyModulesData()
	//For the module link (any module link in any content) delegate a click/tap handler 
	$(document).on('click', '.module-link', function() {
		var id = $(this).attr('data-modid') ;
		//Get the data for the module - the id is added as data-modid attribute to the element
		getData('data_endpoint/json-data-single-module.php?moduleid='+id, showOneModule) ;
	}) ;
	//A utility function that makes a list of modules. Takes a module and returns a <article> element containing the name, a link to the module full page.
	//It's used by showMyMModules and showAllModule's functions
	var makeModules = function(mod) {
			var link =$('<a></a>').attr({'href': "#module?"+mod.moduleNo, 'data-modid': mod.moduleNo}).addClass('module-link');
			var modTitle = mod.moduleName;
			var angleRight = $('<i></i>').addClass('fa fa-angle-right');
			var para = $('<p></p>');

			para.append(modTitle).append(angleRight) ;
			link.append(para) ;
			var listItem = $('<article></article>').addClass('list-item') ;
			listItem.append(link) ;
			return listItem;
	}
	/** Show a list a list of Modules, append them to the #browsemodules page */
	var showMyModules = function(data) {
		var list = []
	
		for (var i=0; i<data.modules.length; i++) {
			
			list.push(makeModules(data.modules[i])) ;
		}	

		$('#mymodules .ui-content').text('') ;
		for (var i = 0; i<list.length; i++) {
			$('#mymodules .ui-content').append(list[i]);
		}
	}//showMyModulesData()

	/** Show a list all of Modules, append them to the #mymodules page */
	var showAllModules = function(data) {
		var list = []
		for (var i=0; i<data.modules.length; i++) {
		
			list.push(makeModules(data.modules[i])) ;
		}		
		$('#browsemodules .ui-content').text('') ;
		for (var i = 0; i<list.length; i++) {
			$('#browsemodules .ui-content').append(list[i]);
		}

	}//showAllModules()
	//Bind this to the #getmymodules link on the homepage - it's based on the userID value which is set at the top of this script
	//When login is implemented this will be set by the user's submitted ID
	$('#home #getmymodules').on('click', function(e) {
		getData('data_endpoint/json-data-student-modules.php?studentid='+userID, showMyModules) ;
	});
	//Get all modules - handler bound to the link on the homepage
	$('#home #getallmodules').on('click', function(e) {
		getData('data_endpoint/json-data-modules.php', showAllModules) ;
	});

	//Shows all lecturers, appends a list of lecturers to #lecturers page
	var showLecturersData = function(data) {
		var lecturers = [] ;
		//For each lecturer object
		for (var i=0; i<data.lecturers.length; i++) {
				//Create an <article> element - .list-item styles it like a material's design list element
				var article = $('<article></article').addClass('list-item');
				//This create a link to the the lecturer's full profile. It adds the staff number as a data-lecturer-id attribute
				//That is used in getting the lecturer's full profile information 
				var link = $('<a></a>').attr({'href': '#lecturer', 'class': 'ui-link lecturer-link', 'data-lecturer-id': data.lecturers[i].staffNumber});
				//Para for each entry
				var para = $('<p></p>');
				//Angle right indicating what will happen on click
				var angleRight = $('<i></i>').addClass('fa fa-angle-right');
				//Append the name and the angle to the para
				para.append(data.lecturers[i].firstName + " "+data.lecturers[i].lastName).append(angleRight) ;
				
				//Wrap the para in a link
				link.append(para);
				//Append that to the <article>
				article.append(link);
				//Add it to the lecturers array
				lecturers.push(article);
		}	
		//Clear the page content
		$('#lecturers .ui-content').text('') ;	
		//For each in lecturers[]
		for (var i in lecturers) {
			//Append the lecturer item
			$('#lecturers .ui-content').append(lecturers[i]) ;
		}
	}//showLecturersData()
	//Shows a single lecturer data, appends it to #lecturers page
	//Takes the lecturer data returned from the getData call and adds it to the lecturer page
	var showLecturerData = function(data) {
		var lecturer = [] ;
		$('#lecturer').find('.inner-header').find('h3').text(data.lecturers[0].firstName + " "+data.lecturers[0].lastName);
		for (var i=0; i<data.lecturers.length; i++) {
			lecturer.push() ;
			var email = $('<a></a>').attr('href', 'mailto:'+data.lecturers[i].email).append(data.lecturers[i].email);
			lecturer.push($('<p></p>').attr('class', 'lect-email').append("Email: ").append(email));
			var modLink1 = $('<a></a>').attr({'href': "#module?"+data.lecturers[i].moduleNo1, 'data-modid': data.lecturers[i].moduleNo1}).addClass('module-link');
			modLink1.append(data.lecturers[i].moduleNo1) ;
			lecturer.push($('<p></p>').attr('class', 'lect-module').append("Teaches mod id: ").append(modLink1));
			var modLink2 = $('<a></a>').attr({'href': "#module?"+data.lecturers[i].moduleNo2, 'data-modid': data.lecturers[i].moduleNo2}).addClass('module-link');
			modLink2.append(data.lecturers[i].moduleNo2) ;
			lecturer.push($('<p></p>').attr('class', 'lect-module').append("Teaches mod id: ").append(modLink2));
		}	
		$('#lecturer .ui-content').text('') ;
		for (var i in lecturer) {
			$('#lecturer .ui-content').append(lecturer[i]) ;
		}
		
	}//showLecturersData()
	//"The academics" link on the homepage
	$('#lecturers').on('click', getData('data_endpoint/json-data-lecturers.php', showLecturersData));
	//Delegate a click on the lecturers links in the lecturer's listing
	$(document).on('click', '.lecturer-link', function(e) {
		//The id is the one added in showLecturerData
		var id = $(this).attr('data-lecturer-id') ;
		//It's used as query argument in the getData call
		getData('data_endpoint/json-data-single-lecturer.php?lecturerid='+id, showLecturerData);
	}) ;

	/** End standard use cases **/

	/***
	** Extended use cases
	** Google Maps API and webservice, 
	** Device location information
	** Device orientation 
	** 
	***/
	var usersLocationObject = null ;
	//Creates a Google Map from Maps API
	function addSimpleMap(locationsObject) {
		//Initalize the Map. This creaets a drawDirections function and sets event handlers which call the draw directions function 
		var initMaps = function() {
			//Flag - if the map has a directions polyline
			var hasDirections = false;
			//Create a new Map object
			var directionsMap = new google.maps.Map(document.getElementById('map-wrap'));
			//This will be a Google maps Polyline to draw directions
			var directionsPath = null;
			//Block for textual directions
			var $textDirections = $('.get-dirs-directions') ;

			//Campuses LatLngs - used in the query to the Maps API as origin and/or destination coords
			var aungierLatLngStr = "53.338545,-6.26607";
			var kevinsLatLngStr = "53.337015,-6.267933" ;
			var boltonLatLngStr = "53.351406,-6.268724"

			//For map markers - lat/lng of each campus
			var aungierLatLng =	new google.maps.LatLng( 53.338545, -6.26607);
			var kevinsStLatLng = new google.maps.LatLng(53.337015,-6.267933);
			var boltonStLatLng = new google.maps.LatLng(53.351406,-6.268724);
			//TBC - if the user allows user location use.
			var userLatLngStr = "" ;
			var userLatLng = null ;
			//Center the Map on Aungier St. Changes after the user requests directions. Zoom: 12
			var mapOptions = {
	          center: aungierLatLng,
	          zoom: 12
	        };
	        //Set the map options
	       	directionsMap.setOptions(mapOptions);
	       	//Set up a marker for the user if the device supports geolocation
	        var userMarker = null;
	        //Set some markers
	        //If the user's coordinates have been passed to the function do user's marker
	        if (locationsObject.userLatLng) {
	        	userMarker = new google.maps.Marker(); 
	        	var userLatLng = new google.maps.LatLng(locationsObject.userLatLng.userLatitude, locationsObject.userLatLng.userLongitude);
	        	userMarker.setOptions({
	        		position: userLatLng,
	        		map: directionsMap,
	        		title: "You",
	        		draggable: true
	        	}); 
	        	//Change the center of the Map to the user's locations
	        	directionsMap.setCenter(userLatLng) ;
	        }
	        //Set a marker for each campus
	        //the map: element adds the marker to the Map
	        aungierMarker = new google.maps.Marker({
	        	position: aungierLatLng,
	        	map: directionsMap,
	        	title: "Aungier Street"
	        }) ;
	        kevinsMarker = new google.maps.Marker({
	        	position: kevinsStLatLng,
	        	map: directionsMap,
	        	title: "Kevins Street"
	        }) ;
	        boltonStMarker = new google.maps.Marker({
	        	position: boltonStLatLng,
	        	map: directionsMap,
	        	title: "Bolton Street"
	        }) ;

			//Draws directions polylines onto the map and adds directions to directions block
			//It is called after click on the directions "Go" button
			//Data is returned as json.
			function drawDirections(data) {
				data = JSON.parse(data) ;

				//**See console to see the data**//
				console.log(data) ;
				//**See console to see the data**// 
				
				var htmlInstructions = [] ;
				//Map results returned
				if (data.status === "OK"){
					//Set the bounds of the map to fit the directions
					//Get the bounds from the returned data
					//Set SW/NE lat, lng
					var dirsBounds = new google.maps.LatLngBounds(
				      	new google.maps.LatLng(parseFloat(data.routes[0].bounds.southwest.lat), parseFloat(data.routes[0].bounds.southwest.lng)),
				      	new google.maps.LatLng(parseFloat(data.routes[0].bounds.northeast.lat), parseFloat(data.routes[0].bounds.northeast.lng))
				      );
					//Set them - set the map within those bounds
					directionsMap.fitBounds(dirsBounds) ;
					
					//Create polylines to add to the map. Array of maps LatLng objects
					//These are added to the data returned from maps web service by json-data-google-directions.php
					//That script uses a library to parse the encoded polyline information into an array of coordinates
					//The coordinates are added here  as Map LatLng objects
					var polylinesCoords = [] ;
					//Lat/Lng coordinates for each LatLng object
					var polylineLat =null ;
					var polylineLng =null ;
					//For the journey duration
					var duration = 0;
					//In each route in the directions
					for (var i=0 in data.routes) {
						//Get the decoded polylines coordinates - this is an array of coordiates
						for (var j in data.routes[i].overview_polyline.decoded_points) {
							//Even => lat
							if (j%2 == 0) {
								//Even indexes = lat
								polylineLat = data.routes[i].overview_polyline.decoded_points[j] ;	
							} else {
								//Uneven indexes = lng
								polylineLng = data.routes[i].overview_polyline.decoded_points[j] ;
								//Push the coords to the polylineCoords array - each is a Maps LatLng object
								polylinesCoords.push(new google.maps.LatLng(polylineLat, polylineLng));
							}
						}
						//Get the HTML instructions and duration for each leg in each route, push them to the instructions array
						for (var j=0 in data.routes[i].legs) {
							//Get the journey duration 
							duration += data.routes[i].legs[i].duration.value;
							//Get the start address, end address
							htmlInstructions.push(data.routes[i].legs[i].start_address+" to "+data.routes[i].legs[i].end_address);
							//For each step in each leg
							for (var k=0 in data.routes[i].legs[j].steps) {
								//Push the html instructions
								htmlInstructions.push(data.routes[i].legs[j].steps[k].html_instructions)	;	
							}	
						}
					}
					//Push the duration
					htmlInstructions.push("Duration: "+Math.floor((duration)/60) +"mins approx.");
					//Then create the directions polyline based on the array of coordinates gathered and other options
					//The array of coordinates is set as the path value - this draws the directions line
					directionsPath = new google.maps.Polyline({
						path: polylinesCoords,
						geodesic: true,
						strokeColor: '#FF0000',
						strokeOpacity: 1.0,
						strokeWeight: 2,
						map: directionsMap
					});
					//Flag that the map has directions added - tested when th user location pin is dragged
					hasDirections = true;
				//Map results not returned
				} else {
					//No results
					htmlInstructions[0] = "Sorry no results for that journey" ;
					//No directions drawn
					hasDirections = false;
				}
				//Append the html instructions to the text directions block
				//Clear the block
				$textDirections.text("") ;
				//Append the texual instructions - each is a div
				for (var i in htmlInstructions) {
					var instr = $('<div></div>').addClass("instruction");
					instr.append(htmlInstructions[i]);
					$textDirections.append(instr) ;
				}
				//Slide down the directions block
				$textDirections.slideDown(400, 'linear', function() {
					$(this).addClass('visible'); 
				});
			}// end drawDirections()

			/**
			* Two event handlers which request directions and re-draw the map with direction polylines 
			* Click the search "Go" button and drag the user location pin
			**/
			//Click on the "Go" Button to get directions
			//Start point:
			var origin = "";
			//End point
			var destination = "";
			//Travel mode
			var mode = "";
			//Click the button - start/end locations are retrieved from the select elements
	        $(document.getElementById('get-dirs-go-btn')).on('click', function(e) {	        	
	        	e.preventDefault();
	        	//Origin and direction from the select elements
	        	origin = $('#get-dirs-start-sel').val();
	        	destination = $('#get-dirs-end-sel').val() ;
	        	//Wrong - start = end
	        	if (origin === destination) {
	        			$textDirections.text("");
	        			$textDirections.append("Start and end points are the same. Try again") ;
		        		$textDirections.slideDown('400', 'swing', function() {
		        			$(this).addClass('visible') ;
	        			}) ;
					return;	        		
	        	}
	        	//Origin = where I am now
	        	if (origin === "here" ) { 
	        		//Get the position of the userMarker as a Maps LatLng object
	        		var uLatLng = userMarker.getPosition() ;
	        		//Get lat/lng string
	        		var userLat = uLatLng.lat().toString();
	        		var userLng = uLatLng.lng().toString();
	        		//set the origin - passed the PHP script query
	        		origin = userLat+","+userLng;
	        	} 

	        	//Travel mode - from the mode radio buttons
	        	mode = $('#get-dirs-mode input:checked').val();
	        	//If the map alread has directions, remove them
	        	if (directionsPath) {
	        		directionsPath.setMap(null) ;
	        	}
	        	//Get data 
	        	getAJAXData("data_endpoint/json-data-google-directions.php?origin="+encodeURI(origin)+"&dest="+encodeURI(destination)+"&mode="+mode, drawDirections) ;
	        });
			//User drags the user marker on the map
			 google.maps.event.addListener(userMarker, 'dragend', function() {
			 	if (hasDirections) {
			 		var uLatLng = userMarker.getPosition() ;
	        		var userLat = uLatLng.lat().toString();
	        		var userLng = uLatLng.lng().toString();
	        		origin = userLat+","+userLng;
			 		if (directionsPath) {
	        			directionsPath.setMap(null) ;
	        		}

			 		getAJAXData("data_endpoint/json-data-google-directions.php?origin="+encodeURI(origin)+"&dest="+encodeURI(destination)+"&mode="+mode, drawDirections) ;
			 	}

			}) ;//end handler

		}//end initMaps()
		//Call init maps
		initMaps();
	}//addSimpleMap

	

	//Gets the user's geolocation info. The callback does something with the geolocaiton info
	//Done like this for flexibility - callback could be anything
	function getUserGeoLoc(cb) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				var userLat = pos.coords.latitude;
				var userLng = pos.coords.longitude;
				var usersLocationObject = {
					userLatLng: {
						userLatitude: userLat,
						userLongitude: userLng 
					}
				}
				cb(usersLocationObject) ;
			}) ;
		} else {
			//Pass in a null object to the callback => no user marker will be added
			cb(null) ;
		}	
	}//getUserGeoLoc()

	//Uses HTML5 orientation to change the compass bearing beneath the map
	function deviceOrientationListener(e) {
			var rot = 0;
			rot = e.alpha;
			//It rotates the "n" element back to north to indicate the user's bearing - it could do with e, w and s. 
			document.getElementById('compass-due-north').style.transform = "rotate("+rot+"deg)";
	}
	//If the device supports DeviceOrientation
	if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", deviceOrientationListener);
	}

	//Kick off Maps
	//The callback initializes a Google map
	getUserGeoLoc(addSimpleMap);