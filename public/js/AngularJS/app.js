(function() {
    var app = angular.module('ekosave-registro', ['estadisticasControllers','edicionController','datosControllers' ,'recuperarControllers' ,'usuariosControllers', 'preguntasControllers' ,'webMainControllers','detalleSenoControllers' , 'detalleCervixControllers' ,'loginControllers','ngRoute', 'firebase', "ngMessages"]);
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: "views/login/main.html",
            controller: 'loginMainController',
        }).when('/edicionPerfil', {
            templateUrl: "views/edicion/main.html",
            controller: 'edicionMainController',
        }).when('/recuperar', {
            templateUrl: "views/login/recuperar.html",
            controller: 'recuperarController',
        }).when('/preguntas', {
            templateUrl: "views/preguntas/main.html",
            controller: 'preguntasMainController',
        })
        .when('/preguntas/detalleCervix', {
            templateUrl: "views/preguntas/detalleCervix.html",
            controller: 'detalleCervixMainController',
        })
        .when('/preguntas/detalleSeno', {
            templateUrl: "views/preguntas/detalleSeno.html",
            controller: 'detalleSenoMainController',
        })
        .when('/usuarios', {
            templateUrl: "views/usuarios/main.html",
            controller: 'usuariosMainController'
        })
        .when('/estadisticas', {
            templateUrl: "views/estadisticas/main.html",
            controller: 'estadisticasMainController'
        })

        .when('/datos', {
            templateUrl: "views/datos/datos.html",
            controller: 'datosMainController'
        })

        .when('/inicio', {
            templateUrl: "views/web/main.html",
            controller: 'webMainController',
        }).otherwise({
            redirectTo: '/'
        })
    }]);
    app.factory("transacciones", function() {
        var botonAmpliacion = "none";
        var interfaz = {
            cambiarBotonAmpliacion: function(entrada) {
                botonAmpliacion = 1;
            },
            getCambiarBotonAmpliacion: function() {
                return botonAmpliacion;
            }
        }
        return interfaz;
    });


    app.factory("messageService", function($q){
        return {
            getMessage: function(){
                return $q.when("Hello World!");
            }
        };
    })
    app.controller('mainController', function($scope, $window, $route, $mdDialog, $mdMedia, $mdToast , $timeout, $location, $mdSidenav, $timeout, transacciones) {


        jQuery(document).keyup(function(e){
            if(e.keyCode==27){
                console.log("esap");

                return false;
            }
        });


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
                console.log(pos);
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



        var llegada=  firebase.database().ref('datosDescarga'). on('value', function(data) {

            $scope.documentos = data.val();

            $scope.datos=[];
            for(documento in $scope.documentos){
                console.log($scope.documentos[documento]);
                $scope.datos.push($scope.documentos[documento]);
            }

            $scope.$apply();
        });



        $scope.informacionUsuario = {};
        $scope.informacionUsuario.parentProperty = "";
        $scope.imagenNav = {};
        $scope.imagenNav.parentProperty = "http://40.71.81.33/fundacancer/public/img/amateLogoSolo.png";
        $scope.nombreUsuario = {};
        $scope.nombreUsuario.parentProperty = "";
        $scope.mostrarMenuHeader = {};
        $scope.mostrarMenuHeader.parentProperty = "none";
        $scope.prueba = {};
        $scope.prueba.parentProperty = "none";

        window.onresize = function(){ 

            if (window.matchMedia("(orientation: portrait)").matches) {
                console.log("v");
            }

            if (window.matchMedia("(orientation: landscape)").matches) {
                console.log("h");    
            }
        } 


        $scope.logOut = function() {
            firebase.auth().signOut().then(function() {
                $location.path("login");
                location.reload();
            }, function(error) {

            });
        } 


      



        $scope.cambiarEstado = function(){

            var es = firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var llegada=  firebase.database().ref('administracion/'+user.uid). once('value').then(function(datos) {




                        console.log("llega desde administracion");
                        console.log(datos.val());

                        if(datos.val()==  null){
                          console.log("        no es admin" );
                          $location.path("login");
                          $scope.$apply();
                      }




                      if(datos.val()!==  null){

                        $scope.perfil=datos.val().profile;


                        console.log("no fue nulo el admin");
                        console.log(datos);

                        if (user.providerData[0].providerId == "facebook.com") {

                            $scope.imagenNav.parentProperty = "https://graph.facebook.com/" + user.providerData[0].uid + "/picture?height=500";
                            $scope.nombreUsuario.parentProperty = "" + user.providerData[0].displayName;
                        } else {

                            $scope.imagenNav.parentProperty = "http://40.71.81.33/fundacancer/public/img/amateLogoSolo.png";
                            $scope.nombreUsuario.parentProperty = "" + user.providerData[0].uid;
                        }
                        $scope.mostrarMenuHeader.parentProperty = "block";

                        $scope.botonAmpliacion = "initial";


                        transacciones.cambiarBotonAmpliacion("jeje");
                        $scope.informacionUsuario.parentProperty = user;
                        $scope.prueba.parentProperty = "initial";

                        $scope.botonAmpliacion = transacciones.getCambiarBotonAmpliacion();
                        $scope.botonAmpliacion = "ddd";



                        $scope.user = user;

                        $scope.estadoo = $mdSidenav('left').isOpen();;

                        if ($scope.estadoo == false) {
                            $mdSidenav("left").toggle();

                            console.log("abriendo menu");
                        }
                        $("#nav").css("display", "");
                        $("#cuerpo").addClass("cuerpoWeb");



                        $scope.abriendoMenu = "colapsado";

                        $scope.abriendo = function(location) {

                            if ($scope.abriendoMenu == "colapsando") {
                                $scope.abriendoMenu = "colapsado";
                            } else {
                                $scope.abriendoMenu = "colapsando";
                            }
                        }
                        $scope.openMenu = function($mdOpenMenu, ev) {

                            $scope.$on("$mdMenuClose", function() {
                                console.log("menu closing");
                            });
                            originatorEv = ev;
                            $mdOpenMenu(ev);
                        };

                        $scope.goSeccion = function(location) {
                            $location.path("" + location);
                        }


                        $scope.toggleLeft = buildToggler('left');
                        $scope.toggleRight = buildToggler('right');
                        $scope.isSidenavOpen = true;
                        $timeout(function() {}, 25);
                        buildToggler();
                        $scope.openNav = true;
                        $scope.estado = function estado() {
                            if ($scope.openNav == true) {
                                console.log("0");
                                $scope.openNav = false;
                                $("#cuerpo").removeClass("cuerpoWeb");
                            } else {
                                console.log("c");
                                $scope.openNav = true;
                                $("#cuerpo").addClass("cuerpoWeb");
                            }
                        }
                        $scope.edicionDatos = function(ev, i) {
                            $location.path("edicionPerfil");
                        }


                        function buildToggler(componentId) {

                            if (componentId = "left") {} else {}
                                $("#cuerp").addClass("cuerpo");
                            return function() {
                                $mdSidenav("left").toggle();
                            };
                        }

                    }

                });




} else {

    console.log("        no es admin" );
    $location.path("login");
}
});
}


})
})();