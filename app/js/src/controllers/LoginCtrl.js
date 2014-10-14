var LoginCtrl = module.exports = function ($scope, $translate) {
    $scope.email = "";
    $scope.password = "";
    $scope.rememberMe = false;
    $scope.errormsg = "";

    $scope.connexion = function () {
        $scope.errormsg = $translate('login.message.error');
    }
}