(function(){

	var app = angular.module('estadisticasControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'ngAnimate', 'funcancer' ,'firebase' ])


	.controller('estadisticasMainController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {

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



		var es=firebase.auth().onAuthStateChanged(function(user) {

			if(user){
				
				$scope.cambiarEstado();

				document.getElementById("cargandoPreguntas").classList.remove("noVisible");
				document.getElementById("cargandoPreguntas").classList.add("visible");	

				var usuario=  firebase.database().ref('usuarios'). once('value').then(function(usuarios) {

				
					if(usuarios.val() != null){

						$scope.cantidadUsuarios = 0;
						$scope.perfilIncompleto = 0;


						$scope.usuarios = usuarios.val();

						$scope.usuariosGrafica = {};

						$scope.cantidad = [];

						$scope.rango1 =0;
						$scope.rango2=0;
						$scope.rango3 =0;
						$scope.rango4 =0;
						$scope.rango5 =0;
						$scope.rango6 =0;
						$scope.rango7 =0;
						$scope.rango8 =0;

						$scope.edades=[];
						$scope.auxMediana =[];

						for(i=14; i<=90; i++){
							$scope.edades[i]=0;
						}

						$scope.media = 0;
						var contador=0;
						
						$scope.recuento=0;
						for(usuario in $scope.usuarios){

							$scope.cantidadUsuarios++;




							if($scope.usuarios[usuario].dateBirthday!=""){

								$scope.recuento++;

								var edad = $scope.calcularEdad($scope.usuarios[usuario].dateBirthday);

								$scope.edades[edad]++;

								if(edad>=14 && edad<=20){
									$scope.rango1 ++;
								}
								if(edad>=21 && edad<=30){
									$scope.rango2 ++;
								}
								if(edad>=31 && edad<=40){
									$scope.rango3 ++;
								}
								if(edad>=41 && edad<=50){
									$scope.rango4 ++;
								}
								if(edad>=51 && edad<=60){
									$scope.rango5 ++;
								}
								if(edad>=61 && edad<=70){
									$scope.rango6 ++;
								}
								if(edad>=71 && edad<=80){
									$scope.rango7 ++;
								}
								if(edad>=81 && edad<=90){
									$scope.rango8 ++;
								}
								$scope.auxMediana.push(edad);

								if(edad>0){
								  $scope.media += edad;
								}

								contador++;
							}
							else{
								$scope.perfilIncompleto++;
							}

							$scope.usuariosGrafica.dataChart = 
							[
							{y:"14-20", a: $scope.rango1},
							{y:"21-30", a: $scope.rango2},
							{y:"31-40", a: $scope.rango3},
							{y:"41-50", a: $scope.rango4},
							{y:"51-60", a: $scope.rango5},
							{y:"61-70", a: $scope.rango6},
							{y:"71-80", a: $scope.rango7},
							{y:"81-90", a: $scope.rango8}
							];
							$scope.usuariosGrafica.dataX=["Usuarios"];

					

							$scope.tortaPerfil = {};
							$scope.tortaPerfil.datos =[ {label: "Perfil diligenciado", value: ($scope.cantidadUsuarios - $scope.perfilIncompleto)}, {label: "Perfil sin diligenciar", value: $scope.perfilIncompleto}];
							$scope.tortaPerfil = {};



						}

						$scope.graficaPuntual=[];

						


						for(i=14; i<90; i++){
							$scope.graficaPuntual.push({y:i , a: $scope.edades[i]});
							
						}

				

						$scope.auxMediana = $scope.auxMediana.sort();

						$scope.mediana=0;



						if($scope.auxMediana.length%2 == 0 ){

							$scope.primero = $scope.auxMediana.length/2;
							

							$scope.mediana = ($scope.auxMediana[$scope.primero-1] + $scope.auxMediana[$scope.primero])/2;
							
						}
						else{

							$scope.primero = ($scope.auxMediana.length + 1 )/2;

							$scope.mediana = $scope.auxMediana[ $scope.primero];

						}

						$scope.datoMedia = ($scope.media/contador);
						$scope.datoMedia = $scope.datoMedia.toString();
						
						if($scope.datoMedia.length>4){
							$scope.datoMedia= $scope.datoMedia.substr(0,4);
							
						}
						


						document.getElementById("cargandoPreguntas").classList.remove("visible");
							document.getElementById("cargandoPreguntas").classList.add("noVisible");	

							document.getElementById("grafica").classList.remove("noVisible");
							document.getElementById("grafica").classList.add("visible");	



					}
				});





			} else {
				$location.path( "login" );
			}
		});






	})

})();