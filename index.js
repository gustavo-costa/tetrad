//var app = require('express')();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/'));
app.use('/', express.static(__dirname + '/public'));
var beatArray = [1,2,3,4,5,6,7,8];
var currentBeat = 0;
var i;

(setInterval(function(){
    if(currentBeat < 8){
      currentBeat++;
      io.emit('pulse');
      //console.log(currentBeat);
    } else {
      currentBeat = 1;
      //console.log(currentBeat);
    }
    if(currentBeat === 1){
      io.emit('sync');
    }
    io.emit('beat',currentBeat);
  },500));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(s){
    console.log('a user connected');
    io.emit('beat',currentBeat);
    s.on('disconnect', function(){
      console.log('user disconnected');
    });
});
// io.on('beat', function(){
//   io.emit('beat', currentBeat);
// });
//var port = 3000;
var port = process.env.PORT;
http.listen(port, function(){
  console.log('listening on *: '+port);
});
