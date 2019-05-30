(function(){

	var app = angular.module('ciudadesControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'md.data.table' , 'ngAnimate', 'funcancer' ,'firebase' ])

	.controller('ciudadesMainController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , $routeParams ,registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

		$scope.paises = [];
		$scope.selected=[];
		$scope.pais = $routeParams.idPais;
		$scope.cambiarEstado();

		console.log($scope.pais);

		$scope.query = {
			"filter":"",
			"order": 'firstLastName',
			"limit": 10,
			"page": 1
		};

		function success(desserts) {
			$scope.desserts = desserts;
		}

		$scope.logPagination = function (page, limit) {
		}

		$scope.consultar = function(){

			//se busca que exista el país, con el objetivo de impedir la creación de ciudades sin origen
			firebase.database().ref("paises/"+$scope.pais).once('value' , function(response) {
				console.log(response.val());

				$scope.paisOrigen = response.val();

				$scope.ciudades = [];

				if($scope.paisOrigen == null){
					$scope.mensajes.parentProperty("Recurso no encontrado.", "Aceptar", 3000);

					document.getElementById("datos").classList.remove("visible");
					document.getElementById("datos").classList.add("noVisible"); 

					document.getElementById("sinDatos").classList.remove("noVisible");
					document.getElementById("sinDatos").classList.add("visible");	
				}
				else{
					document.getElementById("sinDatos").classList.remove("visible");
					document.getElementById("sinDatos").classList.add("noVisible");

					document.getElementById("datos").classList.remove("noVisible");
					document.getElementById("datos").classList.add("visible"); 

					firebase.database().ref("paises/"+$scope.pais+"/ciudades/").orderByChild("idPais").equalTo( $scope.pais ).once('value' , function(response) {

						$scope.paisSeleccionado = response.val();

						if ($scope.paisSeleccionado != null){
							for(item in $scope.paisSeleccionado){

								$scope.ciudades.push( $scope.paisSeleccionado[item] );
							}
						}
						console.log($scope.ciudades);	
						$scope.$apply();

					});				
				}

			});			

		}

		$scope.consultar();

		$scope.crear = function (ev){

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'crearCiudadController',
				templateUrl: 'views/parametros/ciudades/crear.html',
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

		$scope.editar = function (ev, editando){

			$scope.editando = editando;

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'editarCiudadController',
				templateUrl: 'views/parametros/ciudades/editar.html',
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

		$scope.eliminarPais = function(ev, item){

			var confirm = $mdDialog.confirm()
			.title('Estas seguro de eliminar '+item.name)
			.textContent('Eliminar una Ciudad borrará todos los parametros asociados a ella (COMUNAS, ESE E IPS).')
			.ariaLabel('prompt')
			.targetEvent(ev)
			.ok('eliminar')
			.cancel('cancelar');

			$mdDialog.show(confirm).then(function(result) {
				firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+item.id).remove().then(function(administracion){
					$scope.mensajes.parentProperty("Ciudad eliminada satisfactoriamente.", "Aceptar", 3000);
					$scope.consultar();
					$mdDialog.hide();
				});
				//borrar indice
				firebase.database().ref("ciudades/"+item.id).remove().then(function(administracion){
					console.log("indice de ciudades eliminado "+item.id);
				});
			}, function() {

			});
		}

	})

.controller('crearCiudadController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.nombre = "";

	$scope.enviar = function(){

		var id = new Date().getTime();
		console.log( $scope.nombre.toUpperCase());
			//antes de crear, revisamos si existe la ciudad
			firebase.database().ref("paises/"+$scope.pais+"/ciudades/").orderByChild("name").equalTo( $scope.nombre.toUpperCase() ).once('value' , function(respuesta) {
				//si no existe, se crea
				if(respuesta.val() == null){

					var send =  {'name' : $scope.nombre.toUpperCase() , 'id': id, 'idPais' : $scope.pais ,'state' : true, 'comunas' : {}, 'ESE': {} };
					var indice = {'id': id, 'idPais' : $scope.pais, 'originalName' : $scope.nombre.toUpperCase() }

					firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+id).set(send).then(function(administracion){
						$scope.mensajes.parentProperty("Ciudad creada satisfactoriamente.", "Aceptar", 3000);
						$scope.consultar();
						$mdDialog.hide();
					});

					firebase.database().ref("ciudades/"+id).set(indice).then(function(administracion){
						console.log("indice creado satisfactoriamente");
					});
				}
				else{
					$scope.mensajes.parentProperty("La ciudad ingresada ya existe", "Aceptar", 3000);
				}

			});	
		}

	})


.controller('editarCiudadController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.nombre = $scope.editando.name;
	console.log($scope.editando);

	$scope.guardar = function(){

		var id = new Date().getTime();
			//antes de crear, revisamos si existe el pais
			firebase.database().ref("paises/"+$scope.pais+"/ciudades/").orderByChild("name").equalTo( $scope.nombre.toUpperCase() ).once('value' , function(respuesta) {
				
				console.log(respuesta.val());
				//si no existe, se edita el nombre
				if(respuesta.val() == null){
					firebase.database().ref("paises/"+$scope.pais+"/ciudades/"+$scope.editando.id).update( {'name' : $scope.nombre.toUpperCase() } ).then(function(administracion){
						$scope.mensajes.parentProperty("Ciudad editada satisfactoriamente.", "Aceptar", 3000);
						$scope.consultar();
						$mdDialog.hide();
					});
				}
				else{
					$scope.mensajes.parentProperty("La ciudad ya existe", "Aceptar", 3000);
				}

			});	

		}

	})

})();