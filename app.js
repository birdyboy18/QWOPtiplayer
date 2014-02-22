var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

	var SerialPort = require('serialport').SerialPort;

	server.listen(3000);

	app.use(express.static(__dirname + "/public"));

	app.get('/',function(req,res){
		res.send('Hello People');
	});

	var sp = new SerialPort("/dev/tty.usbmodemfd131", { 
	    baudrate : 9600
	});

	sp.on('open', function(){

		console.log("open");

		sp.on('data', function(data){
			console.log(data);
		});

	});