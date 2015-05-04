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
		})
	}
	var getData = function(path, cb) {
		$.getJSON(path, function (data) {	
			if (data) {
				return cb(null, data);	
			} else {
				return cb("Sorry no data", null);
			}
			
		}) ;		
	}
	var checkUser = function() {
		if (document.cookie.indexOf("DITUser=true") == -1) {
			$('#user-modal').css('display', 'block') ;
		}
	}
	checkUser();
	//Makes a HTML table
	function makeTable() {
		thead = $('<thead></thead>') ;
		tbody = $('<tbody></tbody>') ;
		tab = $('<table></table>') ;
		tab.append(thead).append(tbody) ;
		return tab;
	}//makeTable

	var showModulesData = function(err, data) {
		if (err) {
			$('#home').append(err) ;
			return;
		}
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
	var showStudentData = function(err, data) {
		if (err) {
			$('#students').append(err) ;
			return;
		}
		$('#students').append(makeTable()) ;
		
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

	var showLecturerData = function(err, data) {

		if (err) {
			$('#lecturers').append(err) ;
			return;
		}

		$('#lecturers').append(makeTable())  ;
		
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
	** Google Maps API
	**
	***/
	//Map init centered on Aungier St campus long: 53.338545 lat: -6.26607
	//Simple Map: 53.338661,-6.267645,15
	var directionsMap = new google.maps.Map(document.getElementById('map-wrap'));
	var ditLatLngs = {
		aungierLatLng: 	new google.maps.LatLng(53.338545, -6.26607),
		kevinsStLatLng: new google.maps.LatLng(53.337015, -6.267933),
		boltonStLatLng: new google.maps.LatLng(53.351406, -6.268724)
	}
	var usersLocationObject = null ;
	function addSimpleMap(locationsObject) {
		console.log("addSimpleMap") ;
		var initMaps = function() {
			var mapOptions = {
	          center: new google.maps.LatLng(53.338545, -6.26607),
	          zoom: 12
	        };
	       	directionsMap.setOptions(mapOptions);
	        
	        if (locationsObject.userLatLng) {
	        	var userMarker = new google.maps.Marker(); 
	        	var userLoc = new google.maps.LatLng(locationsObject.userLatLng.userLatitude, locationsObject.userLatLng.userLongitude);
	        	userMarker.setOptions({
	        		position: userLoc,
	        		map: directionsMap,
	        		title: "You"
	        	}); 
	        	directionsMap.setCenter(userLoc) ;
	        }
	        aungierMarker = new google.maps.Marker({
	        	position: ditLatLngs.aungierLatLng,
	        	map: directionsMap,
	        	title: "Aungier Street"
	        }) ;
	        kevinsMarker = new google.maps.Marker({
	        	position: ditLatLngs.kevinsStLatLng,
	        	map: directionsMap,
	        	title: "Kevins Street"
	        }) ;
	        boltonStMarker = new google.maps.Marker({
	        	position: ditLatLngs.boltonStLatLng,
	        	map: directionsMap,
	        	title: "Bolton Street"
	        }) ;
	        $(document.getElementById('get-dirs-go-btn')).on('click', function(e) {
	        	e.preventDefault();
	        	var url = encodeURI("https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyBmggP__Ppp-gh_GRKl_ob8Y6ZT-K6nZIQ");
	        	console.log(url);
	        	getAJAXData(url, drawDirections, true) ;
	        });
		}
		initMaps();
	}//addSimpleMap
	//Gets directions from Goole Maps API WS
	//Used as a callback to getData so it checks for an error first
	function getDirections(data) {
		if (data) {
			console.log(data) ;
		} else {
			var dirsDiv = $(document.getElementById('get-dirs-directions')) ;
			dirsDiv.append("Sorry couldn't get directions: "+err.message) ;
			return false;
		}

	}
	//Draws directions polylines onto the map and adds directions to directions block
	//Used as a callback to getData so it checks for an error first
	function drawDirections(data) {
		if (err) {
			console.log("Sorry couldn't get those directions: "+err.message) ;
			var dirsDiv = $(document.getElementById('get-dirs-directions')) ;
			dirsDiv.append("Sorry couldn't get those directions: "+err.message) ;
			return false;
		} else {
			console.log(data) ;
		}
	}//drawDirections()

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



	//Kick off Maps
	getUserGeoLoc(addSimpleMap);

	
