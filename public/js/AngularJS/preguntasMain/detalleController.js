(function(){

	var app = angular.module('detalleControllers' , ['angular.morris' ,'ngMaterial', 'ngMessages' , 'ngAnimate', 'funcancer' ,'firebase' ])


	.controller('detalleMainController' , function ($scope , $mdDialog , $q,$mdMedia , $location , $firebaseAuth , $mdToast, $timeout , $mdSidenav ) {

		var es=firebase.auth().onAuthStateChanged(function(user) {

			if(user){

				

			} else {
				$location.path( "login" );
			}
		});



	})

})();