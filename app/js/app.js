require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"RouteService":[function(require,module,exports){
module.exports=require('mxJoi8');
},{}],"mxJoi8":[function(require,module,exports){
var RouteService = module.exports = function () {
    return 'http://localhost:8080/';
};
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
'user strict';

var moduleController = angular.module('app.controllers', []);

moduleController.controller("LoginCtrl", require('./controllers/LoginCtrl'));
moduleController.controller("MainCtrl", require('./controllers/MainCtrl'));
},{"./controllers/LoginCtrl":5,"./controllers/MainCtrl":6}],5:[function(require,module,exports){
var LoginCtrl = module.exports = function ($scope, $translate) {
    $scope.email = "";
    $scope.password = "";
    $scope.rememberMe = false;
    $scope.errormsg = "";

    $scope.connexion = function () {
        $scope.errormsg = $translate('login.message.error');
    }
}
},{}],6:[function(require,module,exports){
var MainCtrl = module.exports = function ($scope) {
    $scope.messageServer = "";
    var socket = new SockJS('http://localhost:8080/message');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function(message){
            $scope.messageServer += JSON.parse(message.body).content + "\n";
            $scope.$apply();
        });
    });

    $scope.send = function () {
        console.log("envoie : " + $scope.message);
        stompClient.send("/app/message", {}, JSON.stringify({ 'content': $scope.message }));
        $scope.message ="";
    };
}
},{}],7:[function(require,module,exports){
'user strict';
var RouteService = require('RouteService');

var moduleService = angular.module('app.services', []);

moduleService.constant('SERVER_ROOT', RouteService());
},{"RouteService":"mxJoi8"}],8:[function(require,module,exports){
var LoginService = module.exports = function (SERVER_ROOT, $http, $q, $cacheFactory) {
    this._user = null;
    this._userRights = null;
    this.$http = $http;
    this.SERVER_ROOT = SERVER_ROOT;
    this.$q = $q;
};

LoginService.prototype.doLogin = function (username, password, rememberMe) {
    var _this = this;
    var data = "j_username=" + username +
        "&j_password=" + password +
        "&_spring_security_remember_me=" + rememberMe +
        "&submit=Login";
    return this.$http.post(this.SERVER_ROOT + 'j_spring_security_check', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function () {

    });
};
},{}]},{},[3,4,5,6,7,8])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9MM200Qy9XZWJzdG9ybVByb2plY3RzL0NoYXR0eV9DbGllbnQvbm9kZV9tb2R1bGVzL2dydW50LWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9MM200Qy9XZWJzdG9ybVByb2plY3RzL0NoYXR0eV9DbGllbnQvYXBwL2pzL2NvbmZpZy9kZXYvUm91dGVTZXJ2aWNlLmpzIiwiL1VzZXJzL0wzbTRDL1dlYnN0b3JtUHJvamVjdHMvQ2hhdHR5X0NsaWVudC9hcHAvanMvc3JjL2FwcGxpY2F0aW9uLmpzIiwiL1VzZXJzL0wzbTRDL1dlYnN0b3JtUHJvamVjdHMvQ2hhdHR5X0NsaWVudC9hcHAvanMvc3JjL2NvbnRyb2xsZXJzLmpzIiwiL1VzZXJzL0wzbTRDL1dlYnN0b3JtUHJvamVjdHMvQ2hhdHR5X0NsaWVudC9hcHAvanMvc3JjL2NvbnRyb2xsZXJzL0xvZ2luQ3RybC5qcyIsIi9Vc2Vycy9MM200Qy9XZWJzdG9ybVByb2plY3RzL0NoYXR0eV9DbGllbnQvYXBwL2pzL3NyYy9jb250cm9sbGVycy9NYWluQ3RybC5qcyIsIi9Vc2Vycy9MM200Qy9XZWJzdG9ybVByb2plY3RzL0NoYXR0eV9DbGllbnQvYXBwL2pzL3NyYy9zZXJ2aWNlcy5qcyIsIi9Vc2Vycy9MM200Qy9XZWJzdG9ybVByb2plY3RzL0NoYXR0eV9DbGllbnQvYXBwL2pzL3NyYy9zZXJ2aWNlcy9Mb2dpblNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUm91dGVTZXJ2aWNlID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICdodHRwOi8vbG9jYWxob3N0OjgwODAvJztcbn07IiwidmFyIGFwcCA9ICBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInLCAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsICdhcHAuY29udHJvbGxlcnMnLCAnYXBwLnNlcnZpY2VzJ10pO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAvLyBGb3IgYW55IHVubWF0Y2hlZCB1cmwsIHJlZGlyZWN0IHRvIC9zdGF0ZTFcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL1wiKTtcbiAgICAvL1xuICAgIC8vIE5vdyBzZXQgdXAgdGhlIHN0YXRlc1xuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgICAgICB1cmw6IFwiL1wiLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwidmlld3MvbG9naW4uaHRtbFwiLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCdcbiAgICAgICAgfSkuc3RhdGUoJ21haW4nLCB7XG4gICAgICAgICAgICB1cmw6IFwiL21haW5cIixcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL21haW4uaHRtbFwiLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ01haW5DdHJsJ1xuICAgICAgICB9KVxufSkuY29uZmlnKFsnJHRyYW5zbGF0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHRyYW5zbGF0ZVByb3ZpZGVyKSB7XG4gICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnByZWZlcnJlZExhbmd1YWdlKCdmcicpO1xuICAgICR0cmFuc2xhdGVQcm92aWRlci51c2VTdGF0aWNGaWxlc0xvYWRlcih7XG4gICAgICAgIHByZWZpeDogJ2xhbmd1YWdlcy8nLFxuICAgICAgICBzdWZmaXg6ICcuanNvbidcbiAgICB9KTtcbn1dKTsiLCIndXNlciBzdHJpY3QnO1xuXG52YXIgbW9kdWxlQ29udHJvbGxlciA9IGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbXSk7XG5cbm1vZHVsZUNvbnRyb2xsZXIuY29udHJvbGxlcihcIkxvZ2luQ3RybFwiLCByZXF1aXJlKCcuL2NvbnRyb2xsZXJzL0xvZ2luQ3RybCcpKTtcbm1vZHVsZUNvbnRyb2xsZXIuY29udHJvbGxlcihcIk1haW5DdHJsXCIsIHJlcXVpcmUoJy4vY29udHJvbGxlcnMvTWFpbkN0cmwnKSk7IiwidmFyIExvZ2luQ3RybCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSwgJHRyYW5zbGF0ZSkge1xuICAgICRzY29wZS5lbWFpbCA9IFwiXCI7XG4gICAgJHNjb3BlLnBhc3N3b3JkID0gXCJcIjtcbiAgICAkc2NvcGUucmVtZW1iZXJNZSA9IGZhbHNlO1xuICAgICRzY29wZS5lcnJvcm1zZyA9IFwiXCI7XG5cbiAgICAkc2NvcGUuY29ubmV4aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkc2NvcGUuZXJyb3Jtc2cgPSAkdHJhbnNsYXRlKCdsb2dpbi5tZXNzYWdlLmVycm9yJyk7XG4gICAgfVxufSIsInZhciBNYWluQ3RybCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRzY29wZSkge1xuICAgICRzY29wZS5tZXNzYWdlU2VydmVyID0gXCJcIjtcbiAgICB2YXIgc29ja2V0ID0gbmV3IFNvY2tKUygnaHR0cDovL2xvY2FsaG9zdDo4MDgwL21lc3NhZ2UnKTtcbiAgICB2YXIgc3RvbXBDbGllbnQgPSBTdG9tcC5vdmVyKHNvY2tldCk7XG4gICAgc3RvbXBDbGllbnQuY29ubmVjdCh7fSwgZnVuY3Rpb24gKGZyYW1lKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQ6ICcgKyBmcmFtZSk7XG4gICAgICAgIHN0b21wQ2xpZW50LnN1YnNjcmliZSgnL3RvcGljL21lc3NhZ2VzJywgZnVuY3Rpb24obWVzc2FnZSl7XG4gICAgICAgICAgICAkc2NvcGUubWVzc2FnZVNlcnZlciArPSBKU09OLnBhcnNlKG1lc3NhZ2UuYm9keSkuY29udGVudCArIFwiXFxuXCI7XG4gICAgICAgICAgICAkc2NvcGUuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLnNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZW52b2llIDogXCIgKyAkc2NvcGUubWVzc2FnZSk7XG4gICAgICAgIHN0b21wQ2xpZW50LnNlbmQoXCIvYXBwL21lc3NhZ2VcIiwge30sIEpTT04uc3RyaW5naWZ5KHsgJ2NvbnRlbnQnOiAkc2NvcGUubWVzc2FnZSB9KSk7XG4gICAgICAgICRzY29wZS5tZXNzYWdlID1cIlwiO1xuICAgIH07XG59IiwiJ3VzZXIgc3RyaWN0JztcbnZhciBSb3V0ZVNlcnZpY2UgPSByZXF1aXJlKCdSb3V0ZVNlcnZpY2UnKTtcblxudmFyIG1vZHVsZVNlcnZpY2UgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xuXG5tb2R1bGVTZXJ2aWNlLmNvbnN0YW50KCdTRVJWRVJfUk9PVCcsIFJvdXRlU2VydmljZSgpKTsiLCJ2YXIgTG9naW5TZXJ2aWNlID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoU0VSVkVSX1JPT1QsICRodHRwLCAkcSwgJGNhY2hlRmFjdG9yeSkge1xuICAgIHRoaXMuX3VzZXIgPSBudWxsO1xuICAgIHRoaXMuX3VzZXJSaWdodHMgPSBudWxsO1xuICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICB0aGlzLlNFUlZFUl9ST09UID0gU0VSVkVSX1JPT1Q7XG4gICAgdGhpcy4kcSA9ICRxO1xufTtcblxuTG9naW5TZXJ2aWNlLnByb3RvdHlwZS5kb0xvZ2luID0gZnVuY3Rpb24gKHVzZXJuYW1lLCBwYXNzd29yZCwgcmVtZW1iZXJNZSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGRhdGEgPSBcImpfdXNlcm5hbWU9XCIgKyB1c2VybmFtZSArXG4gICAgICAgIFwiJmpfcGFzc3dvcmQ9XCIgKyBwYXNzd29yZCArXG4gICAgICAgIFwiJl9zcHJpbmdfc2VjdXJpdHlfcmVtZW1iZXJfbWU9XCIgKyByZW1lbWJlck1lICtcbiAgICAgICAgXCImc3VibWl0PUxvZ2luXCI7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAucG9zdCh0aGlzLlNFUlZFUl9ST09UICsgJ2pfc3ByaW5nX3NlY3VyaXR5X2NoZWNrJywgZGF0YSwge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXG4gICAgfSk7XG59OyJdfQ==
