$(document).on('ready',function(){

    var keys = [false,false,false,false];
    
    var socket = io.connect(window.location.hostname);
             
    //socket    
    
    socket.emit('tesco',{message: "Hello"});
    
        socket.on('players',function(data){
            console.log(data);
        });
    
        
    
    function sendKeyState(){
        socket.emit('keys',keys);
    }
    
    
    

});

