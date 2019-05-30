(function(){

	var app = angular.module('ipsControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'md.data.table' , 'ngAnimate', 'funcancer' ,'firebase' ])

	.controller('ipsMainController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , $routeParams ,registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

		$scope.ipss = [];
		$scope.selected=[];
		$scope.ese = $routeParams.idESE;
		$scope.cambiarEstado();

		console.log($scope.pais);

		$scope.query = {
			"filter":"",
			"order": 'name',
			"limit": 10,
			"page": 1
		};

		function success(desserts) {
			$scope.desserts = desserts;
		}

		$scope.logPagination = function (page, limit) {
		}

		$scope.consultar = function(){

			//primero es necesario traer los indices de la comuna
			firebase.database().ref("ese/"+$scope.ese).once('value' , function(response) {

				//Si no existe el indice, no va a existir en el nodo de paises
				if(response.val() == null ){

					$scope.mensajes.parentProperty("Recurso no encontrado.", "Aceptar", 3000);

					document.getElementById("datos").classList.remove("visible");
					document.getElementById("datos").classList.add("noVisible"); 

					document.getElementById("sinDatos").classList.remove("noVisible");
					document.getElementById("sinDatos").classList.add("visible");	

				}
				else{

					$scope.pais = response.val().idPais;
					$scope.ciudad = response.val().idCiudad;
					console.log(response.val());

					//si existe el nodo, consulto ahora el origen, usando los indices
					firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/"+$scope.ese).once('value' , function(response) {
						console.log(response.val());

						$scope.atras = response.val().idCiudad

						var respuesta = response.val();

						$scope.ipss = [];

						document.getElementById("sinDatos").classList.remove("visible");
						document.getElementById("sinDatos").classList.add("noVisible");

						document.getElementById("datos").classList.remove("noVisible");
						document.getElementById("datos").classList.add("visible"); 

						$scope.eseSeleccionada = response.val();
						$scope.nombreESE = " de "+$scope.eseSeleccionada.name;

						console.log($scope.eseSeleccionada);

						if ($scope.eseSeleccionada.ips != null){
							for(item in $scope.eseSeleccionada.ips){

								$scope.ipss.push( $scope.eseSeleccionada.ips[item] );
							}
						}

						console.log($scope.ipss);	
						$scope.$apply();			

					});	

				}

			});	

		}

		$scope.consultar();

		$scope.crearIPS = function (ev){

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'crearIPSController',
				templateUrl: 'views/parametros/ips/crear.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:false,
				fullscreen: useFullScreen,
				scope:$scope,
				preserveScope: true,
			})
			.then(function(answer) {

			}, function() {

			});
			$scope.$watch(function() {
				return $mdMedia('xs') || $mdMedia('sm');
			}, function(wantsFullScreen) {
				$scope.customFullscreen = (wantsFullScreen === true);
			});

		}

		$scope.editarIPS = function (ev, editando){

			$scope.editando = editando;

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'editarIPSController',
				templateUrl: 'views/parametros/ips/editar.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:false,
				fullscreen: useFullScreen,
				scope:$scope,
				preserveScope: true,
			})
			.then(function(answer) {

			}, function() {

			});
			$scope.$watch(function() {
				return $mdMedia('xs') || $mdMedia('sm');
			}, function(wantsFullScreen) {
				$scope.customFullscreen = (wantsFullScreen === true);
			});
		}

		$scope.eliminarIPS = function(ev, item){

			var confirm = $mdDialog.confirm()
			.title('Estas seguro de eliminar '+item.name)
			.textContent('Este proceso no puede deshacerse.')
			.ariaLabel('prompt')
			.targetEvent(ev)
			.ok('eliminar')
			.cancel('cancelar');

			$mdDialog.show(confirm).then(function(result) {
				firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/"+$scope.ese+"/ips/"+item.id).remove().then(function(administracion){
					$scope.mensajes.parentProperty("I.P.S eliminada satisfactoriamente.", "Aceptar", 3000);
					$scope.consultar();
					$mdDialog.hide();
				});

				//borrar indice
				firebase.database().ref("ips/"+item.id).remove().then(function(administracion){
					console.log("indice de ips eliminado "+item.id);
				});

			}, function() {
				
			});
		}

	})

.controller('crearIPSController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.nombre = "";

	$scope.enviar = function(){

		var id = new Date().getTime();
		console.log( $scope.nombre.toUpperCase());
			//antes de crear, revisamos si existe 
			firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/"+$scope.ese+"/ips").orderByChild("name").equalTo( $scope.nombre.toUpperCase() ).once('value' , function(respuesta) {
				//si no existe, se crea
				if(respuesta.val() == null){

					var send = {'name' : $scope.nombre.toUpperCase() , 'id': id, 'idPais' : $scope.pais, "idCiudad": $scope.ciudad, "isESE": $scope.ese ,'state' : true };
					var indice = {'id': id, 'idPais' : $scope.pais, "idCiudad": $scope.ciudad, 'state' : true, "isESE": $scope.ese };
					firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/"+$scope.ese+"/ips/"+id).set( send ).then(function(administracion){
						$scope.mensajes.parentProperty("I.P.S creada satisfactoriamente.", "Aceptar", 3000);
						$scope.consultar();
						$mdDialog.hide();
					});

					firebase.database().ref("ips/"+id).set(indice).then(function(administracion){
						console.log("indice creado satisfactoriamente");
					});
				}
				else{
					$scope.mensajes.parentProperty("La I.P.S ingresada ya existe en esta E.S.E", "Aceptar", 3000);
				}

			});	
		}

	})


.controller('editarIPSController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.nombre = $scope.editando.name;
	console.log($scope.editando);

	$scope.guardar = function(){

		var id = new Date().getTime();
			//antes de crear, revisamos si existe el pais
			firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/"+$scope.ese+"/ips").orderByChild("name").equalTo( $scope.nombre.toUpperCase() ).once('value' , function(respuesta) {
				
				console.log(respuesta.val());
				//si no existe, se edita el nombre
				if(respuesta.val() == null){
					firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/"+$scope.ese+"/ips/"+$scope.editando.id).update( {'name' : $scope.nombre.toUpperCase() } ).then(function(administracion){
						$scope.mensajes.parentProperty("I.P.S editada satisfactoriamente.", "Aceptar", 3000);
						$scope.consultar();
						$mdDialog.hide();
					});
				}
				else{
					$scope.mensajes.parentProperty("La I.P.S ingresada ya existe en esta E.S.E", "Aceptar", 3000);
				}

			});	

		}

	})

})();