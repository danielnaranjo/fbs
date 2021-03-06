	// Cargar todos los avisos
	var avisos = function() {
		$('#avisos').html('');
		$.getJSON( "/post?limit=10", function(data) {
		var items = [];
		$.each( data, function( key, val ) {
			$('#avisos').append("<div>");
			$('#avisos').append("<a href='/post/" + val.id + "' target=\"_blank\">" + val.title + " (" + val.publisher + ")</a> ");
			$('#avisos').append("<a href=\"javascript:editPost('"+val.id+"');\"><i class=\"glyphicon glyphicon-pencil text-success\"></i></a> ");
			$('#avisos').append("<a href=\"javascript:rejectPost('"+val.id+"');\"><i class=\"glyphicon glyphicon-remove text-danger\"></i></a> ");
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
			$('#usuarios').append("<a href='/user/" + val.id + "' target=\"_blank\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Tooltip on right\">" + val.username + "</a> ");
			$('#usuarios').append("<a href=\"javascript:rejectUser('"+val.id+"');\"><i class=\"glyphicon glyphicon-remove text-danger\"></i></a> ");
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

	// Avisos relacionados
	var relacionados = function(x) {
		//var pathname = window.location.pathname; 
		//var last = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
		//$.getJSON( "/post/related/"+last, function(data) {
		$.getJSON( "/post/related/"+x, function(data) {
			$('#showList').html('');
			if(data.length) {
				$('#showList').prepend('<br><h4>Active post: '+data.length+'</h4>');
			} else {
				$('#showList').html('');
				$('#showList').prepend('<br><h4>No post? Be may guest and create one!</h4>');
			}
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
	var related = function(x,y) {
		//var pathname = window.location.pathname; 
		//var last = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
		$.getJSON( "/post/related/"+x+"?l=4", function(data){
			$('#showRelated').html('');
			//console.log(data.length);
			if(data.length==0){
				$('#vermas').hide();
				//console.log('No more post by user!');
			}
			$.each( data, function( key, val ) {
				$('#showRelated').append('<div class="box col-xs-6 col-sm-4"><h4><a href="/post/'+val.id+'">'+val.title+'</a></h4><p>'+val.summary+'</p></div>');
				// <p id="'+val.id+'">Loading..</p>'+makeTags(''+val.id+'',''+val.populars+'')+'
			});
		});
	}
/* Muestro avisos relacionado al termino empleado
   //similar('<%= post.populars %>'.replace(/,/g,"+"),4);
	var similar = function(x,y) {
		$.getJSON( "/post/search/?term=" + x + "?l="+y, function(data) {
			$('#nearby').append('<a class="azul" href="/post/search/?term='+ pais +'">'+ pais +'</a>');
			$('#showSimilar').html('');
			// console.log(data.length);
			if(data.length==0){
				$('#similar').hide();
			}
			$.each( data, function( key, val ) {
				$('#showSimilar').append('<div class="box col-xs-6 col-sm-4"><h4><a href="/post/'+val.id+'">'+val.title+'</a></h4><p>'+val.summary+'</p><p>'+val.populars+'</p></div>'); 
			});
		});
	}
*/
	/* Confirmo eliminar TODO */
	var confirmDelete = function() {
		var confirmed = confirm('Are you sure you want to delete?');
		if(confirmed==true) { console.log('Bye Bye'); }
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
		$.ajax({ type: "POST", url: "/post/destroy/"+x })
		.done(function( msg ) { console.log('Ok deletePost'); });
		relacionados();
	}
	var rejectUser = function(x){
		$.ajax({ type: "POST", url: "/user/reject/"+x })
		.done(function( msg ) { console.log('Ok rejectUser'); }); 
		usuarios(); 
	}
	var rejectPost = function(x){
		$.ajax({ type: "POST", url: "/post/reject/"+x })
		.done(function( msg ) { console.log('Ok rejectPost'); }); 
		relacionados();
	}
	var reduceTitle = function(x) {
		var miniTitle;
		if(x.length > 25) {
			miniTitle = x.substring(0,24)+"...";
		}
		return miniTitle;
	}
	/* Convert all URL to Link */
	var linkify = function(inputText) {
		var replacedText, replacePattern1, replacePattern2, replacePattern3;
		//URLs starting with http://, https://, or ftp://
		replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">Link</a>');
		//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
		replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
		replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">Link</a>');
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
		if($(this).height()>=205) {
			$('#contenido').css('margin-top','105px');
			//console.log('Nuevo '+$(this).height());
		}
	};
	/* Fire Location */
	var showLocation = function(){
		$('#dondeestoy').html('');
		$("#dondeestoy").append('<p>We locate you by '+getCookie('ciudad') +' '+getCookie('pais')+'</p>');
		$('#dondeestoy').css('display','inline');
		$("#dondeestoy").removeClass().addClass("fadeInDown");
		setTimeout(function() {
			$('#dondeestoy').removeClass().addClass("fadeOutDown");
		},5000);
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
		$('.envelope').append('<a href="#"></a>');
		$('.envelope a').append('hello@findby.co');		
	};
	/* Fire Languages */
	var language = function(){
		var language = window.navigator.userLanguage || window.navigator.language;
		$('#lang').attr('value', language);
		idioma = language;
	};
	var populars = function(){
		var list=[];
		$.getJSON("/tags?limit=1000", function( data ) {
			$('#popular ul').html('');
			$.each( data, function(key,val){
				list.push(val.tag);
			});
			var counts = {};
			for(var i=0;i< list.length;i++){
				var key = list[i]; counts[key] = (counts[key])? counts[key] + 1 : 1 ;
			}
			$.each( counts, function(k, j ) {
				if(j>4) {
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
			for(var i=0;i<list.length;i++){
				var key = list[i]; counts[key] = (counts[key])? counts[key] + 1 : 1 ;
			}
			$.each( counts, function(k, j ) {
				if(j>4) {
					$('#populares ul').append('<li class="tag'+j+'"><a href="/post/tags/'+k+'">'+k+' ('+j+')</a></li>');
				}
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
	var makeLang = function() {
		$("#opciones ul").append('<li id="languages"><select name="locale"></select></li>');
		var locales = "<%=sails.config.i18n.locales%>";
		var idiomas = locales.split(",");
		for(i=0; i < idiomas.length; i++) {
			$("#languages select").append('<option value="'+idiomas[i]+'">'+idiomas[i]+'</option>');
		}
	};
	// <div id="t">todos,los,perros,piden,perdon,perro,cagon,gon</div>
	var makeTags = function(x) {
		var replacedText ="";
		var arr = x.split(',');
		for(var i=0; i<arr.length; i++) {
			replacedText += arr[i].replace(arr[i],'<a href="/post/tags/'+arr[i]+'" class="tagged">'+arr[i]+'</a> ');
		}
		return replacedText;
	};
	var magicTags = function(){
		$('#t').css('display','inline-block');
		document.getElementById('t').innerHTML=makeTags(document.getElementById('t').innerHTML);
	};
	/* Requerido por aboutmap in /about/index */
	function random(min, max) {
		return Math.floor((Math.random() * max) + min);
	}
	/* Animacion aboutmap in /about/index */
	var aboutmap = function() {
        // http://eledwin.com/blog/como-crear-lluvia-de-colores-en-un-sitio-web-con-jquery-42
        var startPos = -50;
        var speed = 30000;
        var cantidad = 500;
        setInterval(function () {
            var w = window.innerWidth;
            var h = window.innerHeight;
            var e = document.createElement("div");
            $(e).css("display", "inline-block");
            $(e).css("width", "35px");
            $(e).css("height", "45px");
            $(e).css("background-image", "url('/img/pin.png')");
            $(e).css("position", "absolute");
            $(e).css("top", startPos + "px");
            $(e).css("left", random(0, w) + "px");
            $(e).css("z-index", "1000");
            $(e).animate({ top: h + "px" }, speed, "linear", function () {
                this.remove();
            });
            $("#aboutmap").append(e);
        }, cantidad);
    };
	/* Menu y derivado */
	var menu = function() {
		$('#opciones').toggle().removeClass().addClass("fadeInRight");
		$("#opciones").on('mouseleave', function(){
			setTimeout(function() { $('#opciones').hide(); },3000);
		});
	};
	var login = function() {
		window.location = "/user/auth";
	};
	var newOne = function() {
		window.location = "/user/new";
	};

	/* Google Analytics */
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-35993973-9', 'findby.co');
	ga('send', 'pageview');

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

	var referred = function() {
		var url = window.location.search;
		//window.location.href="/user/auth/login?r="+x;
		url = url.replace("?", ''); // remove the ?
		//console.log(url); //alerts ProjectID=462 is your case
	}
	/* Mostrar los ultimos avisos */
	var latest = function(x) {
		// 
		setTimeout(function() { 
			$.getJSON( '/post/country/'+x+'?limit=10&sort=createdAt desc', function(data) {
				$('#latest').html('');
				$.each( data, function( key, val ) {
					$('#latest').append('<div class="text-item"><span class="glyphicon glyphicon-globe"></span> <a href="/post/' + val.id + '"><strong>'+ val.title +'</strong> in <strong>'+ val.city +'</strong> '+ val.country +'</a></div>');
					//console.log(val.title);
				});
			});
		},4000);
	}
	var regional = function() {
		var ciudad=getCookie('ciudad'),pais=getCookie('pais');
		/* redirect to */
		if(ciudad!="") {
			/* redirect to ciudad */
			window.location.href="/post/city/"+ciudad;
			$('#logo a').attr("href","/post/city/"+ciudad);
			$('#region').html(ciudad);
			//$('#opciones ul').append('<li>&nbsp;</li><li><a href="/post/country/'+pais+'">'+pais+'</a></li>');

		} else if(pais!="") {
			/* redirect to pais */
			window.location.href="/post/country/"+pais;
			$('#logo a').attr("href","/post/country/"+pais);
			$('#home').attr("href","/post/country/"+pais);
			/* Mostrar menu personalizado */	
			//$('#opciones ul').append('<li>&nbsp;</li><li><a href="/post/country/'+pais+'">'+pais+'</a></li>');
			$('#region').html(pais);
		} else {
			/* Global site*/
			$('#region').html('Global');
		}
		/* Fire location message ! */
		showLocation();
		//console.log(document.cookie);
	}

/////////////////////////////////////////////////////////////////////////////////////////////




$(document).ready(function(e) {
//
	//latest(getCookie('pais'));
	referred();
	/* masonry */
	//$("#contenido").masonry({itemSelector:'.box'});
	var $container = $('#contenido').masonry({itemSelector:'.box'});
	// layout Masonry again after all images have loaded
	$container.imagesLoaded( function(){ $container.masonry();});

	/* Parallax Effects
	$(".slide-option").rlSmooth();
	$(".slideOut-option").rlSmooth('slideOut',{ y: 500, on: 550, off: 800 });
 */
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
	/* Load populars tags */
	populars();
	/* Fire latest posts */
	$('#latest').rotaterator({fadeSpeed:1000, pauseSpeed:3000});
	//
	
});

//
(function($){
	$.fn.extend({ 
        //plugin name - rotaterator
        rotaterator: function(options) {

        	var defaults = {
        		fadeSpeed: 600,
        		pauseSpeed: 100,
        		child:null
        	};

        	var options = $.extend(defaults, options);

        	return this.each(function() {
        		var o =options;
        		var obj = $(this);                
        		var items = $(obj.children(), obj);
        		items.each(function() {$(this).hide();})
        		if(!o.child){var next = $(obj).children(':first');
        	}else{var next = o.child;
        	}
        	$(next).fadeIn(o.fadeSpeed, function() {
        		$(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
        			var next = $(this).next();
        			if (next.length == 0){
        				next = $(obj).children(':first');
        			}
        			$(obj).rotaterator({child : next, fadeSpeed : o.fadeSpeed, pauseSpeed : o.pauseSpeed});
        		})
        	});
        });
        }
    });
})(jQuery);