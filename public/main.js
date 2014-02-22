$(document).on('ready',function(){
    
    
    
    
    /////////////////

    var keys = [false,false,false,false];
    
    var socket = io.connect(window.location.hostname);
             
    //socket    
    
    //socket.emit('tesco',{keys:keys});
    
    socket.on('players',function(data){
        console.log(data);
    });
    
    socket.on('democracy',function(data){
         console.log(data);
    });
    
    function sendKeyState(){
        socket.emit('keys',keys);
    }
    
    
    $('#q').on('mousedown mouseup touchstart touchend',function(event){
        
        if(event.type == "touchstart" || event.type == "mousedown"){
            keys[0] = true;
        } else if (event.type == "touchend" || event.type == "mouseup"){
            keys[0] = false;
        }
        
        sendKeyState();
    });
    
    $('#w').on('mousedown mouseup touchstart touchend',function(event){
        
        if(event.type == "touchstart" || event.type == "mousedown"){
            keys[1] = true;
        } else if (event.type == "touchend" || event.type == "mouseup"){
            keys[1] = false;
        }
        
        sendKeyState();
    });
    
    $('#o').on('mousedown mouseup touchstart touchend',function(event){
        
        if(event.type == "touchstart" || event.type == "mousedown"){
            keys[2] = true;
        } else if (event.type == "touchend" || event.type == "mouseup"){
            keys[2] = false;
        }
        
        sendKeyState();
    });
    
    $('#p').on('mousedown mouseup touchstart touchend',function(event){
        
        if(event.type == "touchstart" || event.type == "mousedown"){
            keys[3] = true;
        } else if (event.type == "touchend" || event.type == "mouseup"){
            keys[3] = false;
        }
        
        sendKeyState();
    });

});

