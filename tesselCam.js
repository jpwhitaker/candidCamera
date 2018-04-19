const av = require('tessel-av');
const axios = require('axios');
const io = require('socket.io-client');
const camera = new av.Camera();
const computerIP = "http://167.99.27.206:4000/"

const socket = io.connect(computerIP);
console.log('should have connection')

socket.on('takePicture', function(data){
  console.log('taking pic')
  var chunks = [];
  camera.capture()
  .on('data', function(chunk){
    chunks.push(chunk);
  })
  .on('end', () => {
    axios({
      method: 'POST',
      url: `${computerIP}upload`,
      headers: {
        'Content-Type': 'image/jpeg',
      },
      data: Buffer.concat(chunks)
    }).catch(console.error)   
  })
});