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


	var sp = new SerialPort("/dev/tty.usbmodem1411", { 
	    baudrate : 9600,
	    parser: serialport.parsers.readline("\n")
	});

	sp.on('open', function(){

		canWrite = true;

		sp.on('data', function(data){
			console.log(data);
		});

	});

	var players = {};
	var game = {
		arduinoKeys : [false, false, false, false]
	};

	io.sockets.on('connection', function(socket){
		
		socket.keys = [false,false,false,false];

		socket.on('tesco', function(data){
			players[socket.id] = data;
            console.log(data);
			socket.emit('players', players);
		});

		socket.on('keys', function(data){
			socket.keys = data;

		});

		socket.on('disconnect', function(){
			delete players[socket.id];
            io.sockets.emit('players', players);
		});

	});

	function sendToArduino(dasKeys){

		var keys = dasKeys || game.arduinoKeys,
			keyIndexes = ["q", "w", "o", "p"];
			keyString = "";

		for(var x = 0; x < keys.length; x += 1){

			switch(keys[x]){
				case true:
					keyString += keyIndexes[x];
					break;
				case false:
					keyString += "s"
					break;
			}

		}

		console.log("Hello");

		if(canWrite){
			sp.write(keyString);
		}

	}

//sendToArduino([true, true, false, true]);

setInterval(function(){
	sendToArduino();
}, 1000);
