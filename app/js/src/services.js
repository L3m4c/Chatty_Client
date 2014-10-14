'user strict';
var RouteService = require('RouteService');

var moduleService = angular.module('app.services', []);

moduleService.constant('SERVER_ROOT', RouteService());