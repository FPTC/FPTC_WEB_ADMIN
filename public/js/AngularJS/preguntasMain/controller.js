(function(){

	var app = angular.module('preguntasControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'ngAnimate', 'funcancer' ,'firebase' ])

	.controller('preguntasMainController' , function ($scope , $mdDialog , $mdMedia , $location , $firebaseAuth , $mdToast, $timeout , $mdSidenav ) {

		$scope.selectedSeno=[];
		$scope.querySeno = {
			"filter":"",
			"order": 'firstLastName',
			"limit": 50,
			"page": 1
		};

		$scope.logPaginationSeno = function (page, limit) {
		}

		$scope.optionsSeno = {
			rowSelection: false,
		};


		$scope.selectedCervix=[];
		$scope.queryCervix = {
			"filter":"",
			"order": 'firstLastName',
			"limit": 50,
			"page": 1
		};

		$scope.logPaginationCervix = function (page, limit) {
		}

		$scope.optionsCervix = {
			rowSelection: false,
		};

		var es=firebase.auth().onAuthStateChanged(function(user) {

			if(user){

				var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(datos) {

					$scope.perfil = datos.val().profile;
					

					if(datos.val() !== null){
						
						$scope.cambiarEstado();

						$scope.detalleSeno = function (id){

							localStorage.setItem("idPreguntaDetalleSeno", id );
							$location.path("preguntas/detalleSeno");

						}

						$scope.detalleCervix = function (id){

							localStorage.setItem("idPreguntaDetalleCervix", id );
							$location.path("preguntas/detalleCervix");

						}

						$scope.crearPregunta = function (ev){

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'crearController',
								templateUrl: 'views/preguntas/crear.html',
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

						$scope.editarPreguntaSeno = function (ev, pregunta){




							$scope.preguntaEditar = angular.copy(pregunta);

							$scope.tipoEditar = 0;
							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'editarController',
								templateUrl: 'views/preguntas/editarSeno.html',
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

						$scope.editarPreguntaCervix = function (ev, pregunta){
							$scope.tipoEditar = 1;
							$scope.preguntaEditar = angular.copy(pregunta);

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'editarController',
								templateUrl: 'views/preguntas/editarCervix.html',
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

						$scope.eliminarPregunta = function (ev, pregunta, tipo){

							$scope.preguntaEliminar = pregunta;
							$scope.tipoEliminar = tipo;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'eliminarController',
								templateUrl: 'views/preguntas/eliminar.html',
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

						$scope.eliminarPreguntaCervix = function (ev, pregunta, tipo){

							$scope.preguntaEliminar = pregunta;
							$scope.tipoEliminar = tipo;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'eliminarController',
								templateUrl: 'views/preguntas/eliminarCervix.html',
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




						$scope.habilitarPregunta = function (ev, pregunta, tipo){

							$scope.preguntaHabilitar = pregunta;
							$scope.tipoHabilitar = tipo;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'habilitarController',
								templateUrl: 'views/preguntas/habilitar.html',
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



						$scope.habilitarPreguntaCervix = function (ev, pregunta, tipo){

							$scope.preguntaHabilitar = pregunta;
							$scope.tipoHabilitar = tipo;

							var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

							$mdDialog.show({
								controller: 'habilitarController',
								templateUrl: 'views/preguntas/habilitarCervix.html',
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





						$scope.hide = function() {
							$mdDialog.hide();
						};

						$scope.cancel = function() {
							$mdDialog.cancel();
						};

						$scope.answer = function(answer) {
							$mdDialog.hide(answer);
						};

						$scope.consultarSeno={};
						$scope.consultarCervix={};


						$scope.consultarSeno.parentProperty = function (){

							firebase.database().ref("preguntas/breastCancer").orderByChild("enable").once('value' , function(seno) {


								$scope.preguntasSeno=[];
								$scope.cantidadPreguntasSeno=0;

								for(pregunta in seno.val()){

									if(datos.val().profile == 1){
									

										if(seno.val()[pregunta].visible){

											if(seno.val()[pregunta].visible == 0){


												
												$scope.preguntasSeno[$scope.cantidadPreguntasSeno] = seno.val()[pregunta];
												$scope.cantidadPreguntasSeno ++;
												
											}
										}
										else{
											$scope.preguntasSeno[$scope.cantidadPreguntasSeno] = seno.val()[pregunta];
											$scope.cantidadPreguntasSeno ++;
											
										}

									}else{


										$scope.preguntasSeno[$scope.cantidadPreguntasSeno] = seno.val()[pregunta];

										$scope.cantidadPreguntasSeno ++;
										
									}

								}

								$scope.preguntasSenoCopia=angular.copy($scope.preguntasSeno);

								$scope.$apply();
							});
						}

						$scope.consultarSeno.parentProperty();


						$scope.consultarCervix.parentProperty = function (){

							firebase.database().ref("preguntas/cervixCancer").orderByChild("enable").once('value' , function(cervix) {

								$scope.preguntasCervix=[];
								$scope.cantidadPreguntasCervix=0;

								for(pregunta in cervix.val()){
									if(datos.val().profile == 1){

										if(cervix.val()[pregunta].visible){

											if(cervix.val()[pregunta].visible == 0){
												$scope.preguntasCervix[$scope.cantidadPreguntasCervix] = cervix.val()[pregunta];
												$scope.cantidadPreguntasCervix ++;
												
											}
										}
										else{
											$scope.preguntasCervix[$scope.cantidadPreguntasCervix] = cervix.val()[pregunta];
											$scope.cantidadPreguntasCervix ++;
											
										}

									}
									else{
										$scope.preguntasCervix[$scope.cantidadPreguntasCervix] = cervix.val()[pregunta];
										$scope.cantidadPreguntasCervix ++;
										
									}
								}

								$scope.$apply();
							});
						}

						$scope.consultarCervix.parentProperty();
					}
					else{
						$location.path("login");
					}
				});
}
else{
	$location.path("login");
}

});

})

.controller('crearController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

	$scope.hide = function() {
		$mdDialog.hide();
	};

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


	$scope.nuevaPregunta = {};
	$scope.nuevaPregunta.mensaje = "";

	$scope.nuevaPregunta.answers = {};

	$scope.idPreguntaDefault = "id"+( new Date().getTime());
	$scope.idPreguntaDefaultDos = "id"+( ( new Date().getTime())+666 );

	$scope.nuevaPregunta.answers[$scope.idPreguntaDefault] = {};
	$scope.nuevaPregunta.answers[$scope.idPreguntaDefaultDos] = {};

	$scope.nuevaPregunta.answers[$scope.idPreguntaDefault].description = "";
	$scope.nuevaPregunta.answers[$scope.idPreguntaDefault].value = "";
	$scope.nuevaPregunta.answers[$scope.idPreguntaDefault].points = 0;

	$scope.nuevaPregunta.answers[$scope.idPreguntaDefaultDos].description = "";
	$scope.nuevaPregunta.answers[$scope.idPreguntaDefaultDos].value = "";
	$scope.nuevaPregunta.answers[$scope.idPreguntaDefaultDos].points = 0;
	$scope.maximoAnidadas = {};

	$scope.anidarPregunta = function (nodo){

		$scope.nuevaPregunta.answers[nodo].question = {};
		$scope.nuevaPregunta.answers[nodo].question.answers = {};
		$scope.nuevaPregunta.answers[nodo].question.text = "";

		//no tiene sentido crear una anidada si no tiene minimo dos opciones, asi que se crean predeterminadas

		$scope.idAnidada1 = "id"+( new Date().getTime());
		$scope.idAnidada2 = "id"+( ( new Date().getTime())+666 );

		$scope.nuevaPregunta.answers[nodo].question.answers[$scope.idAnidada1] = {};	
		$scope.nuevaPregunta.answers[nodo].question.answers[$scope.idAnidada1].description = "";	
		$scope.nuevaPregunta.answers[nodo].question.answers[$scope.idAnidada2] = {};	
		$scope.nuevaPregunta.answers[nodo].question.answers[$scope.idAnidada2].description = "";	


		$scope.maximoAnidadas[nodo] = {};
		$scope.maximoAnidadas[nodo].cantidad = 2;

		$scope.validar();

	}


	$scope.crearRespuesta = function(){

		var idPreguntaDefault = "id"+( new Date().getTime());

		$scope.nuevaPregunta.answers[idPreguntaDefault] = {};
		$scope.nuevaPregunta.answers[idPreguntaDefault].description="";
		$scope.nuevaPregunta.answers[idPreguntaDefault].points = 0;
		$scope.nuevaPregunta.answers[idPreguntaDefault].value = "";


	}



	$scope.btnCrear =true;

	$scope.validar = function (){
		if($scope.formularioForm.$valid){
			$scope.btnCrear=false;
		
		}   
		else{
			$scope.btnCrear=true;
		
		}
	};


	$scope.eliminarRespuesta = function(idRespuesta){
		delete $scope.nuevaPregunta.answers[idRespuesta];
	}


	$scope.eliminarAnidada = function(nodo, anidada){

		delete $scope.nuevaPregunta.answers[nodo].question.answers[anidada];

		var contador = 0;
		for(opcion in $scope.nuevaPregunta.answers[nodo].question.answers){
			contador++;
		}

		if(contador==0){
			delete $scope.nuevaPregunta.answers[nodo].question;
		}

		//esperamos medio segundo para lanzar la validacion
		setTimeout(function() {
			$scope.validar();
		}, 500);

		$scope.maximoAnidadas[nodo].cantidad--;


	}

	$scope.agregarAnidada = function (nodo){

		var add = "id"+( ( new Date().getTime())+666 );

		$scope.nuevaPregunta.answers[nodo].question.answers[add] = {};	
		$scope.nuevaPregunta.answers[nodo].question.answers[add].description = "";	
		$scope.maximoAnidadas[nodo].cantidad++;

	

		//esperamos medio segundo para lanzar la validacion
		setTimeout(function() {
			$scope.validar();
		}, 500);

		

	}

	

	$scope.enviar = function(){
		
		//se revisa el tipo de pregunta, seno o lo otro

		if($scope.nuevaPregunta.tipo == 0){
		

			$scope.idNodo = "id"+( ( new Date().getTime()) );

			$scope.pregunta = {};

			$scope.pregunta.text = $scope.nuevaPregunta.text;
			$scope.pregunta.typeQuestion = $scope.nuevaPregunta.type;
			$scope.pregunta.id = $scope.idNodo;
			$scope.pregunta.enable = true;

			if($scope.nuevaPregunta.mensaje != ""){
				$scope.pregunta.info = $scope.nuevaPregunta.mensaje	;
			}
			//hay que cambiar el value de string a true o false booleano
			for(respuesta in $scope.nuevaPregunta.answers){

				if($scope.nuevaPregunta.answers[respuesta].value == "true"){
					$scope.nuevaPregunta.answers[respuesta].value = true;
				}
				else{
					$scope.nuevaPregunta.answers[respuesta].value = false
				}

			}

			

			$scope.pregunta.answers = $scope.nuevaPregunta.answers;
			$scope.pregunta.visible = $scope.nuevaPregunta.visible;

		

			firebase.database().ref('preguntas/breastCancer/'+$scope.idNodo ).update($scope.pregunta).then(function(){

				$mdDialog.hide();
				$scope.consultarSeno.parentProperty ();

				$scope.consultarSeno.parentProperty ();
				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('Pregunta creada satisfactoriamente')
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
	

			$scope.idNodo = "id"+( ( new Date().getTime()) );

			$scope.pregunta = {};

			$scope.pregunta.text = $scope.nuevaPregunta.text;
			$scope.pregunta.typeQuestion = $scope.nuevaPregunta.type;
			$scope.pregunta.id = $scope.idNodo;
			$scope.pregunta.enable = true;

			if($scope.nuevaPregunta.mensaje != ""){
				$scope.pregunta.info = $scope.nuevaPregunta.mensaje	;
			}
			//hay que cambiar el value de string a true o false booleano
			for(respuesta in $scope.nuevaPregunta.answers){

				if($scope.nuevaPregunta.answers[respuesta].value == "true"){
					$scope.nuevaPregunta.answers[respuesta].value = true;
				}
				else{
					$scope.nuevaPregunta.answers[respuesta].value = false
				}

			}

			

			$scope.pregunta.answers = $scope.nuevaPregunta.answers;
			$scope.pregunta.visible = $scope.nuevaPregunta.visible;

			firebase.database().ref('preguntas/cervixCancer/'+$scope.idNodo ).update($scope.pregunta).then(function(){

				$mdDialog.hide();
				$scope.consultarCervix.parentProperty ();

				$scope.consultarSeno.parentProperty ();
				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('Pregunta creada satisfactoriamente')
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


	}


	



})

.controller('editarController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {



	$scope.hide = function() {
		$mdDialog.hide();
	};

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


	$scope.nuevaPregunta = {};
	$scope.nuevaPregunta.mensaje = "";

	$scope.nuevaPregunta.answers = {};

	$scope.idPreguntaDefault = "id"+( new Date().getTime());
	$scope.idPreguntaDefaultDos = "id"+( ( new Date().getTime())+666 );

	$scope.nuevaPregunta.answers[$scope.idPreguntaDefault] = {};
	$scope.nuevaPregunta.answers[$scope.idPreguntaDefaultDos] = {};

	$scope.nuevaPregunta.answers[$scope.idPreguntaDefault].description = "";
	$scope.nuevaPregunta.answers[$scope.idPreguntaDefault].value = "";
	$scope.nuevaPregunta.answers[$scope.idPreguntaDefault].points = 0;

	$scope.nuevaPregunta.answers[$scope.idPreguntaDefaultDos].description = "";
	$scope.nuevaPregunta.answers[$scope.idPreguntaDefaultDos].value = "";
	$scope.nuevaPregunta.answers[$scope.idPreguntaDefaultDos].points = 0;
	$scope.maximoAnidadas = {};

	$scope.nuevaPregunta = $scope.preguntaEditar;
	$scope.nuevaPregunta.tipo = $scope.tipoEditar ;

	$scope.anidarPregunta = function (nodo){

		$scope.nuevaPregunta.answers[nodo].question = {};
		$scope.nuevaPregunta.answers[nodo].question.answers = {};
		$scope.nuevaPregunta.answers[nodo].question.text = "";

		//no tiene sentido crear una anidada si no tiene minimo dos opciones, asi que se crean predeterminadas

		$scope.idAnidada1 = "id"+( new Date().getTime());
		$scope.idAnidada2 = "id"+( ( new Date().getTime())+666 );

		$scope.nuevaPregunta.answers[nodo].question.answers[$scope.idAnidada1] = {};	
		$scope.nuevaPregunta.answers[nodo].question.answers[$scope.idAnidada1].description = "";	
		$scope.nuevaPregunta.answers[nodo].question.answers[$scope.idAnidada1].id = $scope.idAnidada1;	


		$scope.nuevaPregunta.answers[nodo].question.answers[$scope.idAnidada2] = {};	
		$scope.nuevaPregunta.answers[nodo].question.answers[$scope.idAnidada2].description = "";	
		$scope.nuevaPregunta.answers[nodo].question.answers[$scope.idAnidada2].id = $scope.idAnidada2;	

		$scope.maximoAnidadas[nodo] = {};
		$scope.maximoAnidadas[nodo].cantidad = 2;

		$scope.validar();

		$scope.llaves = Object.keys($scope.nuevaPregunta.answers);


	}


	$scope.crearRespuesta = function(){

		var idPreguntaDefault = "id"+( new Date().getTime());

		$scope.nuevaPregunta.answers[idPreguntaDefault] = {};
		$scope.nuevaPregunta.answers[idPreguntaDefault].description="";
		$scope.nuevaPregunta.answers[idPreguntaDefault].points = 0;
		$scope.nuevaPregunta.answers[idPreguntaDefault].value = "";
		$scope.nuevaPregunta.answers[idPreguntaDefault].id = idPreguntaDefault;
		$scope.llaves = Object.keys($scope.nuevaPregunta.answers);
		
		

	}

	$scope.llaves = Object.keys($scope.nuevaPregunta.answers);


	$scope.btnCrear =true;

	$scope.validar = function (){
		if($scope.formularioForm.$valid){
			$scope.btnCrear=false;
		
		}   
		else{
			$scope.btnCrear=true;
			
		}
	};


	$scope.eliminarRespuesta = function(idRespuesta){
		delete $scope.nuevaPregunta.answers[idRespuesta];
	}

	
	$scope.eliminarAnidada = function(nodo, anidada){

		delete $scope.nuevaPregunta.answers[nodo].question.answers[anidada];

		var contador = 0;
		for(opcion in $scope.nuevaPregunta.answers[nodo].question.answers){
			contador++;
		}

		if(contador==0){
			delete $scope.nuevaPregunta.answers[nodo].question;
		}

		//esperamos medio segundo para lanzar la validacion
		setTimeout(function() {
			$scope.validar();
		}, 500);

		$scope.maximoAnidadas[nodo].cantidad--;

		

	}

	

	$scope.agregarAnidada = function (nodo){

		var add = "id"+( ( new Date().getTime())+666 );

		$scope.nuevaPregunta.answers[nodo].question.answers[add] = {};	
		$scope.nuevaPregunta.answers[nodo].question.answers[add].description = "";	
		$scope.maximoAnidadas[nodo].cantidad++;

	

		//esperamos medio segundo para lanzar la validacion
		setTimeout(function() {
			$scope.validar();
		}, 500);

		

	}

	


	$scope.enviar = function(){

		$scope.idNodo = $scope.nuevaPregunta.id;
		
		//se revisa el tipo de pregunta, seno o lo otro

		if($scope.nuevaPregunta.tipo == 0){
		

			

			$scope.pregunta = {};

			$scope.pregunta.text = $scope.nuevaPregunta.text;
			$scope.pregunta.typeQuestion = $scope.nuevaPregunta.typeQuestion;
			$scope.pregunta.id = $scope.idNodo;
			$scope.pregunta.enable = true;

			if($scope.nuevaPregunta.info != undefined){
				$scope.pregunta.info = $scope.nuevaPregunta.info	;
				
			}

			if($scope.nuevaPregunta.info == ""){
				


			}

			//hay que cambiar el value de string a true o false booleano
			for(respuesta in $scope.nuevaPregunta.answers){

				if($scope.nuevaPregunta.answers[respuesta].value == "true"){
					$scope.nuevaPregunta.answers[respuesta].value = true;
				}
				else{
					$scope.nuevaPregunta.answers[respuesta].value = false
				}

			}

			

			$scope.pregunta.answers = $scope.nuevaPregunta.answers;
			$scope.pregunta.visible = $scope.nuevaPregunta.visible;

			

			firebase.database().ref('preguntas/breastCancer/'+$scope.idNodo ).update($scope.pregunta).then(function(){

				$mdDialog.hide();

				$scope.consultarSeno.parentProperty ();
				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('Pregunta editada satisfactoriamente')
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
		



			$scope.pregunta = {};

			$scope.pregunta.text = $scope.nuevaPregunta.text;
			$scope.pregunta.typeQuestion = $scope.nuevaPregunta.typeQuestion;
			$scope.pregunta.id = $scope.idNodo;
			$scope.pregunta.enable = true;

			if($scope.nuevaPregunta.info != undefined){
				$scope.pregunta.info = $scope.nuevaPregunta.info	;
				
			}
			//hay que cambiar el value de string a true o false booleano
			for(respuesta in $scope.nuevaPregunta.answers){

				if($scope.nuevaPregunta.answers[respuesta].value == "true"){
					$scope.nuevaPregunta.answers[respuesta].value = true;
				}
				else{
					$scope.nuevaPregunta.answers[respuesta].value = false
				}

			}

			

			$scope.pregunta.answers = $scope.nuevaPregunta.answers;
			$scope.pregunta.visible = $scope.nuevaPregunta.visible;

			firebase.database().ref('preguntas/cervixCancer/'+$scope.idNodo ).update($scope.pregunta).then(function(){

				$mdDialog.hide();

				$scope.consultarCervix.parentProperty ();

				$scope.consultarSeno.parentProperty ();
				var pinTo = $scope.getToastPosition();
				var toast = $mdToast.simple()
				.textContent('Pregunta editada satisfactoriamente')
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


	}








})

.controller('eliminarController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {


	$scope.confirmar="";

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


	$scope.eliminar = function (){

		var es=firebase.auth().onAuthStateChanged(function(user) {

			if(user){

				var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(datos) {

					if(datos.val() !== null){

						$scope.variableUpdate = 
						{
							"enable": false

						}

						if($scope.tipoEliminar === 0){


							var guardarRespuesta = firebase.database().ref("preguntas/breastCancer/"+$scope.preguntaEliminar.id)
							.update($scope.variableUpdate).then(function(){
								var pinTo = $scope.getToastPosition();
								var toast = $mdToast.simple()
								.textContent('Pregunta inhabilitada satisfactoriamente')
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


							$scope.consultarSeno.parentProperty();

							$mdDialog.cancel();


						}
						else{

					
							var guardarRespuesta = firebase.database().ref("preguntas/cervixCancer/"+$scope.preguntaEliminar.id)
							.update($scope.variableUpdate).then(function(){
								var pinTo = $scope.getToastPosition();
								var toast = $mdToast.simple()
								.textContent('Pregunta inhabilitada satisfactoriamente')
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

							$scope.consultarCervix.parentProperty();

							$mdDialog.cancel();
						}



					}
					else{
						$location.path("login");
					}

				});
			}
			else{


			}

		});
	}

	

})




.controller('habilitarController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {


	$scope.confirmar="";

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


	$scope.habilitar = function (){

		var es=firebase.auth().onAuthStateChanged(function(user) {

			if(user){

				var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(datos) {

					if(datos.val() !== null){

						$scope.variableUpdate = 
						{
							"enable": true

						}

						if($scope.tipoHabilitar === 0){


							var guardarRespuesta = firebase.database().ref("preguntas/breastCancer/"+$scope.preguntaHabilitar.id)
							.update($scope.variableUpdate).then(function(){
								var pinTo = $scope.getToastPosition();
								var toast = $mdToast.simple()
								.textContent('Pregunta habilitada satisfactoriamente')
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


							$scope.consultarSeno.parentProperty();

							$mdDialog.cancel();


						}
						else{


							var guardarRespuesta = firebase.database().ref("preguntas/cervixCancer/"+$scope.preguntaHabilitar.id)
							.update($scope.variableUpdate).then(function(){
								var pinTo = $scope.getToastPosition();
								var toast = $mdToast.simple()
								.textContent('Pregunta habilitada satisfactoriamente')
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

							$scope.consultarCervix.parentProperty();

							$mdDialog.cancel();
						}



					}
					else{
						$location.path("login");
					}

				});
			}
			else{


			}

		});
	}

	

})





})();