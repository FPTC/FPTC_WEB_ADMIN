(function(){

	var app = angular.module('detalleSenoControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'ngAnimate', 'ekosave-registro' ,'firebase', 'chart.js' ])


	.controller('detalleSenoMainController' , function ($scope , $mdDialog , $q,$mdMedia , $location , $firebaseAuth , $mdToast, $timeout , $mdSidenav ) {

		$scope.goPreguntas = function(){
			$location.path( "preguntas" );
		}
		$scope.objetoGraficas=[];
		$scope.objetoGraficas[0]={};
		$scope.objetoGraficas[0].pie={};
		$scope.objetoGraficas[0].pie.ronda={};

		$scope.options= {
			fill: false,
			datasetFill: false,
			lineTension : 0,
			pointRadius: 0
		}


		$scope.formateador = function(input) {
			return input + '%';
		};

		$scope.width="99%;"

		$scope.visiblePie="noVisible";

		$scope.idPregunta = localStorage.getItem("idPreguntaDetalleSeno");

		if($scope.idPregunta != ""){

			var es=firebase.auth().onAuthStateChanged(function(user) {

				if(user){

					var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(datos) {

						if(datos.val() !== null){
							
							$scope.cambiarEstado();

							var oportunidades=  firebase.database().ref('configuracion').once('value').then(function(configuracion) {

								var cantidadRondas = configuracion.val().numOpportunities;

								if(configuracion.val() != null){

									//consulto la pregunta para saber la cantidad de respuestas de la misma
								

									var pregunta =  firebase.database().ref('preguntas/breastCancer/'+$scope.idPregunta).once('value').then(function(pregunta) {

										if(pregunta.val() != null){

											$scope.pregunta = pregunta.val();
											$scope.titulo = $scope.pregunta.text;

										


											//consulto el nodo respuesta para la pregunta



											firebase.database().ref("respuestas/breastCancer/"+$scope.idPregunta).once("value").then(function(respuestas) {



												if(respuestas.val() != null){

												

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

															

																//ahora, debe existir la respuesta del usuario en el objetocontador, si no, ya no es una respuesta a una opcion valida

																$scope.idRespuesta = $scope.respuestas[usuario]["respuesta"+ronda];

															

																if($scope.idRespuesta  in $scope.objetoContador){

																	$scope.objetoContador[$scope.respuestas[usuario]["respuesta"+ronda]]= $scope.objetoContador[ $scope.respuestas[usuario]["respuesta"+ronda] ] + 1;
																}

																//ahora, se revisa si esta respuesta seleccionada tiene anidada, y se adjunta							
																
																if($scope.respuestas[usuario]["respuesta"+ronda] in $scope.copiaAnidada){

																	if($scope.respuestas[usuario][$scope.anidadaRonda] in $scope.copiaAnidada[$scope.respuestas[usuario]["respuesta"+ronda]].respuestas){
																		$scope.copiaAnidada[$scope.respuestas[usuario]["respuesta"+ronda]].respuestas[$scope.respuestas[usuario][$scope.anidadaRonda]].cantidad++;
																		
																	}


																}

															}else{

															}

															
															if(cantidadAnidadas > 0){
																$scope.objetoGraficas[ronda].anidada = angular.copy($scope.copiaAnidada);	
															}



														}

													

														$scope.objetoGraficas[ronda].data = $scope.objetoContador;
														$scope.objetoGraficas[ronda].cantidadAnidadas = cantidadAnidadas;

														



													}

													//ahora se crea el objeto data con los datos a graficar

													document.getElementById("cargandoPreguntas").classList.remove("visible");
													document.getElementById("cargandoPreguntas").classList.add("noVisible");	


													document.getElementById("encontrado").classList.remove("noVisible");
													document.getElementById("encontrado").classList.add("visible");	



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




													$scope.$apply();

											


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

													

																$scope.objetoGraficas[ronda].chartAnidadas[anidada].pie.labels.push( {label: $scope.objetoGraficas[ronda].anidada[anidada].respuestas[datosPie].descripcion, value: ( ($scope.objetoGraficas[ronda].anidada[anidada].respuestas[datosPie].cantidad/totalAnidada[ronda])*100).toPrecision(4) });

															}

														}

														
													}


										

													$timeout(function () {

														$scope.ngGridFIx = function() {
															window.dispatchEvent(new Event('resize'));
														}
														
														$scope.visiblePie="visible";
														$scope.width="100%;"
													}, 1000);

													



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