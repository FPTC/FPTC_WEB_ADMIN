(function(){

	var app = angular.module('filtrosControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'md.data.table' , 'ngAnimate', 'funcancer' ,'firebase' ])


	.controller('excluidaController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

		console.log( $scope.motivoActual );

		$scope.guardarRegistro = function(){

			var id = new Date().getTime();

			var historial = $scope.tipoMotivo == 'm' ? "historialIndicacionesMamografia" : "historialIndicacionesCitologia";

			var send = { id: id, fecha: id, idFiltro: $scope.indicacionNueva , idMotivo : $scope.motivoSeleccionado };

			var send2 = $scope.tipoMotivo == 'm' ? { lastIndicationBreast : $scope.indicacionNueva, lastReasonBreast : $scope.motivoSeleccionado } : { lastIndicationCervix : $scope.indicacionNueva, lastReasonCervix : $scope.motivoSeleccionado };

			//historial
			firebase.database().ref("usuarios/"+$scope.usuarioActual+"/"+historial+"/"+id).set( send ).then(function(administracion){

				//una vez realizado el registro, se procede a guardar los valores primerios (para no tener que entrar al final del historial)
				firebase.database().ref("usuarios/"+$scope.usuarioActual).update( send2 ).then(function(administracion){
					$scope.mensajes.parentProperty("Registro realizado satisfactoriamente.  Recargar para ver los cambios realizados.", "Aceptar", 6000);
					$mdDialog.hide();
					//$scope.consultar.parentProperty();
				});
				
			});
		}

	})

	.controller('porTamizarController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

		console.log( $scope.motivoActual );

		$scope.guardarRegistro = function(){

			var id = new Date().getTime();

			var historial = $scope.tipoMotivo == 'm' ? "historialIndicacionesMamografia" : "historialIndicacionesCitologia";

			var send = { id: id, fecha: id, idFiltro: $scope.indicacionNueva , idMotivo : $scope.motivoSeleccionado };

			var send2 = $scope.tipoMotivo == 'm' ? { lastIndicationBreast : $scope.indicacionNueva, lastReasonBreast : $scope.motivoSeleccionado } : { lastIndicationCervix : $scope.indicacionNueva, lastReasonCervix : $scope.motivoSeleccionado };

			//historial
			firebase.database().ref("usuarios/"+$scope.usuarioActual+"/"+historial+"/"+id).set( send ).then(function(administracion){

				//una vez realizado el registro, se procede a guardar los valores primerios (para no tener que entrar al final del historial)
				firebase.database().ref("usuarios/"+$scope.usuarioActual).update( send2 ).then(function(administracion){
					$scope.mensajes.parentProperty("Registro realizado satisfactoriamente. Recargar para ver los cambios realizados.", "Aceptar", 6000);
					$mdDialog.hide();
					//$scope.consultar.parentProperty();
				});
				
			});
		}

	})

	.controller('tamizadoController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

		console.log( $scope.motivoActual );

		$scope.guardarRegistro = function(){

			var id = new Date().getTime();

			var historial = $scope.tipoMotivo == 'm' ? "historialIndicacionesMamografia" : "historialIndicacionesCitologia";

			var send = { id: id, fecha: id, idFiltro: $scope.indicacionNueva , idMotivo : $scope.motivoSeleccionado };

			var send2 = $scope.tipoMotivo == 'm' ? { lastIndicationBreast : $scope.indicacionNueva, lastReasonBreast : $scope.motivoSeleccionado } : { lastIndicationCervix : $scope.indicacionNueva, lastReasonCervix : $scope.motivoSeleccionado };

			//historial
			firebase.database().ref("usuarios/"+$scope.usuarioActual+"/"+historial+"/"+id).set( send ).then(function(administracion){

				//una vez realizado el registro, se procede a guardar los valores primerios (para no tener que entrar al final del historial)
				firebase.database().ref("usuarios/"+$scope.usuarioActual).update( send2 ).then(function(administracion){
					$scope.mensajes.parentProperty("Registro realizado satisfactoriamente. Recargar para ver los cambios realizados.", "Aceptar", 6000);
					$mdDialog.hide();
					//$scope.consultar.parentProperty();
				});
				
			});
		}

	})

	.controller('historialController' , function ($scope, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {	
	})


	.controller('mamografiaMainController' , function ($scope, $filter ,serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {	


		$scope.pendiente = [];
		$scope.sinIndicacion = [];
		$scope.excluidas = [];
		$scope.porTamizar = [];
		$scope.tamizado = [];


		$scope.filterPendiente = function(){

			var data = $filter('filter')($scope.copiapendiente,$scope.query.filter.filterPendiente, false, ['name', 'email','neighborhood','dateCreated', 'lastName'])
			$scope.pendiente = data;
			console.log(data);
		}

		$scope.filtrarSinIndicacion = function(){

			var data = $filter('filter')($scope.copiasinIndicacion,$scope.query.filter.filtrarSinIndicacion, false, ['name', 'email','neighborhood','dateCreated', 'lastName'])
			$scope.sinIndicacion = data;
			console.log(data);

		}

		$scope.filtrarExcluidas = function(){

			var data = $filter('filter')($scope.copiaexcluidas,$scope.query.filter.filtrarExcluidas, false, ['name', 'email','neighborhood','dateCreated', 'lastName'])
			$scope.excluidas = data;
			console.log(data);
		}

		$scope.filtrarPorTamizar = function(){

			var data = $filter('filter')($scope.copiaporTamizar,$scope.query.filter.filtrarPorTamizar, false, ['name', 'email','neighborhood','dateCreated', 'lastName'])
			$scope.porTamizar = data;
			console.log(data);
		}

		$scope.filtrarTamizado = function(){

			var data = $filter('filter')($scope.copiatamizado,$scope.query.filter.filtrarTamizado, false, ['name', 'email','neighborhood','dateCreated', 'lastName'])
			$scope.tamizado = data;
			console.log(data);
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
			"order": 'mainIndex',
			"limit": 10,
			"page": 1
		};

		function success(desserts) {
			$scope.desserts = desserts;
		}

		$scope.logPagination = function (page, limit) {
		}

		$scope.options = {
			rowSelection: false,
		};


		$scope.generar = function(){

			serviceDatos.default($scope.usuario.email).then(function(respuesta){			

				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('El documento se esta generando. Ve a Datos para descargarlo.')
				.action('Id a Datos')
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

		$scope.motivos = [];
		var llegada = firebase.database().ref('filtros'). once('value').then(function(datos){
			var motivos = datos.val();

			for(motivo in motivos){
				$scope.motivos.push(motivos[motivo])
			}
			console.log($scope.motivos);
		});

		$scope.verHistorial = function(ev, historial){

			$scope.queryh = {
				"filter":"",
				"order": '',
				"limit": 10,
				"page": 1
			};

			var historial = historial;
			console.log(historial);

			//ajuste del historial para que pueda ser un array que permita el ordenado

			$scope.historial = [];
			for(registro in historial){
				console.log( new Date(historial[registro].fecha ));
				$scope.historial.push(historial[registro]);
			}

			console.log($scope.historial);

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'historialController',
				templateUrl: 'views/usuarios/filtros/historial.html',
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

		$scope.registrarMotivoMamografia = function(ev, id, usuario, actual, key, tipo, usuarioCompleto, origen, index){

			console.log(id);
			$scope.indicacionActual = actual;
			$scope.usuarioActual = usuario;
			$scope.indicacionNueva = id;

			$scope.usuarioCompleto = usuarioCompleto;

			console.log(usuarioCompleto);

			$scope.tipoMotivo = tipo; //para mamografia

			$scope.tmporigen = origen;
			$scope.tmpindex = index

			$scope.cancelarRegistro = function(){

				// $scope.pendiente 
				// $scope.sinIndicacion 
				// $scope.excluidas
				// $scope.porTamizar 
				// $scope.tamizado

				console.log($scope.tmporigen, $scope.tmpindex);


				$scope[$scope.tmporigen][$scope.tmpindex].lastIndicationBreast = actual;		
				$mdDialog.hide();
			}


			console.log($scope.motivos);

			//sin motivo
			if(id==1){
				var id = new Date().getTime();
				var historial = $scope.tipoMotivo == 'm' ? "historialIndicacionesMamografia" : "historialIndicacionesCitologia";

				var send = { id: id, fecha: id, idFiltro: $scope.indicacionNueva , idMotivo : false };

				var send2 = $scope.tipoMotivo == 'm' ? { lastIndicationBreast : $scope.indicacionNueva, lastReasonBreast : false } : { lastIndicationCervix : $scope.indicacionNueva, lastReasonCervix : false };


				$scope.motivoActual = $scope.motivos[0];

				var confirm = $mdDialog.confirm()
				.title('Registrar Sin indicación')
				.textContent('Esta indicación no necesita un motivo')
				.ariaLabel('motivo')
				.targetEvent(ev)
				.ok('Guardar')
				.cancel("cancelar" );

				

				$mdDialog.show(confirm).then(function() {
					
					firebase.database().ref("usuarios/"+$scope.usuarioActual+"/"+historial+"/"+id).set( send ).then(function(administracion){
					});

					//una vez realizado el registro, se procede a guardar los valores primerios (para no tener que entrar al final del historial)
					firebase.database().ref("usuarios/"+$scope.usuarioActual).update( send2 ).then(function(administracion){
						$scope.mensajes.parentProperty("Registro realizado satisfactoriamente. Recargar para ver los cambios realizados.", "Aceptar", 6000);
						$mdDialog.hide();
						//$scope.consultar.parentProperty();
					});



				}, function() {
					$scope[$scope.tmporigen][$scope.tmpindex].lastIndicationBreast = actual;	
					$mdDialog.hide();
				});

			}
			else if(id==2){

				$scope.motivoActual = $scope.motivos[1];


				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

				$mdDialog.show({
					controller: 'excluidaController',
					templateUrl: 'views/usuarios/filtros/excluida.html',
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
			else if(id==3){

				$scope.motivoActual = $scope.motivos[2];

				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

				$mdDialog.show({
					controller: 'tamizadoController',
					templateUrl: 'views/usuarios/filtros/porTamizar.html',
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
			else if(id==4){

				$scope.motivoActual = $scope.motivos[3];


				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

				$mdDialog.show({
					controller: 'tamizadoController',
					templateUrl: 'views/usuarios/filtros/tamizado.html',
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
		}

		var es=firebase.auth().onAuthStateChanged(function(user) {


			if(user){

				var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(datos) {

					firebase.database().ref('usuarios/'+user.uid).once('value').then(function(usuario) {
						$scope.usuario = usuario.val();				
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


						$scope.entregarPremioExamenBreast = function (ev, usuario){

							$scope.usuarioPremio = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'entregaPremioExamenSenoController',
								templateUrl: 'views/usuarios/modalPremioExamen.html',
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


						$scope.entregarPremioExamenCervix = function (ev, usuario){

							$scope.usuarioPremio = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'entregaPremioExamenCervixController',
								templateUrl: 'views/usuarios/modalPremioExamenCervix.html',
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

						$scope.detalleUsuario = function(ev, usuario) {

							$scope.usuarioDetalle = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'detalleUsuarioController',
								templateUrl: 'views/usuarios/modalDetalleUsuario.html',
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
							}, 
							function(wantsFullScreen) {
								$scope.customFullscreen = (wantsFullScreen === true);
							});
						}


						$scope.respuestasUsuarioSeno = function(ev, usuario) {

							$scope.usuarioDetalle = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'respuestasSenoController',
								templateUrl: 'views/usuarios/modalRespuestasSeno.html',
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
							}, 
							function(wantsFullScreen) {
								$scope.customFullscreen = (wantsFullScreen === true);
							});
						}




						$scope.respuestasUsuarioCervix = function(ev, usuario) {

							$scope.usuarioDetalle = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'respuestasCervixController',
								templateUrl: 'views/usuarios/modalRespuestasCervix.html',
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
							}, 
							function(wantsFullScreen) {
								$scope.customFullscreen = (wantsFullScreen === true);
							});
						}


						$scope.agendaSeno = function(ev, usuario) {

							$scope.usuarioDetalle = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'agendaSenoMainController',
								templateUrl: 'views/usuarios/agendaSeno.html',
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
							}, 
							function(wantsFullScreen) {
								$scope.customFullscreen = (wantsFullScreen === true);
							});
						}



						$scope.agendaCervix = function(ev, usuario) {

							$scope.usuarioDetalle = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'agendaCervixMainController',
								templateUrl: 'views/usuarios/agendaCervix.html',
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
							}, 
							function(wantsFullScreen) {
								$scope.customFullscreen = (wantsFullScreen === true);
							});
						}




						$scope.hide = function() {
							$mdDialog.hide();
						};

						$scope.cancel = function() {
							$mdDialog.cancel();
						};

						$scope.answer = function(answer) {
							$mdDialog.hide(answer);
						};

						$scope.consultar={};

						$scope.date = function (_date,_format,_delimiter)
						{
							var formatLowerCase=_format.toLowerCase();
							var formatItems=formatLowerCase.split(_delimiter);
							var dateItems=_date.split(_delimiter);
							var monthIndex=formatItems.indexOf("mm");
							var dayIndex=formatItems.indexOf("dd");
							var yearIndex=formatItems.indexOf("yyyy");
							var month=parseInt(dateItems[monthIndex]);
							month-=1;
							var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
							return formatedDate;
						}


						$scope.arrayquer = function (array) {
							var ary = [];
							var i = 0;

							console.log(array);
							if(typeof array !== "undefined"){


								angular.forEach(array, function (val, key) {
									val.uid = key
									val.mainIndex = i
									val.milliseconds = parseInt(moment(val.dateCreated, "DD/MM/YYYY").format('x') )
									ary.push(val);
									i++
								});
							}
							else{

							}


							return ary;
						};



						$scope.consultar.parentProperty = function (){

							$scope.pendiente = [];
							$scope.sinIndicacion = [];
							$scope.excluidas = [];
							$scope.porTamizar = [];
							$scope.tamizado = [];

							firebase.database().ref("usuarios").once('value' , function(llegada) {
							//firebase.database().ref("usuarios").orderByChild("email").equalTo("development@amate.com").once('value' , function(llegada) {
								$scope.usuarios=[];
								$scope.cantidadUsuarios=0;

								//limite
								var i = 0;
								var ipendiente = 0;
								var isinpermiso = 0;
								var iexcluidas = 0;
								var iportamizar = 0;
								var itamizado = 0;

								console.log(llegada.val());

								$scope.users = $scope.arrayquer(llegada.val());

								$scope.users = $scope.users.filter(function(u){
									return typeof u.dateCreated !== "undefined";
								})

								$scope.users = $scope.users.sort(function(a, b) { return a.milliseconds - b.milliseconds })

								console.log("usuarios original", $scope.users);
								var i=0;
								$scope.pendiente = $scope.users.filter(function(u){
									return u.lastIndicationBreast == undefined
								}).map(function(x){								
									x.mainIndex = i
									x.milliseconds = parseInt(moment(x.dateCreated, "DD/MM/YYYY").format('x') )
									i++;
									return x;
								}
								);
								i=0;
								$scope.sinIndicacion = $scope.users.filter(function(u){
									return u.lastIndicationBreast == 1
								}).map(function(x){								
									x.mainIndex = i
									x.milliseconds = parseInt(moment(x.dateCreated, "DD/MM/YYYY").format('x') )
									i++;
									return x;
								}
								);

								i=0
								$scope.excluidas = $scope.users.filter(function(u){
									return u.lastIndicationBreast == 2
								}).map(function(x){								
									x.mainIndex = i
									x.milliseconds = parseInt(moment(x.dateCreated, "DD/MM/YYYY").format('x') )
									i++;
									return x;
								}
								);

								i=0
								$scope.porTamizar = $scope.users.filter(function(u){
									return u.lastIndicationBreast == 3
								}).map(function(x){								
									x.mainIndex = i
									x.milliseconds = parseInt(moment(x.dateCreated, "DD/MM/YYYY").format('x') )
									i++;
									return x;
								}
								);

								i=0
								$scope.tamizado = $scope.users.filter(function(u){
									return u.lastIndicationBreast == 4
								}).map(function(x){								
									x.mainIndex = i
									x.milliseconds = parseInt(moment(x.dateCreated, "DD/MM/YYYY").format('x') )
									i++;
									return x;
								}
								);

								console.log("pendientes", $scope.pendiente);
								console.log("usuarios de salida", $scope.users);



								// for(usuario in llegada.val()){

								// 	//$scope.usuarios.push( llegada.val()[usuario] );
								// 	//$scope.usuarios[$scope.usuarios.length - 1].uid = usuario;
								// 	//$scope.usuarios[$scope.usuarios.length - 1].mainIndex = i;

								// 	if( typeof llegada.val()[usuario].dateCreated !== "undefined" ){

								// 		llegada.val()[usuario].milliseconds = parseInt(moment(llegada.val()[usuario].dateCreated, "DD/MM/YYYY").format('x') )


								// 		if( llegada.val()[usuario].lastIndicationBreast == undefined ){
								// 			//temporal["mainIndexPendiente"] = ipendiente;
								// 			$scope.pendiente.push(llegada.val()[usuario] );							
								// 			$scope.pendiente[$scope.pendiente.length - 1].uid = usuario;
								// 			$scope.pendiente[$scope.pendiente.length - 1].mainIndex = i;
								// 			ipendiente++;
								// 		}

								// 		if( llegada.val()[usuario].lastIndicationBreast == 1 ){
								// 			//temporal["mainIndexSinIndicacion"] = isinpermiso;
								// 			$scope.sinIndicacion.push(llegada.val()[usuario] );	
								// 			$scope.sinIndicacion[$scope.sinIndicacion.length - 1].uid = usuario;
								// 			$scope.sinIndicacion[$scope.sinIndicacion.length - 1].mainIndex = i;
								// 			isinpermiso++;
								// 		}

								// 		if( llegada.val()[usuario].lastIndicationBreast == 2 ){
								// 			//temporal["mainIndexExcluidas"] = iexcluidas;
								// 			$scope.excluidas.push(llegada.val()[usuario] );							
								// 			$scope.excluidas[$scope.excluidas.length - 1].uid = usuario;
								// 			$scope.excluidas[$scope.excluidas.length - 1].mainIndex = i;
								// 			iexcluidas++;
								// 		}

								// 		if( llegada.val()[usuario].lastIndicationBreast == 3 ){
								// 			//temporal["mainIndexPorTamizar"] = iportamizar;
								// 			//$scope.porTamizar[iportamizar] = $scope.usuarios;
								// 			$scope.porTamizar.push(llegada.val()[usuario] );							
								// 			$scope.porTamizar[$scope.porTamizar.length - 1].uid = usuario;
								// 			$scope.porTamizar[$scope.porTamizar.length - 1].mainIndex = i;
								// 			iportamizar++;
								// 		}

								// 		if( llegada.val()[usuario].lastIndicationBreast == 4 ){
								// 	 	//temporal["mainIndexTamizado"] = itamizado;
								// 	 	$scope.tamizado.push(llegada.val()[usuario] );							
								// 	 	$scope.tamizado[$scope.tamizado.length - 1].uid = usuario;
								// 	 	$scope.tamizado[$scope.tamizado.length - 1].mainIndex = i;
								// 	 	itamizado++;
								// 	 }

								//  //	$scope.usuarios[$scope.usuarios.length - 1].puntos= llegada.val()[usuario].pointsBreast + llegada.val()[usuario].pointsCervix;

								//  	//$scope.usuarios[$scope.usuarios.length - 1].edad=$scope.calcularEdad(llegada.val()[usuario].dateBirthday);

								//  	//$scope.usuarios[$scope.usuarios.length - 1].fechaCreado =  Date.parse($scope.date( ""+llegada.val()[usuario].dateCreated ,"dd/mm/yyyy","/") );
								//  	i++;

								//  }
								// }


								$scope.copiapendiente = $scope.pendiente;
								$scope.copiasinIndicacion = $scope.sinIndicacion;
								$scope.copiaexcluidas = $scope.excluidas;
								$scope.copiaporTamizar = $scope.porTamizar;
								$scope.copiatamizado = $scope.tamizado;


								// for(usuario in llegada.val()){

								// 	if(i==50){
								// 		break;
								// 	}

								// 	var temporal =  llegada.val()[usuario];
								// 	temporal["uid"] = usuario;


								// 	if(llegada.val()[usuario].state == 0 && llegada.val()[usuario].profileCompleted != 1){
								// 		temporal["textoEstado"] = "Cuenta creada";

								// 	} 


								// 	if(llegada.val()[usuario].profileCompleted == 1 && llegada.val()[usuario].state == 0){
								// 		temporal["textoEstado"] = "Perfil completado";

								// 	} 

								// 	if(llegada.val()[usuario].state == 1){
								// 		temporal["textoEstado"] = "Test Iniciado";

								// 	} 

								// 	if(llegada.val()[usuario].state == 2 && llegada.val()[usuario].repetitionsAnswersBreast>0 && llegada.val()[usuario].repetitionsAnswersCervix>0){
								// 		temporal["textoEstado"] = "Test completado";

								// 	} 

								// 	if(llegada.val()[usuario].state == 2 && (llegada.val()[usuario].repetitionsAnswersBreast==0 || llegada.val()[usuario].repetitionsAnswersCervix==0)){
								// 		temporal["textoEstado"] = "Test Iniciado";

								// 	} 

								// 	if(llegada.val()[usuario].state == 3){
								// 		temporal["textoEstado"] = "Premio entregado";

								// 	} 

								// 	if("appointment" in llegada.val()[usuario]){


								// 		if(llegada.val()[usuario].appointment==true){

								// 			temporal["cita"]="Si";

								// 		}	
								// 		else{
								// 			temporal["cita"]="No";
								// 		}
								// 	}
								// 	else{
								// 		temporal["cita"]="N/A";
								// 	}

								// 	temporal["puntos"]= llegada.val()[usuario].pointsBreast + llegada.val()[usuario].pointsCervix;

								// 	temporal["edad"]=$scope.calcularEdad(llegada.val()[usuario].dateBirthday);

								// 	temporal["fechaCreado"] =  Date.parse($scope.date( ""+llegada.val()[usuario].dateCreated ,"dd/mm/yyyy","/") );

								// 	temporal["mainIndex"] = i;					

								// 	if( llegada.val()[usuario].lastIndicationBreast == undefined ){
								// 		temporal["mainIndexPendiente"] = ipendiente;
								// 		$scope.pendiente[ipendiente] = temporal;
								// 		ipendiente++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationBreast == 1 ){
								// 		temporal["mainIndexSinIndicacion"] = isinpermiso;
								// 		$scope.sinIndicacion[isinpermiso] = temporal;
								// 		isinpermiso++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationBreast == 2 ){
								// 		temporal["mainIndexExcluidas"] = iexcluidas;
								// 		$scope.excluidas[iexcluidas] = temporal;
								// 		iexcluidas++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationBreast == 3 ){
								// 		temporal["mainIndexPorTamizar"] = iportamizar;
								// 		$scope.porTamizar[iportamizar] = temporal;
								// 		iportamizar++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationBreast == 4 ){
								// 	 	temporal["mainIndexTamizado"] = itamizado;
								// 	 	$scope.tamizado[itamizado] = temporal;
								// 	 	itamizado++;
								// 	 }

								// 	$scope.usuarios[$scope.cantidadUsuarios] = temporal;
								// 	$scope.cantidadUsuarios ++;

								// 	i++;
								// }

								console.log($scope.usuarios);
								console.log($scope.pendiente);
								console.log($scope.sinIndicacion);
								console.log($scope.excluidas);
								console.log($scope.porTamizar);
								console.log($scope.tamizado);


								$scope.$apply();
							});
}

$scope.consultar.parentProperty();
}
else{
	$location.path("login");
}
});

} 
else{
	$location.path( "login" );
}
});
})


.controller('citologiaMainController' , function ($scope, $filter, serviceDatos  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {	


	$scope.pendiente = [];
	$scope.sinIndicacion = [];
	$scope.excluidas = [];
	$scope.porTamizar = [];
	$scope.tamizado = [];

	var last = {
		bottom: false,
		top: true,
		left: false,
		right: true
	};

	$scope.filterPendiente = function(){

		var data = $filter('filter')($scope.copiapendiente,$scope.query.filterPendiente, false, ['name', 'email','neighborhood','dateCreated', 'lastName'])
		$scope.pendiente = data;
		console.log(data);
	}

	$scope.filtrarSinIndicacion = function(){

		var data = $filter('filter')($scope.copiasinIndicacion,$scope.query.filter.filtrarSinIndicacion, false, ['name', 'email','neighborhood','dateCreated', 'lastName'])
		$scope.sinIndicacion = data;
		console.log(data);

	}

	$scope.filtrarExcluidas = function(){

		var data = $filter('filter')($scope.copiaexcluidas,$scope.query.filter.filtrarExcluidas, false, ['name', 'email','neighborhood','dateCreated', 'lastName'])
		$scope.excluidas = data;
		console.log(data);
	}

	$scope.filtrarPorTamizar = function(){

		var data = $filter('filter')($scope.copiaporTamizar,$scope.query.filter.filtrarPorTamizar, false, ['name', 'email','neighborhood','dateCreated', 'lastName'])
		$scope.porTamizar = data;
		console.log(data);
	}

	$scope.filtrarTamizado = function(){

		var data = $filter('filter')($scope.copiatamizado,$scope.query.filter.filtrarTamizado, false, ['name', 'email','neighborhood','dateCreated', 'lastName'])
		$scope.tamizado = data;
		console.log(data);
	}

	



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
		"order": 'mainIndex',
		"limit": 10,
		"page": 1
	};

	function success(desserts) {
		$scope.desserts = desserts;
	}

	$scope.logPagination = function (page, limit) {
	}

	$scope.options = {
		rowSelection: false,
	};


	$scope.generar = function(){

		serviceDatos.default($scope.usuario.email).then(function(respuesta){			

			var pinTo = $scope.getToastPosition();
			var toast = $mdToast.simple()
			.textContent('El documento se esta generando. Ve a Datos para descargarlo.')
			.action('Id a Datos')
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

	$scope.motivos = [];
	var llegada = firebase.database().ref('filtros'). once('value').then(function(datos){
		var motivos = datos.val();

		for(motivo in motivos){
			$scope.motivos.push(motivos[motivo])
		}
		console.log($scope.motivos);
	});

	$scope.verHistorial = function(ev, historial){

		$scope.queryh = {
			"filter":"",
			"order": '',
			"limit": 10,
			"page": 1
		};

		var historial = historial;
		console.log(historial);

			//ajuste del historial para que pueda ser un array que permita el ordenado

			$scope.historial = [];
			for(registro in historial){
				console.log( new Date(historial[registro].fecha ));
				$scope.historial.push(historial[registro]);
			}

			console.log($scope.historial);

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: 'historialController',
				templateUrl: 'views/usuarios/filtros/historial.html',
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

		$scope.registrarMotivoMamografia = function(ev, id, usuario, actual, key, tipo, usuarioCompleto, origen, index){

			console.log(id);
			$scope.indicacionActual = actual;
			$scope.usuarioActual = usuario;
			$scope.indicacionNueva = id;

			$scope.usuarioCompleto = usuarioCompleto;

			console.log(usuarioCompleto);

			$scope.tipoMotivo = tipo; //para mamografia

			$scope.tmporigen = origen;
			$scope.tmpindex = index

			$scope.cancelarRegistro = function(){

				console.log("filtro fiultro");

				console.log($scope.tmporigen, $scope.tmpindex);


				$scope[$scope.tmporigen][$scope.tmpindex].lastIndicationCervix = actual;		
				$mdDialog.hide();
			}


			console.log($scope.motivos);

			//sin motivo
			if(id==1){
				var id = new Date().getTime();
				var historial = $scope.tipoMotivo == 'm' ? "historialIndicacionesMamografia" : "historialIndicacionesCitologia";

				var send = { id: id, fecha: id, idFiltro: $scope.indicacionNueva , idMotivo : false };

				var send2 = $scope.tipoMotivo == 'm' ? { lastIndicationBreast : $scope.indicacionNueva, lastReasonBreast : false } : { lastIndicationCervix : $scope.indicacionNueva, lastReasonCervix : false };


				$scope.motivoActual = $scope.motivos[0];

				var confirm = $mdDialog.confirm()
				.title('Registrar Sin indicación')
				.textContent('Esta indicación no necesita un motivo')
				.ariaLabel('motivo')
				.targetEvent(ev)
				.ok('Guardar')
				.cancel('Cancelar');

				

				$mdDialog.show(confirm).then(function() {
					
					firebase.database().ref("usuarios/"+$scope.usuarioActual+"/"+historial+"/"+id).set( send ).then(function(administracion){
					});

					//una vez realizado el registro, se procede a guardar los valores primerios (para no tener que entrar al final del historial)
					firebase.database().ref("usuarios/"+$scope.usuarioActual).update( send2 ).then(function(administracion){
						$scope.mensajes.parentProperty("Registro realizado satisfactoriamente. Recargar para ver los cambios realizados.", "Aceptar", 6000);
						$mdDialog.hide();
						$scope.consultar.parentProperty();
					});



				}, function() {
					$scope.usuarios[key].lastIndication = actual;
					$mdDialog.hide();
				});

			}
			else if(id==2){

				$scope.motivoActual = $scope.motivos[1];


				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

				$mdDialog.show({
					controller: 'excluidaController',
					templateUrl: 'views/usuarios/filtros/excluida.html',
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
			else if(id==3){

				$scope.motivoActual = $scope.motivos[2];

				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

				$mdDialog.show({
					controller: 'tamizadoController',
					templateUrl: 'views/usuarios/filtros/porTamizar.html',
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
			else if(id==4){

				$scope.motivoActual = $scope.motivos[3];


				var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

				$mdDialog.show({
					controller: 'tamizadoController',
					templateUrl: 'views/usuarios/filtros/tamizado.html',
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
		}

		var es=firebase.auth().onAuthStateChanged(function(user) {


			if(user){

				var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(datos) {

					firebase.database().ref("usuarios").once('value' , function(llegada) {
						$scope.usuario = llegada.val();				
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


						$scope.entregarPremioExamenBreast = function (ev, usuario){

							$scope.usuarioPremio = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'entregaPremioExamenSenoController',
								templateUrl: 'views/usuarios/modalPremioExamen.html',
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


						$scope.entregarPremioExamenCervix = function (ev, usuario){

							$scope.usuarioPremio = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'entregaPremioExamenCervixController',
								templateUrl: 'views/usuarios/modalPremioExamenCervix.html',
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

						$scope.detalleUsuario = function(ev, usuario) {

							$scope.usuarioDetalle = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'detalleUsuarioController',
								templateUrl: 'views/usuarios/modalDetalleUsuario.html',
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
							}, 
							function(wantsFullScreen) {
								$scope.customFullscreen = (wantsFullScreen === true);
							});
						}


						$scope.respuestasUsuarioSeno = function(ev, usuario) {

							$scope.usuarioDetalle = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'respuestasSenoController',
								templateUrl: 'views/usuarios/modalRespuestasSeno.html',
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
							}, 
							function(wantsFullScreen) {
								$scope.customFullscreen = (wantsFullScreen === true);
							});
						}




						$scope.respuestasUsuarioCervix = function(ev, usuario) {

							$scope.usuarioDetalle = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'respuestasCervixController',
								templateUrl: 'views/usuarios/modalRespuestasCervix.html',
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
							}, 
							function(wantsFullScreen) {
								$scope.customFullscreen = (wantsFullScreen === true);
							});
						}


						$scope.agendaSeno = function(ev, usuario) {

							$scope.usuarioDetalle = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'agendaSenoMainController',
								templateUrl: 'views/usuarios/agendaSeno.html',
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
							}, 
							function(wantsFullScreen) {
								$scope.customFullscreen = (wantsFullScreen === true);
							});
						}



						$scope.agendaCervix = function(ev, usuario) {

							$scope.usuarioDetalle = usuario;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'agendaCervixMainController',
								templateUrl: 'views/usuarios/agendaCervix.html',
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
							}, 
							function(wantsFullScreen) {
								$scope.customFullscreen = (wantsFullScreen === true);
							});
						}




						$scope.hide = function() {
							$mdDialog.hide();
						};

						$scope.cancel = function() {
							$mdDialog.cancel();
						};

						$scope.answer = function(answer) {
							$mdDialog.hide(answer);
						};

						$scope.consultar={};

						$scope.date = function (_date,_format,_delimiter)
						{
							var formatLowerCase=_format.toLowerCase();
							var formatItems=formatLowerCase.split(_delimiter);
							var dateItems=_date.split(_delimiter);
							var monthIndex=formatItems.indexOf("mm");
							var dayIndex=formatItems.indexOf("dd");
							var yearIndex=formatItems.indexOf("yyyy");
							var month=parseInt(dateItems[monthIndex]);
							month-=1;
							var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
							return formatedDate;
						}

						$scope.arrayquer = function (array) {
							var ary = [];
							var i = 0;
							if(typeof array !== "undefined"){


								angular.forEach(array, function (val, key) {
									val.uid = key
									val.mainIndex = i
									val.milliseconds = parseInt(moment(val.dateCreated, "DD/MM/YYYY").format('x') )
									ary.push(val);
									i++
								});
							}
							else{

							}


							return ary;
						};



						$scope.consultar.parentProperty = function (){

							$scope.pendiente = [];
							$scope.sinIndicacion = [];
							$scope.excluidas = [];
							$scope.porTamizar = [];
							$scope.tamizado = [];

							//firebase.database().ref("usuarios").once('value' , function(llegada) {
								firebase.database().ref("usuarios").once('value' , function(llegada) {
									$scope.usuarios=[];
									$scope.cantidadUsuarios=0;

								//limite
								var i = 0;
								var ipendiente = 0;
								var isinpermiso = 0;
								var iexcluidas = 0;
								var iportamizar = 0;
								var itamizado = 0;

								$scope.users = $scope.arrayquer(llegada.val());

								$scope.users = $scope.users.filter(function(u){
									return typeof u.dateCreated !== "undefined";
								})

								$scope.users = $scope.users.sort(function(a, b) { return a.milliseconds - b.milliseconds })

								console.log("usuarios original", $scope.users);
								var i=0;
								$scope.pendiente = $scope.users.filter(function(u){
									return u.lastIndicationCervix == undefined
								}).map(function(x){								
									x.mainIndex = i
									i++;
									return x;
								}
								);
								i=0;
								$scope.sinIndicacion = $scope.users.filter(function(u){
									return u.lastIndicationCervix == 1
								}).map(function(x){								
									x.mainIndex = i
									i++;
									return x;
								}
								);

								i=0
								$scope.excluidas = $scope.users.filter(function(u){
									return u.lastIndicationCervix == 2
								}).map(function(x){								
									x.mainIndex = i
									i++;
									return x;
								}
								);

								i=0
								$scope.porTamizar = $scope.users.filter(function(u){
									return u.lastIndicationCervix == 3
								}).map(function(x){								
									x.mainIndex = i
									i++;
									return x;
								}
								);

								i=0
								$scope.tamizado = $scope.users.filter(function(u){
									return u.lastIndicationCervix == 4
								}).map(function(x){								
									x.mainIndex = i
									i++;
									return x;
								}
								);

								console.log("pendientes", $scope.pendiente);
								console.log("usuarios de salida", $scope.users);


								// for(usuario in llegada.val()){

								// 	//$scope.usuarios.push( llegada.val()[usuario] );
								// 	//$scope.usuarios[$scope.usuarios.length - 1].uid = usuario;
								// 	//$scope.usuarios[$scope.usuarios.length - 1].mainIndex = i;

								// 	if( llegada.val()[usuario].lastIndicationCervix == undefined ){
								// 		//temporal["mainIndexPendiente"] = ipendiente;
								// 		$scope.pendiente.push(llegada.val()[usuario] );							
								// 		$scope.pendiente[$scope.pendiente.length - 1].uid = usuario;
								// 		$scope.pendiente[$scope.pendiente.length - 1].mainIndex = i;
								// 		ipendiente++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationCervix == 1 ){
								// 		//temporal["mainIndexSinIndicacion"] = isinpermiso;
								// 		$scope.sinIndicacion.push(llegada.val()[usuario] );	
								// 		$scope.sinIndicacion[$scope.sinIndicacion.length - 1].uid = usuario;
								// 		$scope.sinIndicacion[$scope.sinIndicacion.length - 1].mainIndex = i;
								// 		isinpermiso++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationCervix == 2 ){
								// 		//temporal["mainIndexExcluidas"] = iexcluidas;
								// 		$scope.excluidas.push(llegada.val()[usuario] );							
								// 		$scope.excluidas[$scope.excluidas.length - 1].uid = usuario;
								// 		$scope.excluidas[$scope.excluidas.length - 1].mainIndex = i;
								// 		iexcluidas++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationCervix == 3 ){
								// 		//temporal["mainIndexPorTamizar"] = iportamizar;
								// 		//$scope.porTamizar[iportamizar] = $scope.usuarios;
								// 		$scope.porTamizar.push(llegada.val()[usuario] );							
								// 		$scope.porTamizar[$scope.porTamizar.length - 1].uid = usuario;
								// 		$scope.porTamizar[$scope.porTamizar.length - 1].mainIndex = i;
								// 		iportamizar++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationCervix == 4 ){
								// 	 	//temporal["mainIndexTamizado"] = itamizado;
								// 	 	$scope.tamizado.push(llegada.val()[usuario] );							
								// 	 	$scope.tamizado[$scope.tamizado.length - 1].uid = usuario;
								// 	 	$scope.tamizado[$scope.tamizado.length - 1].mainIndex = i;
								// 	 	itamizado++;
								// 	 }




								//  //	$scope.usuarios[$scope.usuarios.length - 1].puntos= llegada.val()[usuario].pointsBreast + llegada.val()[usuario].pointsCervix;

								//  	//$scope.usuarios[$scope.usuarios.length - 1].edad=$scope.calcularEdad(llegada.val()[usuario].dateBirthday);

								//  	//$scope.usuarios[$scope.usuarios.length - 1].fechaCreado =  Date.parse($scope.date( ""+llegada.val()[usuario].dateCreated ,"dd/mm/yyyy","/") );
								//  	i++;
								//  }


								$scope.copiapendiente = $scope.pendiente;
								$scope.copiasinIndicacion = $scope.sinIndicacion;
								$scope.copiaexcluidas = $scope.excluidas;
								$scope.copiaporTamizar = $scope.porTamizar;
								$scope.copiatamizado = $scope.tamizado;


								// for(usuario in llegada.val()){

								// 	if(i==50){
								// 		break;
								// 	}

								// 	var temporal =  llegada.val()[usuario];
								// 	temporal["uid"] = usuario;


								// 	if(llegada.val()[usuario].state == 0 && llegada.val()[usuario].profileCompleted != 1){
								// 		temporal["textoEstado"] = "Cuenta creada";

								// 	} 


								// 	if(llegada.val()[usuario].profileCompleted == 1 && llegada.val()[usuario].state == 0){
								// 		temporal["textoEstado"] = "Perfil completado";

								// 	} 

								// 	if(llegada.val()[usuario].state == 1){
								// 		temporal["textoEstado"] = "Test Iniciado";

								// 	} 

								// 	if(llegada.val()[usuario].state == 2 && llegada.val()[usuario].repetitionsAnswersBreast>0 && llegada.val()[usuario].repetitionsAnswersCervix>0){
								// 		temporal["textoEstado"] = "Test completado";

								// 	} 

								// 	if(llegada.val()[usuario].state == 2 && (llegada.val()[usuario].repetitionsAnswersBreast==0 || llegada.val()[usuario].repetitionsAnswersCervix==0)){
								// 		temporal["textoEstado"] = "Test Iniciado";

								// 	} 

								// 	if(llegada.val()[usuario].state == 3){
								// 		temporal["textoEstado"] = "Premio entregado";

								// 	} 

								// 	if("appointment" in llegada.val()[usuario]){


								// 		if(llegada.val()[usuario].appointment==true){

								// 			temporal["cita"]="Si";

								// 		}	
								// 		else{
								// 			temporal["cita"]="No";
								// 		}
								// 	}
								// 	else{
								// 		temporal["cita"]="N/A";
								// 	}

								// 	temporal["puntos"]= llegada.val()[usuario].pointsBreast + llegada.val()[usuario].pointsCervix;

								// 	temporal["edad"]=$scope.calcularEdad(llegada.val()[usuario].dateBirthday);

								// 	temporal["fechaCreado"] =  Date.parse($scope.date( ""+llegada.val()[usuario].dateCreated ,"dd/mm/yyyy","/") );

								// 	temporal["mainIndex"] = i;					

								// 	if( llegada.val()[usuario].lastIndicationCervix == undefined ){
								// 		temporal["mainIndexPendiente"] = ipendiente;
								// 		$scope.pendiente[ipendiente] = temporal;
								// 		ipendiente++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationCervix == 1 ){
								// 		temporal["mainIndexSinIndicacion"] = isinpermiso;
								// 		$scope.sinIndicacion[isinpermiso] = temporal;
								// 		isinpermiso++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationCervix == 2 ){
								// 		temporal["mainIndexExcluidas"] = iexcluidas;
								// 		$scope.excluidas[iexcluidas] = temporal;
								// 		iexcluidas++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationCervix == 3 ){
								// 		temporal["mainIndexPorTamizar"] = iportamizar;
								// 		$scope.porTamizar[iportamizar] = temporal;
								// 		iportamizar++;
								// 	}

								// 	if( llegada.val()[usuario].lastIndicationCervix == 4 ){
								// 	 	temporal["mainIndexTamizado"] = itamizado;
								// 	 	$scope.tamizado[itamizado] = temporal;
								// 	 	itamizado++;
								// 	 }

								// 	$scope.usuarios[$scope.cantidadUsuarios] = temporal;
								// 	$scope.cantidadUsuarios ++;

								// 	i++;
								// }

								console.log($scope.usuarios);
								console.log($scope.pendiente);
								console.log($scope.sinIndicacion);
								console.log($scope.excluidas);
								console.log($scope.porTamizar);
								console.log($scope.tamizado);


								$scope.$apply();
							});
}

$scope.consultar.parentProperty();
}
else{
	$location.path("login");
}
});

} 
else{
	$location.path( "login" );
}
});
})

})();