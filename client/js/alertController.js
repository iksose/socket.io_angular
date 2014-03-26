angular.module('uiRouterSample')
.controller("alertController" ,function ($scope, errors) {
  $scope.alerts = function(){
    return errors.getErrors()
  };

  $scope.addAlert = function() {
    $scope.alerts.push({msg: "Another alert!"});
  };

  // $scope.closeAlert = function(index) {
  //   $scope.alerts.splice(index, 1);
  // };

  $scope.closeAlert = function(index) {
    errors.popLast();
  };

})