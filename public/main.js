$(document).on('ready',function(){

    var key = [false,false,false,false];
    
    var socket = io.connect(window.location.hostname);
             
    //socket    
    
    socket.emit('tesco',{message: "Hello"});
    
        socket.on('players',function(data){
            console.log(data);
        });
    
    

});

