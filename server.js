var av = require('tessel-av');
var os = require('os');
var http = require('http');
var express = require('express');
var socket = require("socket.io");
var camera = new av.Camera();
var port = 8000;

//app setup
var app = express()

var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000')
})

//static serves index.html out of public
app.use(express.static('public'))

// (camera demoreturns a picture from webcam ()
// app.get('/', (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'image/jpg' });
//   camera.capture().pipe(response);
// })


//socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log(`Made socket connection to id ${socket.id}`)

  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  //listen
  // socket.on('chat', function(data){
  //   io.sockets.emit('chat', data)
  // })

//   socket.on('typing', function(data){
//     socket.broadcast.emit('typing', data)
//   })


})