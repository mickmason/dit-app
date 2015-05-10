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
		console.log(data)	;
	
		var modPage = $('#module') ;
var paras = [] ;
		for (var i=0; i<data.modules.length; i++) {
			//Add title
			modPage.find('.inner-header').find('h3').text(data.modules[i].moduleName);
			
			paras.push($('<p></p>').attr('class', 'mod-credits').append("ECT credits: "+data.modules[i].credits));
			paras.push($('<p></p>').attr('class', 'mod-duedate').append("Due date: "+data.modules[i].dueDate));
			var website = $('<a></a>').attr({'href': data.modules[i].website }).text(data.modules[i].website);
			paras.push($('<p></p>').attr('class', 'mod-website').append("Website: ").append(website));
			paras.push($('<p></p>').attr('class', 'mod-room').append("Room: "+data.modules[i].room));

		}		
		modPage.find('.mod-full').text('') ;
		for (var i in paras) {
			modPage.find('.mod-full').append(paras[i]) ;
		}
	}//showMyModulesData()
	$(document).on('click', '.module-link', function() {
		var id = $(this).attr('data-modid') ;
		console.log(id) ;
		getData('data_endpoint/json-data-single-module.php?moduleid='+id, showOneModule) ;
	}) ;
	/** Gets a list of Modules */
	var showMyModules = function(data) {
		console.log(data)	;
		
		var list = []
	
		for (var i=0; i<data.modules.length; i++) {
			var link =$('<a></a>').attr({'href': "#module?"+data.modules[i].moduleNo, 'data-modid': data.modules[i].moduleNo}).addClass('module-link');


			
			var modTitle = data.modules[i].moduleName;
			var angleRight = $('<i></i>').addClass('fa fa-angle-right');
			var para = $('<p></p>');

			para.append(modTitle).append(angleRight) ;
			link.append(para) ;
			var listItem = $('<article></article>').addClass('list-item') ;
			listItem.append(link) ;
			list.push(listItem) ;
		}		
		$('#mymodules .ui-content').text('') ;
		for (var i = 0; i<list.length; i++) {
			$('#mymodules .ui-content').append(list[i]);
		}
	}//showMyModulesData()
	$('#home #getmymodules').on('click', function(e) {
		getData('data_endpoint/json-data-student-modules.php?studentid='+userID, showMyModules) ;
	});


	//Shows all lecturer data, appends it to #lecturers page
	var showLecturersData = function(data) {
		var lecturers = [] ;
		for (var i=0; i<data.lecturers.length; i++) {

				var article = $('<article></article').addClass('list-item');
				var link = $('<a></a>').attr({'href': '#lecturer', 'class': 'ui-link lecturer-link', 'data-lecturer-id': data.lecturers[i].staffNumber});
				var para = $('<p></p>');
				var angleRight = $('<i></i>').addClass('fa fa-angle-right');
				para.append(data.lecturers[i].firstName + " "+data.lecturers[i].lastName).append(angleRight) ;
				
				
				link.append(para);
				article.append(link);
				lecturers.push(article);

			
		}	
		$('#lecturers .ui-content').text('') ;	
		for (var i in lecturers) {
			$('#lecturers .ui-content').append(lecturers[i]) ;
		}
		
	}//showLecturersData()
	//Shows all lecturer data, appends it to #lecturers page
	var showLecturerData = function(data) {
		console.log(data) ;
		var lecturer = [] ;
		$('#lecturer').find('.inner-header').find('h3').text(data.lecturers[0].firstName + " "+data.lecturers[0].lastName);
		for (var i=0; i<data.lecturers.length; i++) {
			lecturer.push() ;
			
			var email = $('<a></a>').attr('href', 'mailto:'+data.lecturers[i].email).append(data.lecturers[i].email);
			console.log(email) 
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
	$('#lecturers').on('click', getData('data_endpoint/json-data-lecturers.php', showLecturersData));
	//Delegate a click on lecturers links
	$(document).on('click', '.lecturer-link', function(e) {
		var id = $(this).attr('data-lecturer-id') ;
		console.log(id) ;
		getData('data_endpoint/json-data-single-lecturer.php?lecturerid='+id, showLecturerData);
	}) ;

	// getData('data_endpoint/json-data-students.php',showStudentData) ;
	// getData('data_endpoint/json-data-lecturers.php',showLecturerData) ;
	// getData('data_endpoint/json-data-modules.php',showModulesData) ;

	/***
	** Google Maps API and webservice
	**
	***/
	var usersLocationObject = null ;
	//Creates a Google Map
	function addSimpleMap(locationsObject) {
		//Initalize the Map. This adds a draw directions function and sets event handlers which call the draw directions function 
		var initMaps = function() {
			//Flag - if the map has a directions polyline
			var hasDirections = false;
			//Create a new Map object
			var directionsMap = new google.maps.Map(document.getElementById('map-wrap'));
			//THis will be a Google maps Polyline to draw directions
			var directionsPath = null;
			//Block for textual directions
			var $textDirections = $('.get-dirs-directions') ;

			//Campuses LatLngs - used in the query to the Maps API as origin and destination coords
			var aungierLatLngStr = "53.338545,-6.26607";
			var kevinsLatLngStr = "53.337015,-6.267933" ;
			var boltonLatLngStr = "53.351406,-6.268724"

			//For map markers - lat/lng of each campus
			var aungierLatLng =	new google.maps.LatLng( 53.338545, -6.26607);
			var kevinsStLatLng = new google.maps.LatLng(53.337015,-6.267933);
			var boltonStLatLng = new google.maps.LatLng(53.351406,-6.268724);
			//TBC
			var userLatLngStr = "" ;
			var userLatLng = null ;
			//Center the Map on Aungier St - may change. Zoom 12
			var mapOptions = {
	          center: aungierLatLng,
	          zoom: 12
	        };
	        //Set the options
	       	directionsMap.setOptions(mapOptions);
	       	//Set up a marker for the user if the device supports geolocation
	        var userMarker = null;
	        //Set some markers
	        //If the user's coordinates have been retrieved do
	        if (locationsObject.userLatLng) {
	        	userMarker = new google.maps.Marker(); 
	        	var userLatLngStr = locationsObject.userLatLng.userLatitude+","+locationsObject.userLatLng.userLongitude;
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
			//It is called after click on the directions Go button
			function drawDirections(data) {

				data = JSON.parse(data) ;
				console.log(data) ;
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
								//Set them
								directionsMap.fitBounds(dirsBounds) ;
								
								//Create polylines to add to the map. Array of maps LatLng objects
								var polylinesCoords = [] ;
								//Lat/Lng coordinates for each LatLng object
								var polylineLat =null ;
								var polylineLng =null ;
								//For the journey duration
								var duration = 0;

								for (var i=0 in data.routes) {
									//Get the decoded polylines coordinates - this is an array of lat/lng coordiates
									for (var j in data.routes[i].overview_polyline.decoded_points) {
										if (j%2 == 0) {
											//Even indexes = lat
											polylineLat = data.routes[i].overview_polyline.decoded_points[j] ;	
										} else {
											//Uneven indexes = lng
											polylineLng = data.routes[i].overview_polyline.decoded_points[j] ;
											//Push the coords to the polylineCoords array
											polylinesCoords.push(new google.maps.LatLng(polylineLat, polylineLng));
										}
									}
									//Get the HTML instructions and duration for each leg, push them to the instructions array
									for (var j=0 in data.routes[i].legs) {
											//Get the journey duration 
											duration += data.routes[i].legs[i].duration.value;
											//Get the start address, end address
											htmlInstructions.push(data.routes[i].legs[i].start_address+" to "+data.routes[i].legs[i].end_address);
										for (var k=0 in data.routes[i].legs[j].steps) {
											//Push the html instructions
											htmlInstructions.push(data.routes[i].legs[j].steps[k].html_instructions)	;	
										}	
									}
								}
								//Push the duration
								htmlInstructions.push("Duration: "+Math.floor((duration)/60) +"mins approx.");
								//Create the directions polyline based on the array of coordinates gathered and other options
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
			* Click the search "Go" button and on drag the user location pin
			**/
			//Click on the "Go" Button to get directions
			//Start point:
			var origin = "";
			//End point
			var destination = "";
			//Travel mode
			var mode = "";
			//Click the button
	        $(document.getElementById('get-dirs-go-btn')).on('click', function(e) {	        	
	        	e.preventDefault();
	        	//Origin and direction from the select elements
	        	origin = $('#get-dirs-start-sel').val();
	        	destination = $('#get-dirs-end-sel').val() ;
	        	//Wrong
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
	        		//Get the position of the userMarker
	        		var uLatLng = userMarker.getPosition() ;
	        		//Get lat/lng
	        		var userLat = uLatLng.lat().toString();
	        		var userLng = uLatLng.lng().toString();
	        		//set the origin - passed the PHP script query
	        		origin = userLat+","+userLng;
	        	} 

	        	//Travel mode - from the mode radio buttons
	        	mode = $('#get-dirs-mode input:checked').val();
	        	//If the 
	        	if (directionsPath) {
	        		directionsPath.setMap(null) ;
	        	}
	        	getAJAXData("/polyline_decode_test/json-data-google-directions.php?origin="+encodeURI(origin)+"&dest="+encodeURI(destination)+"&mode="+mode, drawDirections) ;
	        });

			 google.maps.event.addListener(userMarker, 'dragend', function() {
			 	if (hasDirections) {
			 		var uLatLng = userMarker.getPosition() ;
	        		var userLat = uLatLng.lat().toString();
	        		var userLng = uLatLng.lng().toString();
	        		origin = userLat+","+userLng;
			 		if (directionsPath) {
	        			directionsPath.setMap(null) ;
	        		}

			 		getAJAXData("/polyline_decode_test/json-data-google-directions.php?origin="+encodeURI(origin)+"&dest="+encodeURI(destination)+"&mode="+mode, drawDirections) ;
			 	}
				//console.log('dragend') ;
				//getAJAXData("/polyline_decode_test/json-data-google-directions.php?origin="+encodeURI(origin)+"&dest="+encodeURI(destination)+"&mode="+mode, drawDirections) ;
			}) ;

		}//end initMaps()
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
			console.log("No geolocation") ;
			cb(null) ;
		}	
	}//getUserGeoLoc()

	//Uses HTML5 orientation to change the compass bearing
	function deviceOrientationListener(e) {
			var rot = 0;
			rot = e.alpha;
			document.getElementById('rot').innerHTML = rot;
			document.getElementById('compass-due-north').style.transform = "rotate("+rot+"deg)";
	}
	if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", deviceOrientationListener);
	}

	//Kick off Maps
	//The callback initializes a Google map search
	getUserGeoLoc(addSimpleMap);