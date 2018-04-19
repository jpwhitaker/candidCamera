var fs = require('fs')
var express = require('express');
var socket = require("socket.io");
var app = express();

//triggered by phone going to site
//sends take pic signal via sockets
//tessel sends back pic and we save to disk
//respond to request after save

var globalSocket;
var globalRes;

var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000')
})

app.get('/', function (req, res) {
  console.time('get/');
  globalRes = res;
  takePicture();
})

//socket setup
var io = socket(server);

io.on('connection', function(socket){
  globalSocket = socket;
  console.log(`Made socket connection to id ${socket.id}`)
})

var takePicture = () => {
  globalSocket.emit('takePicture', true);
}

app.post('/upload', function(request, res) {
  console.log('saving pic');
  var fileName = __dirname + `/public/${Date.now()}.jpg`;
  request.pipe(fs.createWriteStream(__dirname + `/public/${Date.now()}.jpg`))
  .on('finish', function(){
    console.log("ENDING");
    globalRes.sendFile(fileName);
    res.sendStatus(200);
    console.timeEnd('get/');
  });
});