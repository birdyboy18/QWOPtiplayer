// requires the arudino to be loaded with the usb keyboard bootloader

uint8_t keysend[8] = { 0 };
int port = 1;
boolean qwop[4] =  {0};


// add these togther to have multiple
#define KEY_LEFT_CTRL	0x01
#define KEY_LEFT_SHIFT	0x02
#define KEY_RIGHT_CTRL	0x10
#define KEY_RIGHT_SHIFT	0x20

void setup()                    
{
   
   Serial.begin(19200);
   delay(200);
   pinMode(2, OUTPUT);
   

   
}

void loop(){
  
    keysend[0] = 0;
    keysend[2] = 0;
    keysend[3] = 0;
    keysend[4] = 0;
    keysend[5] = 0;
    keysend[6] = 0;
    keysend[7] = 0;
    
    port = 1;
    
   // change values here 
   boolean qwop[4] =  {false,false,false,false};
 
    for (int i=0; i <= 3; i++){
      if(qwop[i]){
          check_port();
          keysend[port] = 4;
      }
      
   }
   
   boolean q = false;
   boolean w = false;
   boolean o = false;
   boolean p = false;
   
   char data;
   
   boolean vals[4] = {false, false, false, false};
   
   while(Serial.available() > 0){
    
      int incomingByte = 0;
      // read the incoming byte:
      incomingByte = Serial.read();
      
      if(incomingByte == 113){
        vals[0] = true;
        Serial.print('q');
        Serial.print(vals[0]);
        Serial.println();
      } else if(incomingByte == 119){
        vals[1] = true;
        Serial.print('w');
        Serial.print(vals[1]);
        Serial.println();  
      } else if(incomingByte == 111){
        vals[2] = true;
        Serial.print('o');
        Serial.print(vals[2]);
        Serial.println();
      } else if(incomingByte == 112){
       vals[3] = true;
       Serial.print('p');
       Serial.print(vals[3]);
       Serial.println();
      }
      Serial.println(">>>>>>>>>>>>>>>");
//      Serial.println(incomingByte);
     
   }
   
   delay(100);
  
}


void check_port(){
     switch (port) {
            case 1:
                port = 2;
            break;
            case 2:
                port = 3;
            break;
            case 3:
                port = 4;
            break;
            case 4:
                port = 5;
            break;
            case 5:
                port = 6;
            break;
            case 6:
                port = 2;
            break;
     }
}    
  
