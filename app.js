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
		res.sendFile('index.html');
	});


	/*var sp = new SerialPort("/dev/tty.usbmodemfd131", { 
	    baudrate : 9600,
	    parser: serialport.parsers.readline("\n")
	});

	sp.on('open', function(){

		console.log("open");

		sp.on('data', function(data){
			console.log(data);
		});

	});*/

	var players = {};
	var game = {};

	io.sockets.on('connection', function(socket){
		
		socket.keys = [false,false,false,false];

		socket.on('tesco', function(data){
			players[socket.id] = data;
            console.log(data);
			socket.emit('players', players);
		});

		socket.on('disconnect', function(){
			delete players[socket.id];
            io.sockets.emit('players', players);
		});

	});

