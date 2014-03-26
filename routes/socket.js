/*
 * Serve content over a socket
 */

module.exports = function (socket) {

  console.log("New socket connection -- Jon")

  socket.emit('send:name', {
    name: 'Bob'
  });

  setInterval(function () {
    socket.emit('send:time', {
      time: (new Date()).toString()
    });
  }, 1000);


  socket.once('disconnect', function(){
    console.log("Disconnect called")
    socket.disconnect();
  })

  socket.on('connectPlz', function(){
    socket.emit('message', {message: "okay dude"})
  })

  socket.on('disconnect', function() {
    console.log("On disconnect fired")
  })



};
