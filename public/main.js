$(document).on('ready',function(){

    var keys = [false,false,false,false];
    
    var socket = io.connect(window.location.hostname);
             
    //socket    
    
    //socket.emit('tesco',{keys:keys});
    
        socket.on('players',function(data){
            console.log(data);
        });
    
        
    
    function sendKeyState(){
        socket.emit('keys',keys);
    }
    
    
    $('#q').on('click touchstart touchend',function(event){
        
        if(event.type == "touchstart"){
        
        }
        
        sendKeyState();
    });

});

