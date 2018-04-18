var fs = require('fs')
var express = require('express');
var socket = require("socket.io");
var jpeg = require('jpeg-js');

//app setup
var app = express();
var globalSocket;

var server = app.listen(4000, function(){
  console.log('listening to requests on port 4000')
})

app.get('/', function (req, res) {
  //triggered by phone going to site
  //sends take pic signal via sockets
  //tessel sends back pic and we save
  //respond to request after save
  takePicture();

  setTimeout(function(){
    //waiting for /upload to finish
    res.sendFile(__dirname + '/public/index.html');
  },600)
})

//static serves index.html out of public
app.use(express.static('public'))

//socket setup
var io = socket(server);

io.on('connection', function(socket){
  globalSocket = socket;
  console.log(`Made socket connection to id ${socket.id}`)
  //send command to tessel to take pic
  takePicture();
})

var takePicture = () => {
  globalSocket.emit('takePicture', true);

}


app.post('/upload', function(request, res) {
  console.log('saving pic');
  request.pipe(fs.createWriteStream(__dirname + `/public/${Date.now()}.jpg`));  
  request.pipe(fs.createWriteStream(__dirname + `/public/newest.jpg`))
    .on('end', function(){
      res.sendStatus(200);
    })
});