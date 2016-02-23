var express = require('express');
var app = require('express')();
var http = require('http').Server(app);

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.path);
  next();  
});

app.use(express.static('data'));
app.use(express.static(__dirname));

http.listen(3000, function(){
  console.log('listening on *:3000');
});
