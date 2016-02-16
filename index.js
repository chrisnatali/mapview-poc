var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var layers = require('./layers');
var views = require('./views');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.path);
  next();  
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/layers', function(req, res) { 
  var layer = req.body;
  layers[layer.id] = layer;
  res.send(layers);
});
  
app.get('/layers', function(req, res) {
  res.send(layers);
});

app.post('/views', function(req, res) { 
  var view = req.body;
  views[view.id] = view;
  res.send(views);
});
  
app.get('/views', function(req, res) {
  res.send(views);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
