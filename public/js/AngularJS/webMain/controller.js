(function(){

	var app = angular.module('webMainControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'ngAnimate', 'funcancer' ,'firebase' ])


	.controller('webMainController' , function ($scope  , $mdDialog, $mdMedia, $location , registrarCliente, $firebaseAuth, $mdToast,  $timeout , $mdSidenav,transacciones ) {


   

    var es=firebase.auth().onAuthStateChanged(function(user) {

      if(user){



      	console.log("cambiando estado");
      $scope.cambiarEstado();
       

      } else {
       $location.path( "login" );
     }
   });



})

})();