var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/'));
app.use('/', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/.fonts'));
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
var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *: '+port);
});
