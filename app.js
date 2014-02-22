var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	canWrite = false;

	var serialport = require('serialport'),
		SerialPort = serialport.SerialPort;

	server.listen(3000);

    io.set( 'log level', 1 );

	app.use(express.static(__dirname + "/public"));

	app.get('/',function(req,res){
		res.sendFile('index.html');
	});


	/*var sp = new SerialPort("/dev/tty.usbmodem1451", { 
	    baudrate : 19200,
	    parser: serialport.parsers.readline("\n")
	});

	sp.on('open', function(){

		console.log("open");

		canWrite = true;

		sp.on('data', function(data){
			console.log(data);
		});

	});*/

    var playerCount = 0;

	var players = {};
	var game = {
		arduinoKeys : [false,false,false,false]
	};

	io.sockets.on('connection', function(socket){
        
        playerCount++;
        players[socket.id] = {
            keys:[false,false,false,false]
        };

		socket.on('keys', function(data){
			players[socket.id].keys = data;
            updateKeys();
		});

		socket.on('disconnect', function(){
			delete players[socket.id];
            playerCount--;
		});

	});

	function updateKeys() {
        var qCount = 0;
        var wCount = 0;
        var oCount = 0;
        var pCount = 0;
        
		for ( var id in players) {
            
			var player = players[id];
            
            if(player.keys[0]) qCount++;
            if(player.keys[1]) wCount++;
            if(player.keys[2]) oCount++;
            if(player.keys[3]) pCount++;
                	
		}
        
        game.arduinoKeys[0] = Math.round((qCount / playerCount)) > .5 ? true : false;
        game.arduinoKeys[1] = Math.round((wCount / playerCount)) > .5 ? true : false;
        game.arduinoKeys[2] = Math.round((oCount / playerCount)) > .5 ? true : false;
        game.arduinoKeys[3] = Math.round((pCount / playerCount)) > .5 ? true : false;
    
        console.log(playerCount,game.arduinoKeys);
        var democracy = {
        	playerCount: playerCount,
        	keys: game.arduinoKeys,
        	counts:[
        		qCount,wCount,oCount,pCount
        	]
        }
        io.sockets.emit('democracy', democracy);
        
        
	}

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

		if(canWrite){
			sp.write(keyString);
		}

	}

	setInterval(function(){
		// sendToArduino([true, false, true, false]);
	}, 1000);
