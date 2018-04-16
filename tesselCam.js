var av = require('tessel-av');
var os = require('os');
var http = require('http');
// var express = require('express');
var socket = require("socket.io");
const io = require('socket.io-client');
var camera = new av.Camera();

var socket = io.connect("http://10.0.1.42:4000/");
console.log('should have connection')
// console.log(socket);


socket.on('takePicture', function(data){
  //1. take pic
  //2. send pic

  //https://stackoverflow.com/questions/28007514/piping-stream-to-a-variable-or
  //assuming camera.capture is a readable stream because it pipes(response) in demo
  // var readable = camera.capture().pipe(response);
  // var result;
  // //maybe able to just emit from here...
  // readable.on('data', function(chunk){
  //   result += chunk;
  // });

  // readable.on('end', function(){
  //   //send the pic
  //   socket.emit('image', { image: true, buffer: buf.toString('base64') });
  // });
  socket.emit('image', "Here is the image");



})





// //app setup
// var app = express()

// var server = app.listen(4000, function(){
//   console.log('listening to requests on port 4000')
// })

// //static serves index.html out of public
// app.use(express.static('public'))

// // (camera demoreturns a picture from webcam ()
// // app.get('/', (request, response) => {
// //   response.writeHead(200, { 'Content-Type': 'image/jpg' });
// //   camera.capture().pipe(response);
// // })


// //socket setup
// var io = socket(server);

// io.on('connection', function(socket){
//   console.log(`Made socket connection to id ${socket.id}`)

//   socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

//   //listen
//   // socket.on('chat', function(data){
//   //   io.sockets.emit('chat', data)
//   // })

// //   socket.on('typing', function(data){
// //     socket.broadcast.emit('typing', data)
// //   })


// })