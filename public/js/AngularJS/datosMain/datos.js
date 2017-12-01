(function(){

	var app = angular.module('datosControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'md.data.table' , 'ngAnimate', 'funcancer' ,'firebase' ])


	.service('serviceDatos', function($http) {


		this.default = function(name, milisegundos) {

			var respuesta= $http.get("https://amate-b8ceb.appspot.com/generateUserDataFile", {params:{"userName":name, "date": milisegundos}})
			.then(function (response) { 

				var respuesta = response
			
			})

	
	
		return respuesta;
	}
})




	.controller('datosMainController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

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



		$scope.calcularEdad =  function (birthday) {
			var edad;
			if(birthday != undefined && birthday!= ""){

				var parts =birthday.split('/');
				var mydate = new Date(parts[2],parts[1]-1,parts[0]-1); 
				var ageDifMs = Date.now() - mydate;
				var ageDate = new Date(ageDifMs);
				edad = Math.abs(ageDate.getUTCFullYear() - 1970);
			}else{
				edad = "";
			}
			return edad;
		}

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


		$scope.generar = function(){

			var milisegundos = new Date();
			milisegundos = milisegundos.getTime();
			


			serviceDatos.default($scope.usuario.user, milisegundos).then(function(respuesta){
				

				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('El documento se esta generando. Aparecerá automaticamete en la tabla cuando este completado.')
				
				.highlightAction(true)
				.hideDelay(10000)
				.position(pinTo)
				.parent(document.querySelectorAll('#toast-container'));

				$mdToast.show(toast).then(function(response) {
					if ( response == 'ok' ) { 
						$location.path("datos");     
					}
				});  



			});
			

		}





		$scope.options = {
			rowSelection: false,
		};

		var es=firebase.auth().onAuthStateChanged(function(user) {


			if(user){

				var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(datos) {


					$scope.usuario = datos.val();





					var llegada=  firebase.database().ref('datosDescarga'). on('value', function(data) {

						$scope.documentos = data.val();

						$scope.cantidadDocumentos=0;

						$scope.datos=[];
						for(documento in $scope.documentos){
						
							var e =$scope.documentos[documento];
							var f = new Date(parseInt( $scope.documentos[documento].date ));
							e.fecha = ""+f.getDate()+"/"+(f.getMonth()+1)+"/"+f.getFullYear()+" "+""+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds() ;
							$scope.datos.push(e);
							$scope.cantidadDocumentos++;
						}

						$scope.$apply();
					});





					if(datos.val() !== null){

						$scope.perfil = datos.val().profile;
				



					
						$scope.cambiarEstado();

						$scope.entregarPremio = function (ev, usuario){

							$scope.usuarioPremio = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'entregaPremioController',
								templateUrl: 'views/usuarios/modalPremio.html',
								parent: angular.element(document.body),
								targetEvent: ev,
								clickOutsideToClose:true,
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

						$scope.$apply();
						
					}



				});

			} 
			else{
				$location.path( "login" );
			}
		});


	})

})();