(function(){

	var app = angular.module('usuariosControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'md.data.table' , 'ngAnimate', 'funcancer' ,'firebase' ])




	.controller('usuariosMainController' , function ($scope  , serviceDatos, $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {


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


						$scope.consultar.parentProperty = function (){

							firebase.database().ref("usuarios").once('value' , function(llegada) {

								$scope.usuarios=[];
								$scope.cantidadUsuarios=0;

								for(usuario in llegada.val()){

									var temporal =  llegada.val()[usuario];
									temporal["uid"] = usuario;
									

									if(llegada.val()[usuario].state == 0 && llegada.val()[usuario].profileCompleted != 1){
										temporal["textoEstado"] = "Cuenta creada";

									} 


									if(llegada.val()[usuario].profileCompleted == 1 && llegada.val()[usuario].state == 0){
										temporal["textoEstado"] = "Perfil completado";

									} 

									if(llegada.val()[usuario].state == 1){
										temporal["textoEstado"] = "Test Iniciado";

									} 

									if(llegada.val()[usuario].state == 2 && llegada.val()[usuario].repetitionsAnswersBreast>0 && llegada.val()[usuario].repetitionsAnswersCervix>0){
										temporal["textoEstado"] = "Test completado";

									} 

									if(llegada.val()[usuario].state == 2 && (llegada.val()[usuario].repetitionsAnswersBreast==0 || llegada.val()[usuario].repetitionsAnswersCervix==0)){
										temporal["textoEstado"] = "Test Iniciado";

									} 

									if(llegada.val()[usuario].state == 3){
										temporal["textoEstado"] = "Premio entregado";

									} 

									if("appointment" in llegada.val()[usuario]){
										

										if(llegada.val()[usuario].appointment==true){

											temporal["cita"]="Si";

										}	
										else{
											temporal["cita"]="No";
										}
									}
									else{
										temporal["cita"]="N/A";
									}

									temporal["puntos"]= llegada.val()[usuario].pointsBreast + llegada.val()[usuario].pointsCervix;

									temporal["edad"]=$scope.calcularEdad(llegada.val()[usuario].dateBirthday);

									temporal["fechaCreado"] =  Date.parse($scope.date( ""+llegada.val()[usuario].dateCreated ,"dd/mm/yyyy","/") );

									
									$scope.usuarios[$scope.cantidadUsuarios] = temporal;
									$scope.cantidadUsuarios ++;


								}

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

.controller('detalleUsuarioController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.usuario = $scope.usuarioDetalle;


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

})


.controller('agendaSenoMainController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.fechaMaxima = new Date();

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


	$scope.usuario = $scope.usuarioDetalle;

	$scope.agendada={};
	$scope.citas=[];
	var llegada=  firebase.database().ref('citas/'+$scope.usuario.uid+"/breast"). once('value').then(function(citas) {

		var i=0;
		for(cita in  citas.val()){			

			$scope.citas[i] = citas.val()[cita];

			$scope.agendada["examen"+i] = citas.val()[cita].realizado;
			i++;
		}

	});


	$scope.cambiarExamen = function(key, i){



		firebase.database().ref('citas/' +$scope.usuario.uid+"/breast/"+key).update({'realizado' : $scope.agendada["examen"+i]}).then(function(administracion){

			firebase.database().ref('usuarios/' +$scope.usuario.uid).update({'siftingBreast' : true}).then(function(administracion){
				$scope.consultar.parentProperty();
			});

			var pinTo = $scope.getToastPosition();
			var toast = $mdToast.simple()
			.textContent('Cambios realizados.')
			.action('Vale :)')
			.highlightAction(true)
			.hideDelay(10000)
			.position(pinTo)
			.parent(document.querySelectorAll('#toast-container'));

			$mdToast.show(toast).then(function(response) {
				if ( response == 'ok' ) {      
				}
			});  
		});

	}



	$scope.agendada.fecha="";
	$scope.agendada.no =false;

	$scope.agendada.si = true;
	$scope.disableMotivo=true; 
	$scope.agendo = "Si";


	$scope.agendada.noContesta = false;
	$scope.agendada.equivocado= false;
	$scope.agendada.noDisponible= false;
	$scope.agendada.noAplica= false;
	$scope.agendada.noQuiere= false;  

	$scope.si = function(){
		$scope.disableMotivo = true;


		for(indice in repeat){

			$scope.agendada[repeat[indice]] = false;
		


		}

	
	}

	var repeat = ["noContesta", "noQuiere", "equivocado", "noDisponible", "noAplica"];
	var repeat2 = ["si","no"]

	$scope.no = function(){
		$scope.disableMotivo = false;
		$scope.agendada.fecha = "";

	}

	$scope.unmark = function(name){

		$scope.razon = name;

		$scope.agendada.fecha = "";

		for(indice in repeat){
			if(name !== indice){
				$scope.agendada[repeat[indice]] = false;
			
			}

		}

	}

	$scope.agenda = function(name){

		$scope.agendo = name;

		for(indice in repeat2){
			if(name !== indice){
				$scope.agendada[repeat2[indice]] = false;
				
			}

		}

	}

	$scope.habilitada=true;

	$scope.validar= function(){


		if($scope.disableMotivo == true){
		
		}else{
		
		}


	}

	$scope.agendar=function(){




		if($scope.disableMotivo == true){
		

			if($scope.agendada.fecha !=""){

				$scope.registro = new Date().getTime();

			

				$scope.datosEnvio = {};
				$scope.datosEnvio.fechaRegistro = (new Date().getDate() )+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
				$scope.datosEnvio.fechaCita = ($scope.agendada.fecha.getDate() )+"/"+($scope.agendada.fecha.getMonth())+"/"+$scope.agendada.fecha.getFullYear();
				$scope.datosEnvio.motivo = "";
				$scope.datosEnvio.agendada = $scope.agendo;
				$scope.datosEnvio.realizado = "NO";
				$scope.datosEnvio.id = $scope.registro;

			


				firebase.database().ref('citas/' +$scope.usuario.uid+"/breast/"+$scope.registro).update($scope.datosEnvio).then(function(administracion) {

					firebase.database().ref('usuarios/' +$scope.usuario.uid).update({'siftingBreast' : false}).then(function(administracion){

						$scope.consultar.parentProperty();
					});

					$mdDialog.hide();



					var pinTo = $scope.getToastPosition();
					var toast = $mdToast.simple()
					.textContent('Cita agendada.')
					.action('Vale :)')
					.highlightAction(true)
					.hideDelay(10000)
					.position(pinTo)
					.parent(document.querySelectorAll('#toast-container'));

					$mdToast.show(toast).then(function(response) {
						if ( response == 'ok' ) {      
						}
					});  

				});


			}else{

				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('Selecciona la fecha.')
				.action('Vale :)')
				.highlightAction(true)
				.hideDelay(10000)
				.position(pinTo)
				.parent(document.querySelectorAll('#toast-container'));

				$mdToast.show(toast).then(function(response) {
					if ( response == 'ok' ) {      
					}
				});  


			}

		}else{
		

			if(($scope.agendada.noDisponible != false || $scope.agendada.equivocado !=false || $scope.agendada.noQuiere != false || $scope.agendada.noAplica !=false || $scope.agendada.noContesta!=false ) == true){


				$scope.registro = new Date().getTime();


				$scope.datosEnvio = {};
				$scope.datosEnvio.fechaRegistro = (new Date().getDate() )+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
				$scope.datosEnvio.fechaCita = "";
				$scope.datosEnvio.motivo = $scope.razon;
				$scope.datosEnvio.agendada = "No";
				$scope.datosEnvio.realizado = "NO";
				$scope.datosEnvio.id = $scope.registro;
		


				firebase.database().ref('citas/' +$scope.usuario.uid+"/breast/"+$scope.registro).update($scope.datosEnvio).then(function(administracion) {

					//firebase.database().ref('usuarios/' +$scope.usuario.uid).update({'siftingCervix' : false}).then(function(administracion){
						$scope.consultar.parentProperty();
					//});

					$mdDialog.hide();



					var pinTo = $scope.getToastPosition();
					var toast = $mdToast.simple()
					.textContent('Cita agendada.')
					.action('Vale :)')
					.highlightAction(true)
					.hideDelay(10000)
					.position(pinTo)
					.parent(document.querySelectorAll('#toast-container'));

					$mdToast.show(toast).then(function(response) {
						if ( response == 'ok' ) {      
						}
					});  

				});
			}
			else{
				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('Selecciona el motivo')
				.action('Vale :)')
				.highlightAction(true)
				.hideDelay(10000)
				.position(pinTo)
				.parent(document.querySelectorAll('#toast-container'));

				$mdToast.show(toast).then(function(response) {
					if ( response == 'ok' ) {      
					}
				});  
			}
		}






	}

})



.controller('agendaCervixMainController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {


	$scope.fechaMaxima = new Date();

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

	$scope.usuario = $scope.usuarioDetalle;

	$scope.agendada={};
	$scope.citas=[];
	var llegada=  firebase.database().ref('citas/'+$scope.usuario.uid+"/cervix"). once('value').then(function(citas) {

		var i=0;
		for(cita in  citas.val()){			

			$scope.citas[i] = citas.val()[cita];

			$scope.agendada["examen"+i] = citas.val()[cita].realizado;
			i++;
		}

	});


	$scope.cambiarExamen = function(key, i){




		firebase.database().ref('citas/' +$scope.usuario.uid+"/cervix/"+key).update({'realizado' : $scope.agendada["examen"+i]}).then(function(administracion){

			firebase.database().ref('usuarios/' +$scope.usuario.uid).update({'siftingCervix' : true}).then(function(administracion){
				$scope.consultar.parentProperty();
			});
			var pinTo = $scope.getToastPosition();
			var toast = $mdToast.simple()
			.textContent('Cambios realizados.')
			.action('Vale :)')
			.highlightAction(true)
			.hideDelay(10000)
			.position(pinTo)
			.parent(document.querySelectorAll('#toast-container'));

			$mdToast.show(toast).then(function(response) {
				if ( response == 'ok' ) {      
				}
			});  
		});

	}



	$scope.agendada.fecha="";
	$scope.agendada.no =false;

	$scope.agendada.si = true;
	$scope.disableMotivo=true; 
	$scope.agendo = "Si";


	$scope.agendada.noContesta = false;
	$scope.agendada.equivocado= false;
	$scope.agendada.noDisponible= false;
	$scope.agendada.noAplica= false;
	$scope.agendada.noQuiere= false;  

	$scope.si = function(){
		$scope.disableMotivo = true;


		for(indice in repeat){

			$scope.agendada[repeat[indice]] = false;
	


		}

	
	}

	var repeat = ["noContesta", "noQuiere", "equivocado", "noDisponible", "noAplica"];
	var repeat2 = ["si","no"]

	$scope.no = function(){
		$scope.disableMotivo = false;
		$scope.agendada.fecha = "";
	
	}

	$scope.unmark = function(name){

		$scope.razon = name;

		$scope.agendada.fecha = "";

		for(indice in repeat){
			if(name !== indice){
				$scope.agendada[repeat[indice]] = false;
			
			}

		}

	}

	$scope.agenda = function(name){

		$scope.agendo = name;

		for(indice in repeat2){
			if(name !== indice){
				$scope.agendada[repeat2[indice]] = false;
		
			}

		}

	}

	$scope.habilitada=true;

	$scope.validar= function(){


		if($scope.disableMotivo == true){
		
		}else{

		}


	}

	$scope.agendar=function(){


		if($scope.disableMotivo == true){
			

			if($scope.agendada.fecha !=""){

				$scope.registro = new Date().getTime();


				$scope.datosEnvio = {};
				$scope.datosEnvio.fechaRegistro = (new Date().getDate() +1)+"/"+(new Date().getMonth() +1)+"/"+new Date().getFullYear();
				$scope.datosEnvio.fechaCita = ($scope.agendada.fecha.getDate() )+"/"+($scope.agendada.fecha.getMonth())+"/"+$scope.agendada.fecha.getFullYear();
				$scope.datosEnvio.motivo = "";
				$scope.datosEnvio.agendada = $scope.agendo;
				$scope.datosEnvio.realizado = "NO";
				$scope.datosEnvio.id = $scope.registro;



				firebase.database().ref('citas/' +$scope.usuario.uid+"/cervix/"+$scope.registro).update($scope.datosEnvio).then(function(administracion) {

					firebase.database().ref('usuarios/' +$scope.usuario.uid).update({'siftingCervix' : false}).then(function(administracion){
						$scope.consultar.parentProperty();
					});

					$mdDialog.hide();



					var pinTo = $scope.getToastPosition();
					var toast = $mdToast.simple()
					.textContent('Cita agendada.')
					.action('Vale :)')
					.highlightAction(true)
					.hideDelay(10000)
					.position(pinTo)
					.parent(document.querySelectorAll('#toast-container'));

					$mdToast.show(toast).then(function(response) {
						if ( response == 'ok' ) {      
						}
					});  

				});


			}else{

				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('Selecciona la fecha.')
				.action('Vale :)')
				.highlightAction(true)
				.hideDelay(10000)
				.position(pinTo)
				.parent(document.querySelectorAll('#toast-container'));

				$mdToast.show(toast).then(function(response) {
					if ( response == 'ok' ) {      
					}
				});  


			}

		}else{
		

			if(($scope.agendada.noDisponible != false || $scope.agendada.equivocado !=false || $scope.agendada.noQuiere != false || $scope.agendada.noAplica !=false || $scope.agendada.noContesta!=false ) == true){


				$scope.registro = new Date().getTime();

			

				$scope.datosEnvio = {};
				$scope.datosEnvio.fechaRegistro = (new Date().getDate() )+"/"+(+new Date().getMonth() +1)+"/"+new Date().getFullYear();
				$scope.datosEnvio.fechaCita = "";
				$scope.datosEnvio.motivo = $scope.razon;
				$scope.datosEnvio.agendada = "No";
				$scope.datosEnvio.realizado = "NO";
				$scope.datosEnvio.id = $scope.registro;
				


				firebase.database().ref('citas/' +$scope.usuario.uid+"/cervix/"+$scope.registro).update($scope.datosEnvio).then(function(administracion) {


				//		firebase.database().ref('usuarios/' +$scope.usuario.uid).update({'siftingCervix' : false}).then(function(administracion){
					$scope.consultar.parentProperty();
				//	});


				$mdDialog.hide();



				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('Cita agendada.')
				.action('Vale :)')
				.highlightAction(true)
				.hideDelay(10000)
				.position(pinTo)
				.parent(document.querySelectorAll('#toast-container'));

				$mdToast.show(toast).then(function(response) {
					if ( response == 'ok' ) {      
					}
				});  

			});
			}
			else{
				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('Selecciona el motivo')
				.action('Vale :)')
				.highlightAction(true)
				.hideDelay(10000)
				.position(pinTo)
				.parent(document.querySelectorAll('#toast-container'));

				$mdToast.show(toast).then(function(response) {
					if ( response == 'ok' ) {      
					}
				});  
			}
		}




		

	}

})



.controller('respuestasSenoController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.usuario = $scope.usuarioDetalle;

	$scope.respuestasMostrar={};

	var es=firebase.auth().onAuthStateChanged(function(user) {


		if(user){

			var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(administracion) {

				if(administracion.val() !== null){

					$scope.respuestas={};

                    //consultar la cantidad de rondas

                    var configuracion = firebase.database().ref("configuracion").once('value' , function(configuracion) {

                    	$scope.configuracion = configuracion.val();

                    	$scope.rondas = $scope.configuracion.numOpportunities;

                    	$scope.variable = [];

                        //primero traer las preguntas segun restriccion

                        if(administracion.val().profile == 1 ){
                        	var data = firebase.database().ref("preguntas/breastCancer").orderByChild("visible").equalTo("0").once('value' , function(preguntas) {
                        		$scope.preguntas = preguntas.val();
                        		$scope.iniciar();
                        	});
                        

                        }else{
                        	var data = firebase.database().ref("preguntas/breastCancer").once('value' , function(preguntas) {
                        		$scope.preguntas = preguntas.val();
                        		$scope.iniciar();
                        	});
                        	
                        }   



                        $scope.iniciar = function(){



                            //una vez traidas, se realiza una funcion recursiva para traer las respuestas del usuario a cada pregunta

                            $scope.arrayIndices = Object.keys( $scope.preguntas);
                            $scope.cantidadPreguntas = $scope.arrayIndices.length;



                            var indiceActual = 0;

                        


                            $scope.recursiva = function (){

                                //teniendo el array con los ids, se consulta el indice 0, que debe existir 

                                if($scope.cantidadPreguntas > indiceActual){

                                    //es necesario revisar si el usuario admin actual puede ver la pregunta

                                    firebase.database().ref("respuestas/breastCancer/"+$scope.arrayIndices[indiceActual]).orderByChild("uid").equalTo($scope.usuario.uid).once('value' , function(respuesta) {

                                        //se borra el indice cero (lo que esta entre 0 y 1)

                                        $scope.respuestas[$scope.arrayIndices[indiceActual]] = {};
                                        $scope.respuestas[$scope.arrayIndices[indiceActual]].textoPregunta = $scope.preguntas[ $scope.arrayIndices[indiceActual] ].text;
                                        $scope.respuestas[$scope.arrayIndices[indiceActual]].rondas = {};
                                        //ahora se revisa la respuesta, segun la ronda

                                        for(var ronda =0 ; ronda < $scope.rondas ; ronda++){

                                            //si viene en nulo, la ponemos como -
                                            if(respuesta.val() != null){

                                                //ahora, no siempre se han respondido todas las rondas, asi que se revisa si ya respondio esta ronda

                                                if("respuesta"+ronda in respuesta.val()[$scope.usuario.uid] ){
                                                	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda] = {};
                                                	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].respuesta = $scope.preguntas[ $scope.arrayIndices[indiceActual] ].answers[ respuesta.val()[$scope.usuario.uid]["respuesta"+ronda]  ].description;

                                                    //hay que revisar si la respuesta seleccionada tiene anidada, para anidarla (no se muestran otras anidadas)
                                                    if("question" in $scope.preguntas[ $scope.arrayIndices[indiceActual] ].answers[ respuesta.val()[$scope.usuario.uid]["respuesta"+ronda]  ]){
                                                    	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].anidada = {};

                                                    	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].anidada.texto =$scope.preguntas[ $scope.arrayIndices[indiceActual] ].answers[ respuesta.val()[$scope.usuario.uid]["respuesta"+ronda]  ].question.text;
                                                    	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].anidada.respuesta =$scope.preguntas[ $scope.arrayIndices[indiceActual] ].answers[ respuesta.val()[$scope.usuario.uid]["respuesta"+ronda]  ].question.answers[  respuesta.val()[$scope.usuario.uid]["anidada"+ronda] ].description;
                                                    }

                                                }else{
                                                	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda] = {};
                                                	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].respuesta = "-";
                                                }


                                                



                                            }
                                            else{

                                            	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda] = {};
                                            	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].respuesta = "-";

                                            }

                                        }



                                        indiceActual++;

                                        $scope.recursiva();

                                    });
                                }
                                else{
                                    //se ha terminado el array, o no hay preguntas

                          
                                    $scope.respuestasMostrar=$scope.respuestas;

                                    document.getElementById("cargandoRespuestas").classList.remove("visible");
                                    document.getElementById("cargandoRespuestas").classList.add("noVisible");    


                                    $scope.$apply();
                                }



                            }

                            $scope.recursiva();


                        }

                    });

}

});
}

});



})



