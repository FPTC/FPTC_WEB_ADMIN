(function(){

	var app = angular.module('eseControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'md.data.table' , 'ngAnimate', 'funcancer' ,'firebase' ])

	.controller('eseMainController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , $routeParams ,registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

		$scope.eses = [];
		$scope.selected=[];
		$scope.ciudad = $routeParams.idCiudad;
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
			firebase.database().ref("ciudades/"+$scope.ciudad).once('value' , function(response) {

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
					console.log(response.val());

					//si existe el nodo, consulto ahora el origen, usando los indices
					firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad).once('value' , function(response) {
						
						$scope.atras = response.val().idPais;

						var respuesta = response.val();

						$scope.eses = [];

						document.getElementById("sinDatos").classList.remove("visible");
						document.getElementById("sinDatos").classList.add("noVisible");

						document.getElementById("datos").classList.remove("noVisible");
						document.getElementById("datos").classList.add("visible"); 

						$scope.ciudadSeleccionada = response.val().ese;
						console.log($scope.ciudadSeleccionada);

						if ($scope.ciudadSeleccionada != null){
							for(item in $scope.ciudadSeleccionada){

								$scope.eses.push( $scope.ciudadSeleccionada[item] );
							}
						}

						console.log($scope.eses);	
						$scope.$apply();			

					});	

				}

			});	

		}

		$scope.consultar();

		$scope.crearESE = function (ev){

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'crearESEController',
				templateUrl: 'views/parametros/ese/crear.html',
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

		$scope.editarESE = function (ev, editando){

			$scope.editando = editando;

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'editarESEController',
				templateUrl: 'views/parametros/ese/editar.html',
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

		$scope.eliminarESE = function(ev, item){

			var confirm = $mdDialog.confirm()
			.title('Estas seguro de eliminar '+item.name)
			.textContent('Eliminar una E.S.E la borra de la base de datos, y también los parametros asociados a ellas.')
			.ariaLabel('prompt')
			.targetEvent(ev)
			.ok('eliminar')
			.cancel('cancelar');

			$mdDialog.show(confirm).then(function(result) {
				firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/"+item.id).remove().then(function(administracion){
					$scope.mensajes.parentProperty("E.S.E eliminada satisfactoriamente.", "Aceptar", 3000);
					$scope.consultar();
					$mdDialog.hide();
				});

				//borrar indice
				firebase.database().ref("ese/"+item.id).remove().then(function(administracion){
					console.log("indice de ese eliminado "+item.id);
				});

			}, function() {
				
			});
		}

	})

.controller('crearESEController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.nombre = "";

	$scope.enviar = function(){

		var id = new Date().getTime();
		console.log( $scope.nombre.toUpperCase());
			//antes de crear, revisamos si existe 
			firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/").orderByChild("name").equalTo( $scope.nombre.toUpperCase() ).once('value' , function(respuesta) {
				//si no existe, se crea
				if(respuesta.val() == null){

					var send = {'name' : $scope.nombre.toUpperCase() , 'id': id, 'idPais' : $scope.pais, "idCiudad": $scope.ciudad, 'state' : true };
					var indice = {'id': id, 'idPais' : $scope.pais, "idCiudad": $scope.ciudad, 'state' : true };
					firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/"+id).set( send ).then(function(administracion){
						$scope.mensajes.parentProperty("E.S.E creada satisfactoriamente.", "Aceptar", 3000);
						$scope.consultar();
						$mdDialog.hide();
					});

					firebase.database().ref("ese/"+id).set(indice).then(function(administracion){
						console.log("indice creado satisfactoriamente");
					});
				}
				else{
					$scope.mensajes.parentProperty("La E.S.E ingresada ya existe en esta ciudad", "Aceptar", 3000);
				}

			});	
		}

	})


.controller('editarESEController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.nombre = $scope.editando.name;
	console.log($scope.editando);

	$scope.guardar = function(){

		var id = new Date().getTime();
			//antes de crear, revisamos si existe el pais
			firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/").orderByChild("name").equalTo( $scope.nombre.toUpperCase() ).once('value' , function(respuesta) {
				
				console.log(respuesta.val());
				//si no existe, se edita el nombre
				if(respuesta.val() == null){
					firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.ciudad+"/ese/"+$scope.editando.id).update( {'name' : $scope.nombre.toUpperCase() } ).then(function(administracion){
						$scope.mensajes.parentProperty("E.S.E editada satisfactoriamente.", "Aceptar", 3000);
						$scope.consultar();
						$mdDialog.hide();
					});
				}
				else{
					$scope.mensajes.parentProperty("La E.S.E ingresada ya existe en esta ciudad", "Aceptar", 3000);
				}

			});	

		}

	})

})();