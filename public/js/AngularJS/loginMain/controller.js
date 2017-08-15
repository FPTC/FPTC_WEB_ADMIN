(function() {
    var app = angular.module('loginControllers', ['angular.morris', 'ngMaterial', 'ngMessages', 'ngAnimate', 'firebase'])

    .controller('loginMainController', function($scope, $mdDialog, $mdMedia, $location, $firebaseAuth, $mdToast, $timeout, $mdSidenav) {

      var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition).filter(function(pos) {
            console.log(pos);
            return $scope.toastPosition[pos];
        }).join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }

    $scope.height = (($(window).height()) - 580) / 2;
    $(window).resize(function() {
        $scope.height = (($(window).height()) - 580) / 2;
        console.log($scope.height);

        $scope.$apply();
    });





    $scope.goRecuperar = function(ir) {
        $scope.myDate = new Date();
        $scope.isOpen = false;
        console.log(ir);
        $location.path("recuperar");
    }

    $scope.prueba.parentProperty = "none";
    $scope.emailRecuperar = "";
    $scope.botonRegistrar = true;


    $scope.validar = function() {
        if ($scope.formularioForm.$valid) {
            $scope.botonRegistrar = false;
            console.log("valido");
        } else {
            $scope.botonRegistrar = true;
            console.log("invalido");
        }
    };
    $scope.recuperar = function() {


    }



    $scope.estadoo = $mdSidenav('left').isOpen();

    console.log("estadoo es "+ $scope.estadoo);
    $("#cuerpo").removeClass("cuerpoWeb");
    console.log("removido");
    if ($scope.estadoo == true) {
        $mdSidenav("left").toggle();
    }


    $scope.goLogin = function(ir) {
        console.log(ir);
        $location.path("login");
    }
    

    $scope.displayForm = "none";
    $scope.login = function($scope, $firebaseAuth) {
        var auth = $firebaseAuth();
    };

    $scope.displayForm = "";
    $scope.formulario = [];
    $scope.formulario.envio = {
        email: "",
        password: ""
    };

    $scope.enviarDatosLogin = function(n) {
        var email = $scope.formulario.envio.email;
        var password = $scope.formulario.envio.password;
        var log =    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
            console.log(result);

            //hay que validar ahora, que este usuario tenga permiso para entrar a la aplicacion de administracion, pero se mirara luego el paso a revisar


            var llegada=  firebase.database().ref('administracion/'+result.uid). once('value').then(function(datos) {

                console.log("llega desde administracion");
                console.log(datos.val());

                if(datos.val() == null){

                    console.log("es nulo el man");
                    var pinTo = $scope.getToastPosition();
                    var toast = $mdToast.simple().textContent('Usuario invalido o sin permisos')
                    .action('Vale :(').highlightAction(true)
                    .hideDelay(5000).position(pinTo)
                    .parent(document.querySelectorAll('#toast-container'));

                    //si existe el usuario (puede veniir de la seccion de preguntas, pero no tiene los permisos necesarios (no existe en el nodo admin), le cerramos la sesion    
                    firebase.auth().signOut().then(function() {   

                      //location.reload();

                     },
                     function(error){
                       
                    });

                    $mdToast.show(toast).then(function(response) {
                        if (response == 'ok') {}
                    });
                }
                else{
                    console.log("ddd");
                     $location.path("usuarios");

                     $scope.$apply();
                   // window.location.replace("http://40.71.81.33/funcanceradmin/public/#/inicio");
                }

            });


        }).catch(function(error) {
            console.log("llega error");
            console.log(error);
            if (error) {
                console.log(error.message);
                var pinTo = $scope.getToastPosition();
                var toast = $mdToast.simple().textContent('Se ha presentado un error: usuario o contraseña invalidos. ').action('Vale :(').highlightAction(true).hideDelay(5000).position(pinTo).parent(document.querySelectorAll('#toast-container'));
                $mdToast.show(toast).then(function(response) {
                    if (response == 'ok') {}
                });
                return;
            } 
        });
    }
})


})();