.controller('respuestasCervixController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {



	$scope.usuario = $scope.usuarioDetalle;

	$scope.respuestasMostrar={};

	var es=firebase.auth().onAuthStateChanged(function(user) {


		if(user){

			var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(administracion) {

				if(administracion.val() !== null){

					$scope.respuestas={};

                    //consultar la cantidad de rondas

                    var configuracion = firebase.database().ref("configuracion").once('value' , function(configuracion) {

                    	$scope.configuracion = configuracion.val();

                    	$scope.rondas = $scope.configuracion.numOpportunities;

                    	$scope.variable = [];

                        //primero traer las preguntas segun restriccion

                        if(administracion.val().profile == 1 ){
                        	var data = firebase.database().ref("preguntas/cervixCancer").orderByChild("visible").equalTo("0").once('value' , function(preguntas) {
                        		$scope.preguntas = preguntas.val();
                        		$scope.iniciar();
                        	});
                        

                        }else{
                        	var data = firebase.database().ref("preguntas/cervixCancer").once('value' , function(preguntas) {
                        		$scope.preguntas = preguntas.val();
                        		$scope.iniciar();
                        	});
                     
                        }   



                        $scope.iniciar = function(){



                            //una vez traidas, se realiza una funcion recursiva para traer las respuestas del usuario a cada pregunta

                            $scope.arrayIndices = Object.keys( $scope.preguntas);
                            $scope.cantidadPreguntas = $scope.arrayIndices.length;



                            var indiceActual = 0;

                          


                            $scope.recursiva = function (){

                                //teniendo el array con los ids, se consulta el indice 0, que debe existir 

                                if($scope.cantidadPreguntas > indiceActual){

                                    //es necesario revisar si el usuario admin actual puede ver la pregunta

                                    firebase.database().ref("respuestas/cervixCancer/"+$scope.arrayIndices[indiceActual]).orderByChild("uid").equalTo($scope.usuario.uid).once('value' , function(respuesta) {

                                        //se borra el indice cero (lo que esta entre 0 y 1)

                                        $scope.respuestas[$scope.arrayIndices[indiceActual]] = {};
                                        $scope.respuestas[$scope.arrayIndices[indiceActual]].textoPregunta = $scope.preguntas[ $scope.arrayIndices[indiceActual] ].text;
                                        $scope.respuestas[$scope.arrayIndices[indiceActual]].rondas = {};
                                        //ahora se revisa la respuesta, segun la ronda

                                        for(var ronda =0 ; ronda < $scope.rondas ; ronda++){

                                            //si viene en nulo, la ponemos como -
                                            if(respuesta.val() != null){

                                                //ahora, no siempre se han respondido todas las rondas, asi que se revisa si ya respondio esta ronda

                                                if("respuesta"+ronda in respuesta.val()[$scope.usuario.uid] ){
                                                	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda] = {};
                                                	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].respuesta = $scope.preguntas[ $scope.arrayIndices[indiceActual] ].answers[ respuesta.val()[$scope.usuario.uid]["respuesta"+ronda]  ].description;

                                                    //hay que revisar si la respuesta seleccionada tiene anidada, para anidarla (no se muestran otras anidadas)
                                                    if("question" in $scope.preguntas[ $scope.arrayIndices[indiceActual] ].answers[ respuesta.val()[$scope.usuario.uid]["respuesta"+ronda]  ]){
                                                    	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].anidada = {};

                                                    	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].anidada.texto =$scope.preguntas[ $scope.arrayIndices[indiceActual] ].answers[ respuesta.val()[$scope.usuario.uid]["respuesta"+ronda]  ].question.text;
                                                    	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].anidada.respuesta =$scope.preguntas[ $scope.arrayIndices[indiceActual] ].answers[ respuesta.val()[$scope.usuario.uid]["respuesta"+ronda]  ].question.answers[  respuesta.val()[$scope.usuario.uid]["anidada"+ronda] ].description;
                                                    }

                                                }else{
                                                	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda] = {};
                                                	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].respuesta = "-";
                                                }


                                            }
                                            else{

                                            	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda] = {};
                                            	$scope.respuestas[$scope.arrayIndices[indiceActual]].rondas[ronda].respuesta = "-";

                                            }

                                        }



                                        indiceActual++;

                                        $scope.recursiva();

                                    });
                                }
                                else{
                                    //se ha terminado el array, o no hay preguntas

                        
                                    $scope.respuestasMostrar=$scope.respuestas;

                                    document.getElementById("cargandoRespuestas").classList.remove("visible");
                                    document.getElementById("cargandoRespuestas").classList.add("noVisible");    


                                    $scope.$apply();
                                }



                            }

                            $scope.recursiva();


                        }

                    });

}

});
}

});



})




