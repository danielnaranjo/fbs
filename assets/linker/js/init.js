/* Variables globales */
var miubicacion = [], ciudad = "", pais = "", Lat = "", Lon = "", OneTime = 0;

// Carga la GEO de HTML5
function showPosition(position) {
    var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	miubicacion[0] = lat.toFixed(3);
	miubicacion[1] = lng.toFixed(3);
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
		// Check if message was show then..
		if(OneTime==0){
			$('#nogeo').css('display', 'inline');
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
		}
		miubicacion[0]=Lat;
		miubicacion[1]=Lon;
		OneTime=1;
		console.log(miubicacion+" "+OneTime);
	}
	// Cargar todos los avisos
	var avisos = function() {
		$('#avisos').html('');
		$.getJSON( "/post?sort=DESC&limit=10", function(data) {
		var items = [];
		$.each( data, function( key, val ) {
			$('#avisos').append("<div>");
			$('#avisos').append("<a href='/post/" + val.id + "' target=\"_blank\">" + val.title + "</a> ");
			$('#avisos').append("<a href=\"javascript:deletePost('"+val.id+"');\"><i class=\"glyphicon glyphicon-remove text-danger\"></i></a> ");
			$('#avisos').append("</div>");
			});
		});
		console.log('Loading posts');
	}
	// Cargar usuarios
	var usuarios = function() {
		$('#usuarios').html('');
		$.getJSON( "/user/show?sort=DESC&limit=10", function(data) {
		var items = [];
		$.each( data, function( key, val ){
			$('#usuarios').append("<div>");
			$('#usuarios').append("<a href='/user/" + val.id + "' target=\"_blank\">" + val.username + "</a> ");
			$('#usuarios').append("</div>");
			});
		});
		console.log('Loading users');
	}
	// Total posts
	var totalPosts = function() {
		$.getJSON( "/post", function(data) {
			$('#avisos').prepend('<h3>Active: '+data.length+' posts</h3>');
			$('#avisos h3').append(' <i class="glyphicon glyphicon-refresh" onclick="javascript:avisos();totalPosts();"></i>');
		});
		console.log('Counting posts');
	}
	// Total usuarios
	var totalUsers = function() {
		$.getJSON( "/user/show", function(data) {
			$('#usuarios').prepend('<h3>Active: '+data.length+' users</h3>');
			$('#usuarios h3').append(' <i class="glyphicon glyphicon-refresh" onclick="javascript:usuarios();totalUsers();"></i>');
		});
		console.log('Counting users');
	}
	// Mapa total
	var mapa = function(){
		$('#mapa').html('');
		var map = L.map('mapa').setView([miubicacion[0], miubicacion[1]], 5); console.log(miubicacion[0]+','+ miubicacion[1]);
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
		var Icon = new LeafIcon({ iconUrl: '/img/marker-yellow.png' });
		$.getJSON( "/post", function(data) {
		var locacion=[], marcador=[];
		$.each( data, function( key, val ) {
			var locacion = $.trim(val.location);
			var marcador = locacion.split(",");
			L.marker([parseInt(marcador[0]), parseInt(marcador[1])],{icon: Icon})
				.addTo(map)
				.bindPopup("<strong>"+val.title+"</strong>");
			});
		});
	}
	// Avisos relacionados
	var relacionados = function() {
		var pathname = window.location.pathname; 
		var last = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
		$.getJSON( "/post/related/"+last, function(data) {
		$('#showList').html('');
		if(data.length) {
			$('#showList').prepend('<br><h4>Active post: '+data.length+'</h4>');
		} else {
			$('#showList').prepend('<br><h4>No post? Be may guest and create one!</h4>');
		}
		var items = [];
		$.each( data, function( key, val ) {
			$('#showList').append("<div>");
			$('#showList').append("<a href='/post/" + val.id + "' target=\"_blank\">" + val.title + "</a> ");
			$('#showList').append("<a href=\"javascript:editPost('"+val.id+"');\"><i class=\"glyphicon glyphicon-pencil text-success\"></i></a> ");
			$('#showList').append("<a href=\"javascript:deletePost('"+val.id+"');\"><i class=\"glyphicon glyphicon-remove text-danger\"></i></a> ");
			$('#showList').append("</div>");
			});
		});
	}
	/* Relacionados en /post/ */
	var related = function() {
		$('#showRelated').html('<h3>Loading..</h3>');
		$('#showRelated').html('');
		var pathname = window.location.pathname; 
		var last = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);console.log(last);
		$.getJSON( "/post/related/"+last, function(data) {
			if(data.length==0){
				$('#vermas').hide();
			}
			$.each( data, function( key, val ) {
				$('#showRelated').append('<div class="box col-xs-6 col-sm-4">');
				$('#showRelated').append('<h4><a href="/post/'+val.id+'">'+val.title+'</a></h4>');
				$('#showRelated').append('<p>'+val.summary+'</p>');
				$('#showRelated').append('<p>'+val.populars+'</p>');
				$('#showRelated').append('</div>');console.log('OK! '+val.title); 
			});
		});
	}
	/* Confirmo eliminar TODO */
	var confirmDelete = function() {
		var confirmed = confirm('Are you sure you want to delete?');
		if(confirmed==true) { console.log('Bye Bye'); }
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
	/*Llenar formularios */
	var WhereIP = function() {
		setTimeout(function() {
			$('#city').attr('value',ciudad);
			$('#country').attr('value',pais);
			if(miubicacion[0] || miubicacion[1]) {
				$('#location').attr('value',miubicacion[0]+','+miubicacion[1]);
			} else {
				$('#location').attr('value',Lat+','+Lon);
			}
		},5000);
	}
	/* Masks */
	var editUser = function(x){
		window.location.href="/user/edit/"+x;
	}
	var editPost = function(x){
		window.location.href="/post/edit/"+x;
	}
	var deletePost = function(x){
		// window.location.href="/post/destroy/"+x;
		$.ajax({
			type: "POST",
			url: "/post/destroy/"+x
		})
		.done(function( msg ) {
			relacionados();
			console.log('Ok, reload #showList');
		});
	}
	/* Convert all URL to Link */
	var linkify = function(inputText) {
		var replacedText, replacePattern1, replacePattern2, replacePattern3;
		//URLs starting with http://, https://, or ftp://
		replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
		//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
		replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
		//Change email addresses to mailto:: links.
		replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
		replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
		return replacedText;
	}
	/* Read field and fire function */
	var url2link = function (){
		document.getElementById('ft').innerHTML=linkify(document.getElementById('ft').innerHTML);
	}
	/* Fire Menu */
	var showMenu = function(){
		$('#buscador').toggle();// .removeClass().addClass("fadeInDown");
		/*
		$("#buscador").on('mouseleave', function(){
			setTimeout(function() {
				$('#buscador').removeClass().addClass("fadeOutUp");
			},10000);
		});
		*/
	};
	/* Fire Location */
	var showLocation = function(){
		$('#dondeestoy').html('');
		$("#dondeestoy").append('<p>We locate you by '+ciudad +' '+pais+', right?</p>');
		$('#dondeestoy').css('display','inline');
		$("#dondeestoy").removeClass().addClass("fadeInDown");
		setTimeout(function() {
			$('#dondeestoy').removeClass().addClass("fadeOutDown");
		},3000);
	};
	/* Do tags in search field */
	var makeTags = function(){
		setTimeout(function() {
			$('#term').tagsinput('add', $("#term").val(), {confirmKeys:[32]});
			//$("#lacaja").trigger( "click" );
		},1000);
	};
	/* Reveal Skype user */
	var skype = function(){
		$("#skype").click(function(){
			$("#skype").html('<i class="glyphicon glyphicon-phone"></i><span> Skype: </span> <a href="skype:danielnaranjoserrano?call">danielnaranjoserrano</a>');
		});
	};
	/* Inyect email to preven scrappy */
	var envelope = function(){
		$('#envelope').append('<a href="#"></a>');
		$('#envelope a').append('hello@findby.co');
	};
	/* Fire Languages */
	var language = function(){
		var language = window.navigator.userLanguage || window.navigator.language;
		$('#lang').attr('value', language);
	};
	var populars = function(){
		var list=[];
		$('#popular ul').html('');
		$.getJSON("/tags", function( data ) {
			$.each( data, function(key,val){
				list.push(val.tag);
			});
			var counts = {};
			for(var i=0;i< list.length;i++){
				var key = list[i]; counts[key] = (counts[key])? counts[key] + 1 : 1 ;
			}
			$.each( counts, function(k, j ) {
				if(j>1) {
					$('#popular ul').append('<li class="tag'+j+'"><a href="/post/tags/'+k+'">'+k+'</a></li>');
				}
			});
		});
	};
	var populares = function(){
		var list=[];
		$('#populares ul').html('');
		$.getJSON("/tags", function( data ) {
			$.each( data, function(key,val){
				list.push(val.tag);
				//console.log(val.tag);
			});
			var counts = {};
			for(var i=0;i< list.length;i++){
				var key = list[i]; counts[key] = (counts[key])? counts[key] + 1 : 1 ;
			}
			$.each( counts, function(k, j ) {
				$('#populares ul').append('<li class="tag'+j+'"><a href="/post/tags/'+k+'">'+k+' ('+j+')</a></li>');
			});
		});
	};
	var paises = function(){
		var list=[];
		$('#paises ul').html('');
		$.getJSON("/user/show", function( data ) {
			$.each( data, function(key,val){
				list.push(val.country);
			});
			var counts = {};
			for(var i=0;i< list.length;i++){
				var key = list[i]; counts[key] = (counts[key])? counts[key] + 1 : 1 ;
			}
			$.each( counts, function(k, j ) {
				$('#paises ul').append('<li class="tag'+j+'"><a href="/post/tags/'+k+'">'+k+' ('+j+')</a></li>');
			});
		});
	};

$(document).ready(function(e) {
//
	//console.log('OK!');
	/* Need for IP, City, Country and Lat,Lon */
	WhereAmI(); populars();

	/* Geolocalization HTML5 */
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, onError);
	} else {
		onError();
	}

	/* masonry */
	$("#contenido").masonry({itemSelector:'.box'});
	//$("#contenido2").masonry({ itemSelector: 'li' });
	//$("#relacionado").masonry({ itemSelector: 'li' });

	/* Cuadro de busqueda */
	$('#busqueda').on('click', function() { showMenu(); });

	/* Contador de anuncios */
	$(".timer").append('10K');

	/* Menu y derivado */
	$("#elmenu").on('click', function() { $('#opciones').toggle().removeClass().addClass("fadeInRight"); });
	$("#opciones").on('mouseleave', function(){ setTimeout(function() { $('#opciones').hide(); },3000); });

	/* Tooltip */
	// $('.fs1').qtip({ style: { classes: 'qtip-light qtip-shadow' } });
	// $('header div').qtip({ style: { classes: 'qtip-light qtip-shadow' } });

	/* ET Go Home! */
	$("#logo").on('click', function(){ window.location = "/"; });

	/* Login desde Menu */
	$("#quiensoy").on('click', function(){
		window.location = "/user/auth";
	});
	/* Show me my location with or with geolocation */
	$("#ubicacion").on('click', function() { showLocation(); });

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

	/* Validar formularios */
	$("#signupform").validate({
		debug: false,
		rules: {
			username: { required:true, minlength:5, maxlength:20 },
			password: { required:true, minlength:5, maxlength:20 },
			email: { required:true, email: true	},
		},
		messages: {
			username: { required: '(Please enter your username (at least 5 characters))' },
			email: { required: '(Please enter a valid email)' },
			password: { required: '(Please enter your password (at least 5 characters)' }
		}
	});
	$("#loginfrom").validate({
		debug: false,
		rules: {
			username: { required:true, minlength:5, maxlength:20 },
			password: { required:true, minlength:5, maxlength:20 }
		},
		messages: {
			username: { required: '(Please enter your username (at least 5 characters))' },
			password: { required: '(Please enter your password (at least 5 characters)' }
		}
	});
	$("#postform").validate({
		debug: false,
		rules: {
			title: { required:true, minlength:5, maxlength:140 },
			text: { required:true, minlength:5 },
			city: { required:true },
			country: { required:true }
		},
		messages: {
			title: { required: '(Please enter the title of your product or service)' },
			text: { required: '(Please enter the large description' },
			city: { required: '(Please enter your current city)' },
			country: { required: '(Please enter your country)' }
		}
	});

//
});

