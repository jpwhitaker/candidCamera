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
  takePicture();
  res.send('hello world')
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

var takePicture = () => {
  globalSocket.emit('takePicture', true);
}


app.post('/upload', function(request, respond) {
  console.log('saving pic')
  request.pipe(fs.createWriteStream(__dirname + `/public/${Date.now()}.jpg`))  
});