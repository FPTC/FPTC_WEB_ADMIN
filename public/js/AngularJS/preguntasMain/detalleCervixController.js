(function(){

	var app = angular.module('detalleCervixControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'ngAnimate', 'ekosave-registro' ,'firebase' ])


	.controller('detalleCervixMainController' , function ($scope , $mdDialog , $q,$mdMedia , $location , $firebaseAuth , $mdToast, $timeout , $mdSidenav ) {

		$scope.goPreguntas = function(){
			$location.path( "preguntas" );
		}



		$scope.formateador = function(input) {
			return input + '%';
		};


		$scope.idPregunta = localStorage.getItem("idPreguntaDetalleCervix");

		if($scope.idPregunta != ""){

			var es=firebase.auth().onAuthStateChanged(function(user) {

				if(user){

					var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(datos) {

						if(datos.val() !== null){
							console.log("cambiando estado");
							$scope.cambiarEstado();

							var oportunidades=  firebase.database().ref('configuracion').once('value').then(function(configuracion) {

								var cantidadRondas = configuracion.val().numOpportunities;

								if(configuracion.val() != null){

									//consulto la pregunta para saber la cantidad de respuestas de la misma
									console.log("llega la configuracion");
									console.log(configuracion.val());

									var pregunta =  firebase.database().ref('preguntas/cervixCancer/'+$scope.idPregunta).once('value').then(function(pregunta) {

										if(pregunta.val() != null){

											console.log("llega la pregunta");
											console.log(pregunta.val());



											$scope.pregunta = pregunta.val();
											$scope.titulo = $scope.pregunta.text;
											//consulto el nodo respuesta para la pregunta

											document.getElementById("cargandoPreguntas").classList.remove("noVisible");
											document.getElementById("cargandoPreguntas").classList.add("visible");	

											var pregunta=  firebase.database().ref("respuestas/cervixCancer/"+$scope.idPregunta).once("value").then(function(respuestas) {

												console.log(respuestas);



												if(respuestas.val() != null){

													console.log("llega la respuestas");
													console.log(respuestas.val());

													$scope.objetoGraficas = [];
													$scope.respuestas = respuestas.val();
													


													//hay que buscar en las respuestas cuales tienen anidadas, para sacar graficas diferentes y la cantidad de anidadas para saber como mostrarlas segun el numero de las mismas
													
													var cantidadAnidadas = 0;

													$scope.objetoAnidadas = {};

													for(respuesta in $scope.pregunta.answers){

														if("question" in $scope.pregunta.answers[respuesta] ){
															
															cantidadAnidadas++;														

															//es necesario tener las claves de cada una de las respuestas que tienen anidada, para saber a cual adjuntarle la respuesta anidada

															$scope.objetoAnidadas[respuesta] = {};
															$scope.objetoAnidadas[respuesta].respuestas = {};
															$scope.objetoAnidadas[respuesta].titulo = $scope.pregunta.answers[respuesta].description+" : "+$scope.pregunta.answers[respuesta].question.text; 

															//ahora, se sacan las llaves de esta anidada, para revisarlas con las que llegan de respuestas y asignarlas

															for(llaveAnidada in $scope.pregunta.answers[respuesta].question.answers){
																$scope.objetoAnidadas[respuesta].respuestas[llaveAnidada]={};
																$scope.objetoAnidadas[respuesta].respuestas[llaveAnidada].descripcion = $scope.pregunta.answers[respuesta].question.answers[llaveAnidada].description ;
																$scope.objetoAnidadas[respuesta].respuestas[llaveAnidada].cantidad = 0;
															}

														}

													}

													console.log($scope.objetoAnidadas);
													console.log(cantidadAnidadas);



													for(ronda=0 ; cantidadRondas > ronda ; ronda++){

														$scope.objetoGraficas[ronda] = {}	

														$scope.objetoGraficas[ronda].titulo = "Ronda número "+(ronda+1);
														$scope.objetoGraficas[ronda].data = [];

														$scope.objetoContador = {};


														for (respuestaPregunta in $scope.pregunta.answers) {

															$scope.objetoContador[respuestaPregunta] = 0;
														}


														//segun la ronda, reviso la respuesta que llega en el formato respuesta[ronda] y si existe en el objetoContador, le sumo uno
														//Si no existe, quiere decir que esa respuesta del usuario ya no es una respuesta a la pregunta en cuestion, y no se suma a ningun lado
														$scope.copiaAnidada = angular.copy($scope.objetoAnidadas);
														
														for(usuario in $scope.respuestas){

															//creo una copia de anidada para cada ronda

															

															//si existe la respuesta[ronda] es que ya la contesto, si no, quisas no la ha contestado aun esa ronda

															$scope.keyRonda = "respuesta"+ronda;
															$scope.anidadaRonda = "anidada"+ronda;

															if($scope.keyRonda in $scope.respuestas[usuario]){

																console.log("usuario "+usuario+" si existe en las respuestas la ronda"+ronda+" y tiene como respuesta "+$scope.respuestas[usuario]["respuesta"+ronda]);

																//ahora, debe existir la respuesta del usuario en el objetocontador, si no, ya no es una respuesta a una opcion valida

																$scope.idRespuesta = $scope.respuestas[usuario]["respuesta"+ronda];

																console.log("se buscara en el objeto el indice "+$scope.idRespuesta);

																if($scope.idRespuesta  in $scope.objetoContador){

																	$scope.objetoContador[$scope.respuestas[usuario]["respuesta"+ronda]]= $scope.objetoContador[ $scope.respuestas[usuario]["respuesta"+ronda] ] + 1;
																}

																//ahora, se revisa si esta respuesta seleccionada tiene anidada, y se adjunta

																console.log($scope.copiaAnidada);												

																if($scope.respuestas[usuario]["respuesta"+ronda] in $scope.copiaAnidada){

																	if($scope.respuestas[usuario][$scope.anidadaRonda] in $scope.copiaAnidada[$scope.respuestas[usuario]["respuesta"+ronda]].respuestas){
																		$scope.copiaAnidada[$scope.respuestas[usuario]["respuesta"+ronda]].respuestas[$scope.respuestas[usuario][$scope.anidadaRonda]].cantidad++;
																		console.log("entro");
																	}
																}

															}else{

															}

															if(cantidadAnidadas > 0){
																$scope.objetoGraficas[ronda].anidada = $scope.copiaAnidada;	
															}



														}

														$scope.objetoGraficas[ronda].data = $scope.objetoContador;
														$scope.objetoGraficas[ronda].cantidadAnidadas = cantidadAnidadas;

														


													}

													//ahora se crea el objeto data con los datos a graficar

													console.log("objeto final ");
													console.log($scope.objetoGraficas);

													$scope.objetoRepeat = [];	

													for(ronda in $scope.objetoGraficas){

														$scope.dataChart = [];
														var contador = 0;
														$scope.objetoGraficas[ronda].dataX=[];
														
														for(respuesta in $scope.objetoGraficas[ronda].data ){

															$scope.dataChart[contador] = {y:""+$scope.pregunta.answers[respuesta].description , a: $scope.objetoGraficas[ronda].data[respuesta] }
															$scope.objetoGraficas[ronda].dataX[contador] = "Usuarios";
															contador++;
														}

														

														$scope.objetoGraficas[ronda].chartAnidadas={};
														

														for(anidada in $scope.objetoGraficas[ronda].anidada){

															$scope.objetoGraficas[ronda].chartAnidadas[anidada]={};
															$scope.objetoGraficas[ronda].chartAnidadas[anidada].titulo=""+$scope.objetoGraficas[ronda].anidada[anidada].titulo;
															$scope.objetoGraficas[ronda].chartAnidadas[anidada].dataChart=[];
															$scope.objetoGraficas[ronda].chartAnidadas[anidada].dataX=[]

															$scope.dataChartAnidada = [];

															var contador2 = 0;

															for( respuesta in $scope.objetoGraficas[ronda].anidada[anidada].respuestas ){
																$scope.dataChartAnidada[contador2] = {y:""+$scope.objetoGraficas[ronda].anidada[anidada].respuestas[respuesta].descripcion , a: $scope.objetoGraficas[ronda].anidada[anidada].respuestas[respuesta].cantidad }
																$scope.objetoGraficas[ronda].chartAnidadas[anidada].dataX[contador2] ="Usuarios";
																contador2++;
															}


															$scope.objetoGraficas[ronda].chartAnidadas[anidada].dataChart=$scope.dataChartAnidada;



														}

														$scope.objetoGraficas[ronda].dataChart = $scope.dataChart ;

													}

													//y el objeto chart para cada anidada 

													$scope.objetoRepeat = [];	

													for(ronda in $scope.objetoGraficas){

														$scope.dataChart = [];
														var contador = 0;
														$scope.objetoGraficas[ronda].dataX=[];
														
														for(respuesta in $scope.objetoGraficas[ronda].data ){

															$scope.dataChart[contador] = {y:""+$scope.pregunta.answers[respuesta].description , a: $scope.objetoGraficas[ronda].data[respuesta] }
															$scope.objetoGraficas[ronda].dataX[contador] = "Usuarios";
															contador++;
														}

														

														$scope.objetoGraficas[ronda].chartAnidadas={};
														

														for(anidada in $scope.objetoGraficas[ronda].anidada){

															$scope.objetoGraficas[ronda].chartAnidadas[anidada]={};
															$scope.objetoGraficas[ronda].chartAnidadas[anidada].titulo=""+$scope.objetoGraficas[ronda].anidada[anidada].titulo;
															$scope.objetoGraficas[ronda].chartAnidadas[anidada].dataChart=[];
															$scope.objetoGraficas[ronda].chartAnidadas[anidada].dataX=[]

															$scope.dataChartAnidada = [];

															var contador2 = 0;

															for( respuesta in $scope.objetoGraficas[ronda].anidada[anidada].respuestas ){
																$scope.dataChartAnidada[contador2] = {y:""+$scope.objetoGraficas[ronda].anidada[anidada].respuestas[respuesta].descripcion , a: $scope.objetoGraficas[ronda].anidada[anidada].respuestas[respuesta].cantidad }
																$scope.objetoGraficas[ronda].chartAnidadas[anidada].dataX[contador2] ="Usuarios";
																contador2++;
															}


															$scope.objetoGraficas[ronda].chartAnidadas[anidada].dataChart=$scope.dataChartAnidada;



														}

														$scope.objetoGraficas[ronda].dataChart = $scope.dataChart ;

													}


														$scope.$apply();

													console.log($scope.objetoGraficas);


													$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
													$scope.data = [300, 500, 100];
													
													var total={};
													var totalAnidada={};

													for(ronda in $scope.objetoGraficas){

														total[ronda]=0;

														for(datosPie in $scope.objetoGraficas[ronda].dataChart){

															total[ronda]= total[ronda] + $scope.objetoGraficas[ronda].dataChart[datosPie].a;

														}
													}


													for(ronda in $scope.objetoGraficas){

														totalAnidada	[ronda]=0;

														for(anidada in $scope.objetoGraficas[ronda].anidada){

															for(datosPie in $scope.objetoGraficas[ronda].anidada[anidada].respuestas){

																totalAnidada[ronda]= totalAnidada[ronda] + $scope.objetoGraficas[ronda].anidada[anidada].respuestas[datosPie].cantidad;

															}

														}

														
													}



													console.log(total);
													console.log(totalAnidada);



													for(ronda in $scope.objetoGraficas){

														$scope.objetoGraficas[ronda].pie= {};
														$scope.objetoGraficas[ronda].pie.total=0;
														$scope.objetoGraficas[ronda].pie.labels=[];
														$scope.objetoGraficas[ronda].pie.data=[];


														for(datosPie in $scope.objetoGraficas[ronda].dataChart){

															$scope.objetoGraficas[ronda].pie.total= $scope.objetoGraficas[ronda].pie.total + $scope.objetoGraficas[ronda].dataChart[datosPie].a;

															$scope.objetoGraficas[ronda].pie.labels.push( {label: $scope.objetoGraficas[ronda].dataChart[datosPie].y, value: (($scope.objetoGraficas[ronda].dataChart[datosPie].a/total[ronda])*100).toPrecision(4) });
															
														}
													}


													for(ronda in $scope.objetoGraficas){

														

														for(anidada in $scope.objetoGraficas[ronda].anidada){

															$scope.objetoGraficas[ronda].chartAnidadas[anidada].pie= {};
															$scope.objetoGraficas[ronda].chartAnidadas[anidada].pie.labels=[];


															for(datosPie in $scope.objetoGraficas[ronda].anidada[anidada].respuestas){

																console.log(datosPie);

																$scope.objetoGraficas[ronda].chartAnidadas[anidada].pie.labels.push( {label: $scope.objetoGraficas[ronda].anidada[anidada].respuestas[datosPie].descripcion, value: ( ($scope.objetoGraficas[ronda].anidada[anidada].respuestas[datosPie].cantidad/totalAnidada[ronda])*100).toPrecision(4) });

															}

														}

														
													}




													$scope.$apply();

													console.log($scope.objetoGraficas);

													document.getElementById("cargandoPreguntas").classList.remove("visible");
													document.getElementById("cargandoPreguntas").classList.add("noVisible");	

													

												}else{
													document.getElementById("cargandoPreguntas").classList.remove("visible");
													document.getElementById("cargandoPreguntas").classList.add("noVisible");	

													document.getElementById("nadaEncontrado").classList.remove("noVisible");
													document.getElementById("nadaEncontrado").classList.add("visible");	
												}

											});





}else{

}

});




}else{

}

});

}
else{

}

});



} else {
	$location.path( "login" );
}
});

}
else{
	$location.path( "preguntas" );
}




})

})();