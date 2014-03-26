 angular.module('uiRouterSample')
 .controller('socketController2', function ($scope, socket) {
     $scope.time = "Nothing Here"

    $scope.connectChat = function(){
      console.log("Connecting to chat...")
      // socket.socket.connect();
      socket.connect();
    }

    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
    // socket.disconnect();
    // socket.removeListener()
    socket.emit('disconnect')
  })
