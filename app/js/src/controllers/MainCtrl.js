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