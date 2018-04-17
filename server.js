
var express = require('express');
var socket = require("socket.io");

//app setup
var app = express()

var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000')
})

//static serves index.html out of public
app.use(express.static('public'))

//socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log(`Made socket connection to id ${socket.id}`)

  //send command to tessel to take pic
  socket.emit('takePicture', true);

  socket.on('image', function(data){
    console.log(data);
  })

  //listen
  // socket.on('chat', function(data){
  //   io.sockets.emit('chat', data)
  // })

//   socket.on('typing', function(data){
//     socket.broadcast.emit('typing', data)
//   })
})