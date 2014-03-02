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
		$('#nogeo').html('');
		if (navigator.geolocation){
			$('#nogeo').append("Error: The Geolocation service failed."); 
			//alert("Error: The Geolocation service failed.");
			$('#nogeo').css('display', 'inline');
			$("#nogeo").removeClass().addClass("bounceInLeft");
			setTimeout(function() {
				$('#nogeo').removeClass().addClass("bounceOutLeft");
				//WhereAmI();
			}, 5000);
		} else {
			$('#nogeo').append("Error: Your browser doesn't support geolocation. Are you in Siberia?");
			//alert("Error: Your browser doesn't support geolocation");
			$('#nogeo').css('display', 'inline');
			$("#nogeo").removeClass().addClass("bounceInLeft");
			setTimeout(function() { 
				$('#nogeo').removeClass().addClass("bounceOutLeft");
				//WhereAmI();
			}, 5000);
		}
	}
	function WhereAmI() {
		$.getJSON('http://freegeoip.net/json/', function(location) {
			window.location.replace("/?city="+location.city+"&country="+location.country_name);
			miubicacion[0]=location.latitude;
			miubicacion[1]=location.longitude;
		});
	}
	function makeModal() {

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
	$("#contenido").masonry({ itemSelector: 'li' });
	$("#contenido2").masonry({ itemSelector: 'li' });
	$("#relacionado").masonry({ itemSelector: 'li' });
	/* Cuadro de busqueda */
	$('#busqueda').on('click', function() { $('#buscador').toggle().removeClass().addClass("fadeInDown"); });
	/* Contador de anuncios */
    $(".timer").append('10K');
	/* Menu y derivado */
	$("#elmenu").on('click', function() { $('#opciones').toggle().removeClass().addClass("fadeInRight");});
	$("#opciones").on('mouseleave', function(){ setTimeout(function() { $('#opciones').hide(); },3000);});
    /* Tooltip */
    $('.fs1').qtip({ style: { classes: 'qtip-light qtip-shadow' } });
    $('header div').qtip({ style: { classes: 'qtip-light qtip-shadow' } });
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

