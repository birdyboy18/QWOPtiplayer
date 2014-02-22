var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

	var SerialPort = require('serialport').SerialPort;

	server.listen(3000);

	var players = {};
	var game = {};

	app.use(express.static(__dirname + "/public"));

	app.get('/',function(req,res){
		res.send('Hello People');
	});

	var sp = new SerialPort("/dev/tty.usbmodemfd131", { 
	    baudrate : 9600,
	    parser : '\n'
	});

	sp.on('open', function(){

		console.log("open");

		sp.on('data', function(data){
			console.log(data);

			var buf = data;
			var json = JSON.stringify(buf);
		
			console.log(json);
		});

	});

	io.sockets.on('connnection', function(socket){
		
		socket.keys = [false,false,false,false];

		socket.on('enter', function(data){
			var players[socket.id] = data;
			io.sockets.emit('players', players);
		});

		socket.on('disconnect', function(){
			delete players[socket.id];
			io.sockets.emit('players', players);
		});

	});