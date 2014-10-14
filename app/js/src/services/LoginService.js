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