 angular.module('uiRouterSample')
 .controller('socketController2', function ($scope, socket) {
     $scope.time = "Nothing Here"
     $scope.messages = [];
     $scope.sendMsg = ""
     $scope.truthy = true;

     $scope.woops=function(){
       $scope.truthy = false
       console.log("Connecting to chat...")
       // socket.socket.connect();
       socket.connect();
       socket.emit('setNickname',{nickname: "myDefaultNickName"});
     }

     var scrollBottom = function(){
       var d = document.getElementById('readChat');
       if(d.scrollHeight > d.clientHeight) {
         d.scrollTop = d.scrollHeight - d.clientHeight;
       }
     }

    $scope.connectChat = function(){
      console.log("Connecting to chat...")
      // socket.socket.connect();
      socket.connect();
    }

    $scope.chatDismiss = function(){
      console.log("Dismissing...")
      socket.emit('disconnect')
      $scope.truthy = true;
    }

    socket.on('send:time', function (data) {
      // $scope.time = data.time;
      $scope.messages.push(data.time)
      scrollBottom()
    });

    $scope.sendMessage = function(){
      //keep chat locked to bottom
      scrollBottom()
      //make sure chat isn't blank
      if($scope.sendMsg==""){
        console.log("Cannot be empty")
      }else{
        console.log("Sending message....", $scope.sendMsg)
        $scope.sendMsg = ""
      }
    }

    socket.on('message', function(data){
      console.log("Got this....", data)
    }
    // socket.disconnect();
    // socket.removeListener()
    socket.emit('disconnect')
  })
