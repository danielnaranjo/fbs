/* Generales */
	var miubicacion = [];
	
	function showPosition(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		miubicacion[0]=lat.toFixed(3);
		miubicacion[1]=lng.toFixed(3);
		//console.log(miubicacion[0]+','+miubicacion[1]);
	}
	function onError() {
		if (navigator.geolocation) {
			$('#dondeestoy').append("Error: The Geolocation service failed.");
			$('#dondeestoy').css('display', 'inline');
			$("#dondeestoy").removeClass().addClass("fadeInUp");
			setTimeout(function() {
				$('#dondeestoy').removeClass().addClass("fadeOutUp");
			}, 5000);
		} else {
			$('#dondeestoy').append("Error: Your browser doesn't support geolocation. Are you in Siberia?");
			$('#dondeestoy').css('display', 'inline');
			$("#dondeestoy").removeClass().addClass("fadeInUp");
			setTimeout(function() { $('#dondeestoy').removeClass().addClass("fadeOutUp");}, 5000);
		}
	}
//

$(document).ready(function(e) {
//	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, onError);
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
			// Mostrar datos en la caja de busqueda
			//$("#w").val('Estas cerca de '+miubicacion[0]+','+miubicacion[1]);
		}, 2000);
	} else { onError();}

	/* masonry */
	$("#contenido").masonry({ itemSelector: 'li' });
	$("#contenido2").masonry({ itemSelector: 'li' });
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

