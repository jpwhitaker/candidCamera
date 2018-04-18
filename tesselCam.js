var av = require('tessel-av');
var os = require('os');
var fs = require('fs');
var http = require('http');
const path = require('path');
const axios = require('axios');
// var express = require('express');
var socket = require("socket.io");
const io = require('socket.io-client');
var camera = new av.Camera();
var takeImage;

var computerIP = "http://10.0.1.42:4000/"

var socket = io.connect(computerIP);
console.log('should have connection')

socket.on('takePicture', function(id){
  console.log('taking pic')

  var chunks = [];

  camera.capture()
    .on('data', function(chunk){
      chunks.push(chunk);
    })
    .on('end', () => {
      axios({
        method: 'POST',
        url: `${computerIP}upload?id=${id}`,
        headers: {
          'Content-Type': 'image/jpeg',
        },
        data: Buffer.concat(chunks)
      }).catch(console.error)   
  })
});





  //1. take pic
  //2. send pic
  // const dir = path.join(__dirname, `captures/`)
  // var fileNum = 0

  // //get directory and file number
  // fs.readdir(dir, (err, files) => {
  //   if (files == undefined){
  //     //make directory
  //     fs.mkdirSync( dir );
  //   } else {
  //     fileNum = files.length;
  //   }
  //   //call image capture
  //   takeImage();
  // });

  // //https://stackoverflow.com/questions/28007514/piping-stream-to-a-variable-or
  // //assuming camera.capture is a readable stream because it pipes(response) in demo
  // takeImage = function(){
  //   const capture = camera.capture();

  //   capture.on('data', function(data) {
  //     fs.writeFile(`${dir}${fileNum}.jpg`, data);
  //   });

  //   capture.on('end', function(){
  //     console.log('wrote file')
  //   })
  // }

  // socket.emit('image', "Here is the image");