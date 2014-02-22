$(document).on('ready',function(){

    var key = [false,false,false,false];
    
    var socket = io.connect(window.location.hostname);
             
        socket.emit('enter',{message: "Hello"});
    
        socket.on('players',function(data){
            console.log(data);
        });
    
    

});

