	/* Variables globales */
	var miubicacion=[],
		ciudad="",
		pais="",
		Lat="",
		Lon="";

	// Carga la GEO de HTML5
	function showPosition(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		miubicacion[0]=lat.toFixed(3);
		miubicacion[1]=lng.toFixed(3);
		// Compruebo que hay contenido?
		if(!miubicacion) {
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
	// Cargar todos los avisos
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
    // Cargar usuarios
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
    // Total posts
    var totalPosts = function() {
		$.getJSON( "/post", function(data) {
			$('#avisos').prepend('<h3>Active: '+data.length+' posts</h3>');
		});
		console.log('Counting posts');
	}
	// Total usuarios
    var totalUsers = function() {
		$.getJSON( "/user", function(data) {
			$('#usuarios').prepend('<h3>Active: '+data.length+' users</h3>');
		});
		console.log('Counting users');
	}
	// Mapa total
	var mapa = function(){
		$('#mapa').html('');
		var map = L.map('mapa').setView([miubicacion[0], miubicacion[1]], 5);
		L.tileLayer('http://{s}.tile.cloudmade.com/2aa8946815814d3ea0bb70bd8e8a8ea5/997/256/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'}).addTo(map);
		var popup = L.popup();
		L.marker([miubicacion[0], miubicacion[1]])
			.addTo(map)
			.bindPopup("<strong>You are here</strong>: "+ miubicacion[0]+","+ miubicacion[1])
			.openPopup();

		var LeafIcon = L.Icon.extend({ 
			options: {
				shadowUrl: '/img/marker-shadow.png'
			} 
		});
		var Icon = new LeafIcon({
			iconUrl: '/img/marker-yellow.png'
		});

		$.getJSON( "/post", function(data) {
		var locacion=[], marcador=[];
		$.each( data, function( key, val ) {
			console.log(val.title+">"+val.location); 
			var locacion = val.location;
			var marcador = locacion.split(",");
			L.marker([parseInt(marcador[0]), parseInt(marcador[1])], {icon: Icon})
				.addTo(map)
				.bindPopup("<strong>"+val.title+"</strong>");
			});
		});
	}
	// Avisos relacionados
	var relacionados = function() {
		$('#showList').html('<h3>Loading..</h3>');
		$('#showList').html('');
		var pathname = window.location.pathname; 
		var last = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
        $.getJSON( "/post/related/"+last+"/?sort=DESC&limit=4", function(data) {
        if(data.length) {
        	$('#showList').prepend('<br><h4>Active post: '+data.length+'</h4>');
        } else {
        	$('#showList').prepend('<br><h4>No post? Be may guest and create one!</h4>');
        }
          var items = [];
          $.each( data, function( key, val ) {
          	$('#showList').append("<div>");
            $('#showList').append("<a href='/post/" + val.id + "' target=\"_blank\">" + val.title + "</a> ");
            $('#showList').append("<a href='/post/edit/"+val.id+"'><i class='glyphicon glyphicon-pencil text-success'></i></a> ");
            $('#showList').append("<a href='/post/destroy/"+val.id+"' OnClick='confirmDelete();'><i class='glyphicon glyphicon-remove text-danger'></i></a> ");
            $('#showList').append("</div>");
          });
        });
	}
	var related = function() {
		$('#showRelated').html('<h3>Loading..</h3>');
		$('#showRelated').html('');
		var pathname = window.location.pathname; 
		var last = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
        $.getJSON( "/post/related/"+last, function(data) {
//	        if(data.length==0) {
//	        	$('#vermas').hide();
//	        }
          var items = [];
          $.each( data, function( key, val ) {
          	$('#showRelated').append('<div class="box col-xs-6 col-sm-4">');
            $('#showRelated').append('<h4><a href="/post/'+val.id+'">'+val.title+'</a></h4>');
            $('#showRelated').append('<p>'+val.summary+'</p>');
            $('#showRelated').append('<p>'+val.populars+'</p>');
            $('#showRelated').append('</div>');
          });
        });
	}
	/* Confirmo eliminar TODO */
	var confirmDelete = function() {
		return confirm('Are you sure you want to delete?');
	}

	// Muestra Geo segun IP
	function WhereAmI() {
		$.getJSON('http://freegeoip.net/json/', function(location) {
			// window.location.replace("/?city="+location.city+"&country="+location.country_name);
			Lat=location.latitude;
			Lon=location.longitude;
			ciudad=location.city;
			pais=location.country_name;
			dip=location.ip;
		});
	}
	// Llenar formularios
	var WhereIP = function() {
		setTimeout(function() {
			$('#city').attr('value',ciudad);
			$('#country').attr('value',pais);
			$('#location').attr('value',miubicacion[0]+','+miubicacion[1]);
		},3000);
	}

$(document).ready(function(e) {
//	
	console.log('OK!');
	WhereAmI();
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
		$("#dondeestoy").append('<p>Maybe you\'re nearby '+ciudad +' '+pais+'</p>');
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

