var fs = require('fs')
var express = require('express');
var socket = require("socket.io");
var app = express();

//1. triggered by phone going to site
//2. sends take pic signal via sockets
//3. tessel sends back pic and we save to disk
//4. respond to request by sending image after save

var globalSocket;
var globalRes;

var takePicture = () => {
  globalSocket.emit('takePicture', true);
}

var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000')
})

//socket setup
var io = socket(server);
io.on('connection', function(socket){
  globalSocket = socket;
  console.log(`Made socket connection to id ${socket.id}`)
})

app.get('/', function (req, res) {
  console.time('get/');
  globalRes = res;
  takePicture();
})

app.post('/upload', function(request, res) {
  console.log('saving pic');
  var fileName = __dirname + `/public/${Date.now()}.jpg`;
  request.pipe(fs.createWriteStream(__dirname + `/public/${Date.now()}.jpg`))
  .on('finish', function(){
    globalRes.sendFile(fileName);
    res.sendStatus(200);
    console.timeEnd('get/');
  });
});