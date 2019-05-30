(function(){

	var app = angular.module('codigosControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'md.data.table' , 'ngAnimate', 'funcancer' ,'firebase' ])

	.controller('codigosMainController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {
		
		$scope.cambiarEstado();

		$scope.codigosSinUsar = [];
		$scope.codigosUsados = [];

		$scope.query = {
			"filter":"",
			"order": '',
			"limit": 10,
			"page": 1
		};

		function success(desserts) {
			$scope.desserts = desserts;
		}

		$scope.logPagination = function (page, limit) {
		}


		$scope.consultar = function(){
			firebase.database().ref("codigos/").once('value' , function(response) {
				console.log(response.val());

				var respuesta = response.val();

				$scope.codigosSinUsar = [];
				$scope.codigosUsados = [];

				if(respuesta != null){
					for(item in respuesta){

						if(respuesta[item].state == 0){
							respuesta[item].fechaCreado = $scope.fechaNumerica(respuesta[item].date);
							$scope.codigosSinUsar.push( respuesta[item] );
						}
						else{
							respuesta[item].fechaCreado = $scope.fechaNumerica(respuesta[item].date);
							$scope.codigosUsados.push( respuesta[item] );
						}


					}

					console.log($scope.codigosSinUsar);
				}		
			});	
		}
		$scope.consultar();


		$scope.crearCodigos = function(ev){

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'crearCodigosController',
				templateUrl: 'views/codigos/crear.html',
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

	})

	.controller('crearCodigosController' , function ($scope,$http, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {
		
		$scope.cantidad = 1;



		$scope.crear= function(){

			firebase.auth().onAuthStateChanged((user) => {
				if (user) {

					var respuesta =  $http({
						method: 'GET',
						url: "https://us-central1-amate-b8ceb.cloudfunctions.net/generarCodigos-CopiaSeguridad?uid="+user.uid+"&c="+$scope.cantidad,
						headers: {
							'Content-Type': 'application/json'
						},

					}).then(function success(respuesta){
						console.log(respuesta);

						$scope.mensajes.parentProperty($scope.cantidad+" códigos generados satisfactoriamente.", "Aceptar", 3000);
						$scope.consultar();
						$mdDialog.hide();
						return respuesta;

					}, function error(respuesta){
						console.log(respuesta);
						return respuesta;
					});

					console.log(respuesta);
					
				}
			});

			
		}
	})

})();