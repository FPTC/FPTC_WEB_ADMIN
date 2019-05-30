angular.module('accesosFactory', [])

.factory("validarAcceso", function($q,$timeout , $location , $routeParams ){
	
	return {

		token: function(){

			var defered=$q.defer();
			var promise=defered.promise;

            var es=firebase.auth().onAuthStateChanged(function(user) {

                if(user){
                    console.log("logueado");
                    defered.resolve();
                } 
                else{
                    console.log("no logueado");
                    $location.path( "login" );
                    window.location.replace("#/login"); 
                }
            });
            return promise;
        }   

    }
    
});
