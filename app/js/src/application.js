var app =  angular.module('app', ['ui.router', 'pascalprecht.translate', 'app.controllers', 'app.services']);

app.config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('login', {
            url: "/",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        }).state('main', {
            url: "/main",
            templateUrl: "views/main.html",
            controller: 'MainCtrl'
        })
}).config(['$translateProvider', function($translateProvider) {
    $translateProvider.preferredLanguage('fr');
    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
}]);