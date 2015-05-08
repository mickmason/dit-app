	//Used to identify a type of user and if a user is logged in.
	var userType = "student";
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
		console.log("getAJAXData") ;
		$.ajax(url, {
		  success: success
		});
	}
	var getData = function(path, cb) {
		console.log(path) ;
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
	//Check the user type
	checkUser();
	
	//Makes a HTML table
	function makeTable() {
		thead = $('<thead></thead>') ;
		tbody = $('<tbody></tbody>') ;
		tab = $('<table></table>') ;
		tab.append(thead).append(tbody) ;
		return tab;
	}//makeTable

	var showModulesData = function(data) {

		$('#home').append(makeTable()) ;
		
		headTr =  $('<tr></tr>') ;
		headTr.append($('<td></td>').text('Module No.'));
		headTr.append($('<td></td>').text('Module Name'));
		headTr.append($('<td></td>').text('Credits'));
		headTr.append($('<td></td>').text('Website'));
		headTr.append($('<td></td>').text('Due date'));
		headTr.append($('<td></td>').text('Campus'));
		headTr.append($('<td></td>').text('Room'));
		headTr.append($('<td></td>').text('Lat'));
		headTr.append($('<td></td>').text('Long'));
		$('#home thead').append(headTr) ;

		for (var i=0; i<data.modules.length; i++) {
			var tds = [];
			var j = 0;
			for (var key in data.modules[i]) {
				tds[j] = $('<td></td>').text(data.modules[i][key]) ;
				j++;
			}


			tr = $('<tr></tr>') ;
			for (var j in tds) {
				tr.append(tds[j]) ;
			}
			$('#home tbody').append(tr) ;
		}		
	}//showModulesData()
	var showStudentData = function(data) {

		$('.student student-modules').append(makeTable()) ;
		
		headTr =  $('<tr></tr>') ;
		headTr.append($('<td></td>').text('Student ID'));
		headTr.append($('<td></td>').text('First Name'));
		headTr.append($('<td></td>').text('Last Name'));
		headTr.append($('<td></td>').text('Mod 1 ID'));
		headTr.append($('<td></td>').text('Mod 2 ID'));
		headTr.append($('<td></td>').text('Course ID'));
		$('#students thead').append(headTr) ;

		
		for (var i=0; i<data.students.length; i++) {
			var tds = [];
			var j = 0;
			for (var key in data.students[i]) {
				tds[j] = $('<td></td>').text(data.students[i][key]) ;
				j++;
			}


			tr = $('<tr></tr>') ;
			for (var j in tds) {
				tr.append(tds[j]) ;
			}
			$('#students tbody').append(tr) ;
		}		
	}//showStudentsData()

	var showLecturerData = function(data) {


		$('lecturer lecturer-modules').append(makeTable())  ;
		
		headTr =  $('<tr></tr>') ;
		headTr.append($('<td></td>').text('Staff number'));
		headTr.append($('<td></td>').text('First Name'));
		headTr.append($('<td></td>').text('Last Name'));
		headTr.append($('<td></td>').text('Mod 1 ID'));
		headTr.append($('<td></td>').text('Mod 2 ID'));
		headTr.append($('<td></td>').text('Email'));
		$('#lecturers thead').append(headTr) ;
		for (var i=0; i<data.lecturers.length; i++) {
			var tds = [];
			var j = 0;
			for (var key in data.lecturers[i]) {
				if (key === "email") {
					var link = $("<a></a>") ;
					link.attr('href', 'mailto:'+data.lecturers[i][key]) ;
					link.text(data.lecturers[i][key]) ;
					
					tds[j] = $('<td></td>').append(link) ;
				} else {
					tds[j] = $('<td></td>').text(data.lecturers[i][key]) ;	
				}
				j++;
			}
			tr = $('<tr></tr>') ;
			for (var j in tds) {
				tr.append(tds[j]) ;
			}
			$('#lecturers tbody').append(tr) ;
		}		
	}//showLecturersData()	
	getData('data_endpoint/json-data-students.php',showStudentData) ;
	getData('data_endpoint/json-data-lecturers.php',showLecturerData) ;
	getData('data_endpoint/json-data-modules.php',showModulesData) ;

	/***
	** Google Maps API and webservice
	**
	***/

	//Map init centered on Aungier St campus long: 53.338545 lat: -6.26607
	//Simple Map: 53.338661,-6.267645,15
	
	var usersLocationObject = null ;
	//Creates a Google Map
	function addSimpleMap(locationsObject) {
		var initMaps = function() {
			//Create a new Map object
			var directionsMap = new google.maps.Map(document.getElementById('map-wrap'));
			//Block for textual directions
			var $textDirections = $('.get-dirs-directions') ;
			//Campuses LatLngs - used in the query to the Maps API as origin and destination coords
			var aungierLatLngStr = "53.338545,-6.26607";
			var kevinsLatLngStr = "53.337015,-6.267933" ;
			var boltonLatLngStr = "53.351406,-6.268724"

			//For map markers
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
	        
	        //Set some markers
	        //If the user's coordinates have been retrieved do
	        if (locationsObject.userLatLng) {
	        	var userMarker = new google.maps.Marker(); 
	        	var userLatLngStr = locationsObject.userLatLng.userLatitude+","+locationsObject.userLatLng.userLongitude;
	        	var userLatLng = new google.maps.LatLng(locationsObject.userLatLng.userLatitude, locationsObject.userLatLng.userLongitude);
	        	userMarker.setOptions({
	        		position: userLatLng,
	        		map: directionsMap,
	        		title: "You"
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
				console.log(data) ;
				data = JSON.parse(data) ;


				//Set the bounds of the map to fit the directions
				//Get the bounds from the returned data
				//Set SW/NE lat, lng
				var dirsBounds = new google.maps.LatLngBounds(
      				new google.maps.LatLng(parseFloat(data.routes[0].bounds.southwest.lat), parseFloat(data.routes[0].bounds.southwest.lng)),
      				new google.maps.LatLng(parseFloat(data.routes[0].bounds.northeast.lat), parseFloat(data.routes[0].bounds.northeast.lng))
      			);
				//Set them
				directionsMap.fitBounds(dirsBounds) ;
				
				//Create polylines to add to the map
				var polylinesCoords = [] ;
				//Get the HTML instructions for each step
				var htmlInstructions = [] ;

				for (var i=0 in data.routes) {
					
					for (var j in data.routes[i].legs) {
						
						for (var k in data.routes[i].legs[j].steps) {
							polylinesCoords.push(new google.maps.LatLng(data.routes[i].legs[j].steps[k].start_location.lat, data.routes[i].legs[j].steps[k].start_location.lng));
							htmlInstructions.push(data.routes[i].legs[j].steps[k].html_instructions) ;
						}
					}
				}
				for (var i in polylinesCoords) {
					console.log(polylinesCoords.toString()) ;
				}
				//console.log(polylinesCoords.length) ;

				//Create the polyline based on the array of coordinates gathered 
				var directionsPath = new google.maps.Polyline({
					path: polylinesCoords,
					geodesic: true,
					strokeColor: '#FF0000',
					strokeOpacity: 1.0,
					strokeWeight: 2,
					map: directionsMap
				});

				//Append the html instructions to the text directions block
				for (var i in htmlInstructions) {
					$textDirections.append(htmlInstructions[i]) ;
				}
				$textDirections.slideDown();
				

			}//drawDirections()

			//Click on the "Go" Button to get directions
	        $(document.getElementById('get-dirs-go-btn')).on('click', function(e) {	        	
	        	e.preventDefault();
	        	var origin = $('#get-dirs-start-sel').val();
	        	var destination = $('#get-dirs-end-sel').val() ;
	        	
	        	if (origin === destination) {
	        		
	        			$textDirections.text("");
	        			$textDirections.append("Start and end points are the same. Try again") ;
		        			$('.get-dirs-directions').slideDown('400', 'swing', function() {
		        			$(this).addClass('visible') ;
	        			}) ;
					return;	        		
	        		
	        	}

	        	if (origin === "where-i-am" ) { 
	        		origin = userLatLngStr ;
	        	} else if (origin === "aungier-st") { 
	        		origin = aungierLatLngStr ;
	        	} else if (origin === "bolton-st") { 
	        		origin = boltonLatLngStr ;
	        	}	
	        	else if (origin === "kevins-st") { 
	        		origin = kevinsLatLngStr ;
	        	}
	        	if (destination === "where-i-am" ) { 
	        		destination = userLatLngStr ;
	        	} else if (destination === "aungier-st") { 
	        		destination = aungierLatLngStr ;
	        	} else if (destination === "bolton-st") { 
	        		destination = boltonLatLngStr ;
	        	} else if (destination === "kevins-st") { 
	        		destination = kevinsLatLngStr ;
	        	}
	        	
	        	getAJAXData("data_endpoint/json-data-google-directions.php?origin="+encodeURI(origin)+"&dest="+encodeURI(destination), drawDirections) ;
	        });
		}
		initMaps();
	}//addSimpleMap

	

	//Gets the user's geolocation info. The callback does something with the geolocaiton info
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
			console.log(e.alpha) ;
			var rot = 0;
			rot = e.alpha;
			document.getElementById('rot').innerHTML = rot;
			document.getElementById('compass-due-north').style.transform = "rotate("+rot+"deg)";
	}
	if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", deviceOrientationListener);
	}

	//Kick off Maps
	getUserGeoLoc(addSimpleMap);