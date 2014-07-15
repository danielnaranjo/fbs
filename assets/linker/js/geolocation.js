/* Variables globales */
var miubicacion = [], ciudad = "", pais = "", Lat = "", Lon = "", OneTime = 0, locales = "", idioma = "";
// Carga la GEO de HTML5
function showPosition(position) {
	miubicacion[0] = position.coords.latitude; //.toFixed(3);
	miubicacion[1] = position.coords.longitude; //.toFixed(3);
	// Si geolocalizacion esta activa, la guardo en cookie
	setCookie('Lat',miubicacion[0],365);
	setCookie('Lon',miubicacion[1],365);
	console.log(miubicacion);
	// Compruebo que hay contenido?
	if (!miubicacion) {
		setTimeout(function() {
			$('#dondeestoy').html('');
			$('#dondeestoy').css('display', 'inline');
			$('#dondeestoy').css('background-color', 'transparent');
			$('#dondeestoy').html('<img src="/img/486.GIF" height="20px" />');
			setTimeout(function() {
				$('#dondeestoy').html('We\'re ready!  :) ');
				$('#dondeestoy').removeClass().addClass("fadeOut");
				console.log(miubicacion[0]+','+miubicacion[1]);
			}, 3000);
		}, 2000);
	}
}
// Mensajes de Errores de GEO
function onError() {
	// Delay to..
	setTimeout(function() {
		// Set Latitute and Longitute by IP
		miubicacion[0]=Lat;
		miubicacion[1]=Lon;
		// Establezco en cookie la localizacion
		setCookie('Lat',Lat,365);
		setCookie('Lon',Lon,365);
		console.log("Geolocation failed. This message will not show again. Fix it with "+miubicacion);
	}, 2000);
}
/* Muestra Geo segun IP */
function WhereAmI() {
	$.getJSON('http://www.freegeoip.net/json/', function(location) {
		//Lat=location.latitude;
		//Lon=location.longitude;
		ciudad=location.city;
		pais=location.country_name;
		dip=location.ip;
		setCookie('ciudad',ciudad,365);
		setCookie('pais',pais,365);
		console.log('OK '+pais +' '+ ciudad);
	});
}
/* Cookies for Location */
function setCookie(cname,cvalue,exdays) {
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}

function checkCookie(x) {
	var pais=getCookie('pais');
	if(pais!=""){
		console.log("Hello " + pais+"! Nice to see you again :) ");
		console.log("We're not using geolocation API yet or not anymore, who's knows? :) ");
	} else {
		/* Need for IP, City, Country and Lat,Lon */
		WhereAmI(x);
		/* Fire geolocation API */
		checkPosition();
		setCookie('ciudad',ciudad,365);
		setCookie('pais',pais,365);
		setCookie('Lat',Lat,365);
		setCookie('Lon',Lon,365);
		console.log("Hello " + pais+"! Nice to meet you! :) ");
	}

	/* load regional/global site */
	regional();
}
/* Geolocalization HTML5 */
function checkPosition() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, onError);
	} else {
		onError();
	}
}