.controller('entregaPremioController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.usuarioEntrega = $scope.usuarioPremio;

	$scope.entregar = function (){

		var es=firebase.auth().onAuthStateChanged(function(user) {


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


			firebase.database().ref('usuarios/' +$scope.usuarioEntrega.uid).update({
				state: 3
			});


			$scope.consultar.parentProperty();
			$mdDialog.cancel();



			var pinTo = $scope.getToastPosition();
			var toast = $mdToast.simple()
			.textContent('Estado modificado satisfactoriamente')
			.action('Vale :)')
			.highlightAction(true)
			.hideDelay(10000)
			.position(pinTo)
			.parent(document.querySelectorAll('#toast-container'));

			$mdToast.show(toast).then(function(response) {
				if ( response == 'ok' ) {      
				}
			});  


		});


	}

})



.controller('entregaPremioExamenSenoController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {





	$scope.usuarioEntrega = $scope.usuarioPremio;


	$scope.entregarExamen = function (){

		var es=firebase.auth().onAuthStateChanged(function(user) {


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


			firebase.database().ref('usuarios/' +$scope.usuarioEntrega.uid).update({
				examGiftBreast:true
			});


			$scope.consultar.parentProperty();
			$mdDialog.cancel();



			var pinTo = $scope.getToastPosition();
			var toast = $mdToast.simple()
			.textContent('Premio por examen entregado.')

			.highlightAction(true)
			.hideDelay(10000)
			.position(pinTo)
			.parent(document.querySelectorAll('#toast-container'));

			$mdToast.show(toast).then(function(response) {
				if ( response == 'ok' ) {      
				}
			});  


		});


	}

})



.controller('entregaPremioExamenCervixController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {


	$scope.usuarioEntrega = $scope.usuarioPremio;
	

	$scope.entregarExamen = function (){

		var es=firebase.auth().onAuthStateChanged(function(user) {


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


			firebase.database().ref('usuarios/' +$scope.usuarioEntrega.uid).update({
				examGiftCervix:true
			});


			$scope.consultar.parentProperty();
			$mdDialog.cancel();



			var pinTo = $scope.getToastPosition();
			var toast = $mdToast.simple()
			.textContent('Premio por examen entregado.')

			.highlightAction(true)
			.hideDelay(10000)
			.position(pinTo)
			.parent(document.querySelectorAll('#toast-container'));

			$mdToast.show(toast).then(function(response) {
				if ( response == 'ok' ) {      
				}
			});  


		});


	}

})









})();