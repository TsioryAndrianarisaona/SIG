let AppRoute=angular.module("Route",["ngRoute"]);
AppRoute.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'view/carte.html',
        controller:'carteService'
    })
    .otherwise({redirectTo:'/'}); 
});