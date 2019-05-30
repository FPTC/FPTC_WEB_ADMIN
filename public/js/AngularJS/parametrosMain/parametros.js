(function(){

	var app = angular.module('paisesControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'md.data.table' , 'ngAnimate', 'funcancer' ,'firebase' ])

	.controller('paisesMainController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

		$scope.paises = [];
		$scope.selected=[];

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
			firebase.database().ref("paises/").once('value' , function(response) {
				console.log(response.val());

				var respuesta = response.val();

				$scope.paises = [];
				if(respuesta != null){
					for(item in respuesta){

						$scope.paises.push( respuesta[item] );

					}
				}		
			});	
		}
		$scope.consultar();

		var es=firebase.auth().onAuthStateChanged(function(user) {

			if(user){

				$scope.cambiarEstado();

				var llegada=  firebase.database().ref('paises'). once('value').then(function(datos) {
					console.log("datos es");
					console.log(datos);
				});
			} 
			else{
				$location.path( "login" );
			}
		});

		$scope.crearPais = function (ev){

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'crearPaisController',
				templateUrl: 'views/parametros/paises/crear.html',
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

		$scope.editarPais = function (ev, editando){

			$scope.editando = editando;

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'editarPaisController',
				templateUrl: 'views/parametros/paises/editar.html',
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
			.textContent('Eliminar un país borrará todas las ciudades del mismo, y los parametros asociados a ellas.')
			.ariaLabel('prompt')
			.targetEvent(ev)
			.ok('eliminar')
			.cancel('cancelar');

			$mdDialog.show(confirm).then(function(result) {


				firebase.database().ref('paises/'+item.id).remove().then(function(administracion){
					$scope.mensajes.parentProperty("País eliminado satisfactoriamente.", "Aceptar", 3000);
					$scope.consultar();
					$mdDialog.hide();
				});

				
			}, function() {
				
			});
		}

	})

	.controller('crearPaisController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {
		$scope.nombre = "";

		$scope.crear = function(){

			var id = new Date().getTime();
			console.log( $scope.nombre.toUpperCase());
			//antes de crear, revisamos si existe el pais
			firebase.database().ref("paises/").orderByChild("name").equalTo( $scope.nombre.toUpperCase() ).once('value' , function(respuesta) {
				//si no existe, se crea
				if(respuesta.val() == null){
					firebase.database().ref('paises/'+id).set( {'name' : $scope.nombre.toUpperCase() , 'id': id, 'state' : true } ).then(function(administracion){
						$scope.mensajes.parentProperty("País creado satisfactoriamente.", "Aceptar", 3000);
						$scope.consultar();
						$mdDialog.hide();
					});
				}
				else{
					$scope.mensajes.parentProperty("El país ingresado ya existe", "Aceptar", 3000);
				}

			});	

		}

	})


	.controller('editarPaisController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {
		
		$scope.nombre = $scope.editando.name;
		console.log($scope.editando);

		$scope.guardar = function(){

			var id = new Date().getTime();
			//antes de crear, revisamos si existe el pais
			firebase.database().ref("paises/").orderByChild("name").equalTo( $scope.nombre.toUpperCase() ).once('value' , function(respuesta) {
				
				console.log(respuesta.val());
				//si no existe, se edita el nombre
				if(respuesta.val() == null){
					firebase.database().ref('paises/'+$scope.editando.id).update( {'name' : $scope.nombre.toUpperCase() } ).then(function(administracion){
						$scope.mensajes.parentProperty("País editado satisfactoriamente.", "Aceptar", 3000);
						$scope.consultar();
						$mdDialog.hide();
					});
				}
				else{
					$scope.mensajes.parentProperty("El país ingresado ya existe", "Aceptar", 3000);
				}

			});	

		}

	})

})();