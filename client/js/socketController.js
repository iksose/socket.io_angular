 angular.module('uiRouterSample')
 .controller('socketController', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
  })
