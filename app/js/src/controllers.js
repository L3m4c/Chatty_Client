'user strict';

var moduleController = angular.module('app.controllers', []);

moduleController.controller("LoginCtrl", require('./controllers/LoginCtrl'));
moduleController.controller("MainCtrl", require('./controllers/MainCtrl'));