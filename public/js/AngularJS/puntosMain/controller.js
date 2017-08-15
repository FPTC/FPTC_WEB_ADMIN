(function(){

	var app = angular.module('puntosMainControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'ngAnimate', 'ekosave-registro' ,'firebase' ])


	.controller('puntosMainController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {


       $scope.regalosEnvio={};
       $scope.puntos="";

       var es=firebase.auth().onAuthStateChanged(function(user) {

        if(user){
            console.log("cambiando estado");
            $scope.cambiarEstado();



            var usuario=  firebase.database().ref('usuarios/'+user.uid). once('value').then(function(info) {

                if(info.val() != null){
                    $scope.puntos=info.val().pointsBreast + info.val().pointsCervix;
                }else{
                     $scope.puntos=0;
                }

            });


            var regalos=  firebase.database().ref('premios').once('value').then(function(regalos) {

                console.log(regalos.val());

                if(regalos.val()){



                    var regalos = regalos.val();    

                    var i = 0;

                    for(regalo in regalos){

                        console.log(regalo);

                        $scope.regalosEnvio[i] = {};
                        $scope.regalosEnvio[i].nombreRegalo = regalos[regalo].gift;
                        $scope.regalosEnvio[i].valor = regalos[regalo].points;
                        i++;
                    }
                }else{

                }

                $scope.$apply();

            });


        } else {
            $location.path( "login" );
        }
    });






   })

})();