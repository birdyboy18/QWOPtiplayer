$(document).on('ready',function(){

    var key[false,false,false,false];
    
    var socket = io.connect();
             
        socket.emit('enter','hello');
    
        socket.on('player',function(data){
            console.log(data);
        });
    
    }

});

