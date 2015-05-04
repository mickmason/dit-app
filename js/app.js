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

	var getData = function(path, cb) {
		$.getJSON(path, function (data) {			
			return cb(data);
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

	var showLecturerData = function(data) {
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
	var directionsMap = new google.maps.Map(document.getElementById('map'));
	var ditLatLngs = {
		aungierLatLng: 	new google.maps.LatLng(53.338545, -6.26607),
		kevinsStLatLng: new google.maps.LatLng(53.337015, -6.267933),
		boltonStLatLng: new google.maps.LatLng(53.351406, -6.268724)
	}

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
		}
		initMaps();
		//google.maps.event.addDomListener(window, 'load', initMaps);
	}//addSimpleMap
	function calcRoute(startLatLang, endLatLang, travelmode, ds, dd) {
			var request = {
			  origin: startLatLang,
			  destination: endLatLang,
			  travelMode: travelmode
			};
			ds.route(request, function(response, status) {		    
				if (status == google.maps.DirectionsStatus.OK) {
					dd.setDirections(response);
			  	}
			});
	}
//Get directions

if (navigator.geolocation) {

	navigator.geolocation.getCurrentPosition(function(pos) {

		var userLat = pos.coords.latitude;
		var userLng = pos.coords.longitude;
		var locationsObject = {
			userLatLng: {
				userLatitude: userLat,
				userLongitude: userLng 
			}
		}
		addSimpleMap(locationsObject) ;
	}) ;
} else {
	console.log("No geolocation") ;
	addSimpleMap(null) ;
}
		

	
