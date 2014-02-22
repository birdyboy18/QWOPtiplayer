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

<<<<<<< HEAD
	var port = /*"/dev/tty.usbmodemfd131"*/ "/dev/tty.usbmodem1411"

	var sp = new SerialPort(port, { 
=======
	/*var sp = new SerialPort("/dev/tty.usbmodemfd131", { 
>>>>>>> e17e85fcf1f7a3d92ebba37982caedc3ad9e0fcb
	    baudrate : 9600,
	    parser: serialport.parsers.readline("\n")
	});

	sp.on('open', function(){

		console.log("open");

		sp.on('data', function(data){
			console.log(data);
		});

<<<<<<< HEAD
	});

	
=======
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
>>>>>>> e17e85fcf1f7a3d92ebba37982caedc3ad9e0fcb
