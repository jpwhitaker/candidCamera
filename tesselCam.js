var av = require('tessel-av');
var os = require('os');
var fs = require('fs');
var http = require('http');
const path = require('path');
// var express = require('express');
var socket = require("socket.io");
const io = require('socket.io-client');
var camera = new av.Camera();
var takeImage;

var socket = io.connect("http://192.168.0.6:4000/");
console.log('should have connection')
// console.log(socket);


socket.on('takePicture', function(data){
  //1. take pic
  //2. send pic
  const dir = path.join(__dirname, `captures/`)
  
  var fileNum = 0

  //get directory and file number
  fs.readdir(dir, (err, files) => {
    if (files == undefined){
      //make directory
      fs.mkdirSync( path.join( __dirname, `captures/`) );
    } else {
      fileNum = files.length;
    }

    //call image capture
    takeImage();
  });

  //https://stackoverflow.com/questions/28007514/piping-stream-to-a-variable-or
  //assuming camera.capture is a readable stream because it pipes(response) in demo
  takeImage = function(){
    const capture = camera.capture();

    capture.on('data', function(data) {
      console.log(path.join(__dirname, `captures/${fileNum}.jpg`))
      fs.writeFile(path.join(__dirname, `captures/${fileNum}.jpg`), data);
    });

    capture.on('end', function(){
      console.log('wrote file')
    })

  }




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