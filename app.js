var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	canWrite = false;

	var serialport = require('serialport'),
		SerialPort = serialport.SerialPort;

	server.listen(3000);

	app.use(express.static(__dirname + "/public"));

	app.get('/',function(req,res){
		res.send('Hello People');
	});

	var port = /*"/dev/tty.usbmodemfd131"*/ "/dev/tty.usbmodem1411"

	var sp = new SerialPort(port, { 
	    baudrate : 9600,
	    parser: serialport.parsers.readline("\n")
	});

	sp.on('open', function(){

		console.log("open");

		sp.on('data', function(data){
			console.log(data);
		});

	});

	