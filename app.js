var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
    mac_control = require("mac_control");

	server.listen(8080);

    io.set( 'log level', 1 );

	app.use(express.static(__dirname + "/public"));

	app.get('/',function(req,res){
		res.sendFile('index.html');
	});

    var playerCount = 0;

	var players = {};

	var game = {
        pressed : [false,false,false,false],
		keys : [false,false,false,false]
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
        
        // set counts to 0
        var qCount = 0;
        var wCount = 0;
        var oCount = 0;
        var pCount = 0;
        
        
        // then count each player pressing a button
		for ( var id in players) {
            
			var player = players[id];
            
            if(player.keys[0]) qCount++;
            if(player.keys[1]) wCount++;
            if(player.keys[2]) oCount++;
            if(player.keys[3]) pCount++;
                	
        }
        
        // object to send to connected clients to generate bars
        var democracy = {
        	playerCount: playerCount,
        	keys: game.arduinoKeys,
        	counts:[
        		qCount,wCount,oCount,pCount
        	]
        }
        
        // then send the object
        io.sockets.emit('democracy', democracy);
        
        // now work out which keys to send to the system
        game.keys[0] = Math.round((qCount / playerCount)) > .5 ? true : false;
        game.keys[1] = Math.round((wCount / playerCount)) > .5 ? true : false;
        game.keys[2] = Math.round((oCount / playerCount)) > .5 ? true : false;
        game.keys[3] = Math.round((pCount / playerCount)) > .5 ? true : false;
        
        sendKeysToSystem();
	}

    function sendKeysToSystem(){
        
        hasKeyChanged(0,12); // q
        hasKeyChanged(1,13); // w
        hasKeyChanged(2,31); // o
        hasKeyChanged(3,35); // p
        
    }

function hasKeyChanged(index,keycode){
            if(game.keys[index]){
                if(game.pressed[index]){
                    // true -> true = no change
                    game.pressed[index] = true;
                } else {
                    // false -> true = change
                    mac_control.press(keycode);
                    game.pressed[index] = true;
                }   
            } else {
                if(game.pressed[index]){
                    // true -> false = change
                    mac_control.release(keycode);
                    game.pressed[index] = false;
                } else {
                    // false -> false = no change
                    game.pressed[index] = false;
                }   
            }
    }


function spacebar(){
    mac_control.press(49);
    mac_control.release(49);
} 

setInterval(spacebar,2000);
