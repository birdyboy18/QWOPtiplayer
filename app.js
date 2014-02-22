var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

	SerialPort = require('serialport').SerialPort;

	server.listen(3000);

	app.use(express.static(__dirname + "/public"));

	app.get('/',function(req,res){
		res.send("Hello People");
	});


