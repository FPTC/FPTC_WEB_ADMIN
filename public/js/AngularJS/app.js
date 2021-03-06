(function() {
	var app = angular.module('funcancer', [
		'estadisticasControllers',
		'edicionController',
		'datosControllers', 
		'paisesControllers',
		'recuperarControllers',
		'usuariosControllers',
		'preguntasControllers',
		'webMainControllers',
		'accesosFactory',
		'detalleSenoControllers', 
		'detalleCervixControllers' ,
		'loginControllers',
		'ciudadesControllers',
		'eseControllers',
		'ipsControllers',
		'codigosControllers',
		'filtrosControllers',
		'comunasControllers',
		'ngRoute', 
		'firebase', 
		"ngMessages"]);

	app.config(['$routeProvider', '$locationProvider', '$qProvider' , function($routeProvider, $locationProvider, $qProvider) {

		$routeProvider

		.when('/login', {
			templateUrl: "views/login/main.html",
			controller: 'loginMainController',
		}).when('/edicionPerfil', {
			templateUrl: "views/edicion/main.html",
			controller: 'edicionMainController',
		}).when('/recuperar', {
			templateUrl: "views/login/recuperar.html",
			controller: 'recuperarController',
		}).when('/preguntas', {
			templateUrl: "views/preguntas/main.html",
			controller: 'preguntasMainController',
		})
		.when('/preguntas/detalleCervix', {
			templateUrl: "views/preguntas/detalleCervix.html",
			controller: 'detalleCervixMainController',
		})
		.when('/preguntas/detalleSeno', {
			templateUrl: "views/preguntas/detalleSeno.html",
			controller: 'detalleSenoMainController',
		})
		.when('/usuarios', {
			templateUrl: "views/usuarios/main.html",
			controller: 'usuariosMainController'
		})
		.when('/estadisticas', {
			templateUrl: "views/estadisticas/main.html",
			controller: 'estadisticasMainController'
		})

		.when('/datos', {
			templateUrl: "views/datos/datos.html",
			controller: 'datosMainController'
		})

		.when('/parametros', {
			templateUrl: "views/parametros/parametros.html",
			controller: 'paisesMainController'
		})

		.when('/parametros/ciudades/:idPais', {
			templateUrl: "views/parametros/ciudades/ciudades.html",
			controller: 'ciudadesMainController',
			resolve: {
				variables: function(validarAcceso){
					return validarAcceso.token();
				}   
			}
		})

		.when('/parametros/comunas/:idCiudad', {
			templateUrl: "views/parametros/comunas/comunas.html",
			controller: 'comunasMainController',
			resolve: {
				variables: function(validarAcceso){
					return validarAcceso.token();
				}   
			}
		})

		.when('/parametros/ese/:idCiudad', {
			templateUrl: "views/parametros/ese/ese.html",
			controller: 'eseMainController',
			resolve: {
				variables: function(validarAcceso){
					return validarAcceso.token();
				}   
			}
		})

		.when('/parametros/ips/:idESE', {
			templateUrl: "views/parametros/ips/ips.html",
			controller: 'ipsMainController',
			resolve: {
				variables: function(validarAcceso){
					return validarAcceso.token();
				}   
			}
		})




		.when('/parametros/ciudades', {
			templateUrl: "views/parametros/parametros.html",
			controller: 'paisesMainController',
			resolve: {
				variables: function(validarAcceso){
					return validarAcceso.token();
				}   
			}
		})

		.when('/codigos', {
			templateUrl: "views/codigos/codigos.html",
			controller: 'codigosMainController',
			resolve: {
				variables: function(validarAcceso){
					return validarAcceso.token();
				}   
			}
		})


		.when('/parametros', {
			templateUrl: "views/parametros/parametros.html",
			controller: 'paisesMainController'
		})


		.when('/filtrosMamografia', {
			templateUrl: "views/usuarios/filtros/mamografia.html",
			controller: 'mamografiaMainController'
		})


		.when('/filtrosCitologia', {
			templateUrl: "views/usuarios/filtros/citologia.html",
			controller: 'citologiaMainController'
		})


		.when('/inicio', {
			templateUrl: "views/web/main.html",
			controller: 'webMainController',
		}).otherwise({
			redirectTo: '/'
		})
	}]);
	app.factory("transacciones", function() {
		var botonAmpliacion = "none";
		var interfaz = {
			cambiarBotonAmpliacion: function(entrada) {
				botonAmpliacion = 1;
			},
			getCambiarBotonAmpliacion: function() {
				return botonAmpliacion;
			}
		}
		return interfaz;
	});


	app.factory("messageService", function($q){
		return {
			getMessage: function(){
				return $q.when("Hello World!");
			}
		};
	})
	app.controller('mainController', function($scope, $window, $route, $mdDialog, $mdMedia, $mdToast , $timeout, $location, $mdSidenav, $timeout, transacciones) {


		jQuery(document).keyup(function(e){
			if(e.keyCode==27){


				return false;
			}
		});

		$scope.tieneCiudades = function (myObject) {

			console.log(myObject);
			for(var key in myObject) {
				if (myObject.hasOwnProperty(key)) {
					return false;
				}
			}

			return true;
		}


		var temp = $location["$$url"].split("/");
		$scope.raiz = temp;

		console.log($scope.raiz);

		var t = [];

		for(i=1 ; i<$scope.raiz.length ; i++){

			if(i>1){
				t.push(t[i-2]+"/"+$scope.raiz[i]);
			}else{
				t.push($scope.raiz[i]);
			}
		}

		$scope.fechaNumerica = function (date) {
			var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();


			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;

			return [year, month, day+String(d).substring(15,24)].join('-');
		}


		$scope.indices = t;
		if($location.path()=="/login"){
			$location.path("inicio")
		}

		console.log($scope.indices);

		$scope.cambioRaiz = function(indice){
			console.log(indice);
			console.log($scope.indices);
			$location.path($scope.indices[indice - 1]);

		}


		var last = {
			bottom: false,
			top: true,
			left: false,
			right: true
		};

		$scope.toastPosition = angular.extend({},last);

		$scope.getToastPosition = function() {
			sanitizePosition();

			return Object.keys($scope.toastPosition)
			.filter(function(pos) {

				return $scope.toastPosition[pos]; })
			.join(' ');
		};

		function sanitizePosition() {
			var current = $scope.toastPosition;

			if ( current.bottom && last.top ) current.top = false;
			if ( current.top && last.bottom ) current.bottom = false;
			if ( current.right && last.left ) current.left = false;
			if ( current.left && last.right ) current.right = false;

			last = angular.extend({},current);
		}



		var llegada=  firebase.database().ref('datosDescarga'). on('value', function(data) {

			$scope.documentos = data.val();

			$scope.datos=[];
			for(documento in $scope.documentos){

				$scope.datos.push($scope.documentos[documento]);
			}

			$scope.$apply();
		});



		$scope.informacionUsuario = {};
		$scope.informacionUsuario.parentProperty = "";
		$scope.imagenNav = {};
		$scope.imagenNav.parentProperty = "img/amateLogoSolo.png";
		$scope.nombreUsuario = {};
		$scope.nombreUsuario.parentProperty = "";
		$scope.mostrarMenuHeader = {};
		$scope.mostrarMenuHeader.parentProperty = "none";
		$scope.prueba = {};
		$scope.prueba.parentProperty = "none";

		window.onresize = function(){ 

			if (window.matchMedia("(orientation: portrait)").matches) {

			}

			if (window.matchMedia("(orientation: landscape)").matches) {

			}
		} 


		$scope.logOut = function() {
			firebase.auth().signOut().then(function() {
				$location.path("login");
				location.reload();
			}, function(error) {

			});
		} 


		$scope.hide = function() {
			$mdDialog.hide();
		};

        //centro de mensajes
        $scope.mensajes = {};
        $scope.mensajes.parentProperty = function(mensaje, textoBoton, duracion, target){

        	if(!textoBoton){
        		var textoBoton = "";
        	}

        	if(!duracion){
        		var duracion = 2000;
        	}

        	if(!target){
        		var target = '#toast-container';
        	}

        	var pinTo = $scope.getToastPosition();
        	var toast = $mdToast.simple().textContent(mensaje)
        	.action(textoBoton).highlightAction(true)
        	.hideDelay(duracion).position(pinTo)
        	.parent(document.querySelectorAll(target));

        	$mdToast.show(toast).then(function(response) {
        		if (response == 'Aceptar') {
        		}

        	});

        }

        $scope.cambiarEstado = function(){

        	var es = firebase.auth().onAuthStateChanged(function(user) {
        		if (user) {
        			var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(datos) {


        				var temp = $location["$$url"].split("/");
        				$scope.raiz = temp;

        				console.log($scope.raiz);

        				var t = [];

        				for(i=1 ; i<$scope.raiz.length ; i++){

        					if(i>1){
        						t.push(t[i-2]+"/"+$scope.raiz[i]);
        					}else{
        						t.push($scope.raiz[i]);
        					}
        				}

        				$scope.indices = t;
        				if($location.path()=="/login"){
        					$location.path("inicio")
        				}


        				if(datos.val()==  null){

        					$location.path("login");
        					$scope.$apply();
        				}




        				if(datos.val()!==  null){

        					$scope.perfil=datos.val().profile;




        					if (user.providerData[0].providerId == "facebook.com") {

        						$scope.imagenNav.parentProperty = "https://graph.facebook.com/" + user.providerData[0].uid + "/picture?height=500";
        						$scope.nombreUsuario.parentProperty = "" + user.providerData[0].displayName;
        					} else {

        						$scope.imagenNav.parentProperty = "img/amateLogoSolo.png";
        						$scope.nombreUsuario.parentProperty = "" + user.providerData[0].uid;
        					}
        					$scope.mostrarMenuHeader.parentProperty = "block";

        					$scope.botonAmpliacion = "initial";


        					transacciones.cambiarBotonAmpliacion("jeje");
        					$scope.informacionUsuario.parentProperty = user;
        					$scope.prueba.parentProperty = "initial";

        					$scope.botonAmpliacion = transacciones.getCambiarBotonAmpliacion();
        					$scope.botonAmpliacion = "ddd";



        					$scope.user = user;

        					$scope.estadoo = $mdSidenav('left').isOpen();;

        					if ($scope.estadoo == false) {
        						$mdSidenav("left").toggle();


        					}
        					$("#nav").css("display", "");
        					$("#cuerpo").addClass("cuerpoWeb");



        					$scope.abriendoMenu = "colapsado";

        					$scope.abriendo = function(location) {

        						if ($scope.abriendoMenu == "colapsando") {
        							$scope.abriendoMenu = "colapsado";
        						} else {
        							$scope.abriendoMenu = "colapsando";
        						}
        					}
        					$scope.openMenu = function($mdOpenMenu, ev) {

        						$scope.$on("$mdMenuClose", function() {

        						});
        						originatorEv = ev;
        						$mdOpenMenu(ev);
        					};

        					$scope.goSeccion = function(location) {
        						$location.path("" + location);
        					}


        					$scope.toggleLeft = buildToggler('left');
        					$scope.toggleRight = buildToggler('right');
        					$scope.isSidenavOpen = true;
        					$timeout(function() {}, 25);
        					buildToggler();
        					$scope.openNav = true;
        					$scope.estado = function estado() {
        						if ($scope.openNav == true) {

        							$scope.openNav = false;
        							$("#cuerpo").removeClass("cuerpoWeb");
        						} else {

        							$scope.openNav = true;
        							$("#cuerpo").addClass("cuerpoWeb");
        						}
        					}
        					$scope.edicionDatos = function(ev, i) {
        						$location.path("edicionPerfil");
        					}


        					function buildToggler(componentId) {

        						if (componentId = "left") {} else {}
        							$("#cuerp").addClass("cuerpo");
        						return function() {
        							$mdSidenav("left").toggle();
        						};
        					}

        				}

        			});




        		} else {


        			$location.path("login");
        		}
        	});
        }


    })
})();