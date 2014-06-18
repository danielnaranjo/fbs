/* Variables globales */
var miubicacion = [], ciudad = "", pais = "", Lat = "", Lon = "", OneTime = 0, locales = "", idioma = "";
// Carga la GEO de HTML5
function showPosition(position) {
	miubicacion[0] = position.coords.latitude; //.toFixed(3);
	miubicacion[1] = position.coords.longitude; //.toFixed(3);
	// Si geolocalizacion esta activa, la guardo en cookie
	setCookie('Lat',miubicacion[0],365);
	setCookie('Lon',miubicacion[1],365);
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
				// console.log(miubicacion[0]+','+miubicacion[1]);
			}, 3000);
			// Mostrar datos en la caja de busqueda
			//$("#w").val('Estas cerca de '+miubicacion[0]+','+miubicacion[1]);
		}, 2000);
	}
}
// Mensajes de Errores de GEO
function onError() {
	// Check if message was show then..
	/*
	if(OneTime){
		$('#nogeo').css('display','inline');
		$('#nogeo').html('');
		if (navigator.geolocation){
			$('#nogeo').append("Error: The Geolocation service failed.<br/>Erreur: Le service de géolocalisation a échoué.<br/>Error: El servicio de Geolocalización falló.<br/>Fehler: Der Geolocation-Dienst konnte."); 
			console.log("Error: The Geolocation service failed.");
			$("#nogeo").removeClass().addClass("bounceInLeft");
			setTimeout(function() {
				$('#nogeo').removeClass().addClass("bounceOutLeft");
			}, 7000);
		} else {
			$('#nogeo').append("Error: Your browser doesn't support geolocation. Are you in Siberia?<br/>Erreur: Votre navigateur ne supporte pas la géolocalisation. Etes-vous en Sibérie?<br/>Error: Su navegador no soporta geolocalización. ¿Está usted en Siberia?<br/>Fehler: Ihr Browser unterstützt leider keine Geolocation. Sind Sie in Sibirien?");
			console.log("Error: Your browser doesn't support geolocation");
			$('#nogeo').css('display', 'inline');
			$("#nogeo").removeClass().addClass("bounceInLeft");
			setTimeout(function() { 
				$('#nogeo').removeClass().addClass("bounceOutLeft");
			}, 7000);
		}
		OneTime=1;
	}
	*/
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
	$.getJSON('http://www.freegeoip.net/json/190.202.17.29', function(location) {
		// window.location.replace("/?city="+location.city+"&country="+location.country_name);
		Lat=location.latitude;
		Lon=location.longitude;
		City=location.city;
		pais=location.country_name;
		dip=location.ip;
		console.log('OK '+pais);
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

function checkCookie() {
	var pais=getCookie("pais");
	if(pais!=""){
		console.log("Hello " + Country);
	} else {
		/* Need for IP, City, Country and Lat,Lon */
		WhereAmI();
		/* Fire geolocation API */
		checkPosition();
		//if (getCookie('pais')!="" && getCookie('pais')!=null){
		setCookie('ciudad',ciudad,365);
		setCookie('pais',pais,365);
		setCookie('Lat',Lat,365);
		setCookie('Lon',Lon,365);
		console.log(document.cookie);
		//}
	}
}
/* Geolocalization HTML5 */
function checkPosition() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, onError);
	} else {
		onError();
	}
}