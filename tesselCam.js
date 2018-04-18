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