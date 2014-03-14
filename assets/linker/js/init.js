/* Generales */
	var miubicacion = [];
	
	function showPosition(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		miubicacion[0]=lat.toFixed(3);
		miubicacion[1]=lng.toFixed(3);
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
	function onError() {
		$('#nogeo').css('display', 'inline');
		$('#nogeo').html('');
		if (navigator.geolocation){
			$('#nogeo').append("Error: The Geolocation service failed.<br/>Erreur: Le service de géolocalisation a échoué.<br/>Error: El servicio de Geolocalización falló.<br/>Fehler: Der Geolocation-Dienst konnte."); 
			console.log("Error: The Geolocation service failed.");
			$("#nogeo").removeClass().addClass("bounceInLeft");
			setTimeout(function() {
				$('#nogeo').removeClass().addClass("bounceOutLeft");
				//WhereAmI();
			}, 7000);
		} else {
			$('#nogeo').append("Error: Your browser doesn't support geolocation. Are you in Siberia?<br/>Erreur: Votre navigateur ne supporte pas la géolocalisation. Etes-vous en Sibérie?<br/>Error: Su navegador no soporta geolocalización. ¿Está usted en Siberia?<br/>Fehler: Ihr Browser unterstützt leider keine Geolocation. Sind Sie in Sibirien?");
			console.log("Error: Your browser doesn't support geolocation");
			$('#nogeo').css('display', 'inline');
			$("#nogeo").removeClass().addClass("bounceInLeft");
			setTimeout(function() { 
				$('#nogeo').removeClass().addClass("bounceOutLeft");
				//WhereAmI();
			}, 7000);
		}
	}
	function WhereAmI() {
		$.getJSON('http://freegeoip.net/json/', function(location) {
			window.location.replace("/?city="+location.city+"&country="+location.country_name);
			miubicacion[0]=location.latitude;
			miubicacion[1]=location.longitude;
		});
	}
	// Admin //
	var avisos = function() {
		$('#avisos').html('<ul></ul>');
        $.getJSON( "/post?sort=DESC&limit=10", function(data) {
        //$('#avisos').prepend('<h3>Active post: '+data.length+'</h3>');
          var items = [];
          $.each( data, function( key, val ) {
            $('#avisos ul').append("<li><a href='/post/" + val.id + "' target=\"_blank\">" + val.title + "</a></li>");
          });
        });
        console.log('Loading posts');
    }
	var usuarios = function() {
		$('#usuarios').html('<ul></ul>');
        $.getJSON( "/user?sort=DESC&limit=10", function(data) {
        //$('#usuarios').prepend('<h3>Active users: '+data.length+'</h3>');
          var items = [];
          $.each( data, function( key, val ) {
            $('#usuarios ul').append("<li><a href='/user/" + val.id + "' target=\"_blank\">" + val.username + "</a></li>");
          });
        });
        console.log('Loading users');
    }
    var totalPosts = function() {
		$.getJSON( "/post", function(data) {
			$('#avisos').prepend('<h3>Active: '+data.length+' posts</h3>');
		});
		console.log('Counting posts');
	}
    var totalUsers = function() {
		$.getJSON( "/user", function(data) {
			$('#usuarios').prepend('<h3>Active: '+data.length+' users</h3>');
		});
		console.log('Counting users');
	}

//ROLL ON HOVER
/*
	$(function() {
		$(".roll").css("opacity","0");
		$(".roll").hover(function () {
			$(this).stop().animate({
			opacity: .8
			}, "slow");
		},
		function () {
			$(this).stop().animate({
				opacity: 0
			}, "slow");
		});
	});
*/

$(document).ready(function(e) {
//	
	/* Geolocalization HTML5 */
	if (navigator.geolocation) { navigator.geolocation.getCurrentPosition(showPosition, onError); } else { onError();}
	/* masonry */
	$("#contenido").masonry({itemSelector:'.box'});
	//$("#contenido2").masonry({ itemSelector: 'li' });
	//$("#relacionado").masonry({ itemSelector: 'li' });
	/* Cuadro de busqueda */
	$('#busqueda').on('click', function() { $('#buscador').toggle().removeClass().addClass("fadeInDown"); });
	/* Contador de anuncios */
    $(".timer").append('10K');
	/* Menu y derivado */
	$("#elmenu").on('click', function() { $('#opciones').toggle().removeClass().addClass("fadeInRight");});
	$("#opciones").on('mouseleave', function(){ setTimeout(function() { $('#opciones').hide(); },3000);});
    /* Tooltip */
    // $('.fs1').qtip({ style: { classes: 'qtip-light qtip-shadow' } });
    // $('header div').qtip({ style: { classes: 'qtip-light qtip-shadow' } });
	/* ET Go Home! */
	$("#logo").on('click', function(){ window.location = "/"; });
	/* Login desde Menu */
	$("#quiensoy").on('click', function(){ window.location = "/user/auth"; });
	$("#ubicacion").on('click', function() {
		$('#dondeestoy').html('');
		$("#dondeestoy").append('<p>Maybe you\'re nearby '+miubicacion[0]+','+miubicacion[1]+'</p>');
		$('#dondeestoy').css('display','inline');
		$("#dondeestoy").removeClass().addClass("fadeInDown");
		setTimeout(function() { $('#dondeestoy').removeClass().addClass("fadeOutDown");},3000);
	});
	/* Parallax Effects */
	$(".slide-option").rlSmooth();
	$(".slideOut-option").rlSmooth('slideOut',{ y: 500, on: 550, off: 800 });
	$(".slideHide-option").rlSmooth('slideHide',{ y: 1900 });
	$(".fade-option").rlSmooth('fade',{ y: 500 });
	$(".fadeUp-option").rlSmooth('fadeUp',{ y: 700 });
	$(".fadeHide-option").rlSmooth('fadeHide',{ y: 900 });
	$(".showHide-option").rlSmooth('showHide',{ y: 1100 });
	$(".showUp-option").rlSmooth('showUp',{ y: 1300 });
	$(".showOut-option").rlSmooth('showOut',{ y: 1500 });
//
});

