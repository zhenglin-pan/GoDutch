var http = require('http')
var fs = require('fs');

var mongoose = require('mongoose')
var root = __dirname;

var config = require('./server/config/config');
require('./server/config/db')(config);

var passport = require('passport');
require('./server/config/passport')(passport);

var express = require('express');
var app = express();
require('./server/config/index')(app);

var modelsPath = root + '/server/models';
fs.readdirSync(modelsPath).forEach(function(file) {
	if (file.indexOf('.js') >= 0){
		require(modelsPath + '/'+ file);
	}
});

var server = http.createServer(app)

server.listen(app.get('port'), function (){
	console.log('App started at ' + app.get('port'));
});
