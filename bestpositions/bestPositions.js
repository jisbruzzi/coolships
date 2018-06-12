var formidable = require('formidable');                                         
var fs = require('fs');                                                         
var express = require('express');                                               
var app = express();                                                            
var http = require('http').Server(app);                                         
var io = require('socket.io')(http);                                            
const readline = require('readline');                                           
                                                                                
const board_info_path = "board.info";                                             
var numOfShips = 0;                                                        
var numOfThrowers = 0;    // lanzaderas                                            
/* ships' points */                                                             
var ships = [];                                                                 
var shipsPositions = [];                                                        
var board = [];                                                                 
var turn = 0;                                                                   
                                                                                
app.use('/fileupload', function(req, res) {                                     
  var form = new formidable.IncomingForm();                                     
  form.parse(req, function (err, fields, files) {                               
    var oldpath = files.filetoupload.path;                                      
    fs.rename(oldpath, board_info_path, function (err) {                                   
      if (err) throw err;                                                       
      readFile(board_info_path);                                                           
      res.sendFile(__dirname + '/calc.html');                                   
    });                                                                         
  });                                                                           
});                                                                             
                                                                                
app.use(function(req, res){                                                     
  res.sendFile(__dirname + '/index.html');                                      
});                                                                             
                                                                               
io.on('connection', function(socket){                                           
  console.log('a user connected');                                              
  socket.on('disconnect', function(){                                           
    console.log('user disconnected');                                           
  });                                                                           

	socket.on('get_start_positions', function(){
		getStartPositions();                                                          
		var i;                                                                        
		var msg = '';
		for(i = 0; i < board.length; ++i){                                            
   		msg += ('Ship number: ' + (i+1) + '. Position: ' + 
																							shipsPositions[i] + '<br>');
		}   
		console.log(msg);           
		io.emit('start positions', msg);
	});
});                                                                             
                                                                                
http.listen(8080);                                                              
                     
function readFile(path){                                                        
  console.log('reading file...');                                               
  const rl = readline.createInterface({                                         
    input: fs.createReadStream(path)                                            
  });                                                                           
	rl.on('line', (line) => {
    var splitValues = line.split(' ');                                             
    ships.push(splitValues.shift());                                               
    shipsPositions[numOfShips] = 0;                                                
    board.push(splitValues);                                                       
    ++numOfShips;                                                                  
  });                                                                                
}

function getStartPositions(){                                                      
  console.log('getting start positions...');                                       
  var x;                                                                           
  for (x in board){                                                                
    shipsPositions[x] = getStartPositionForShip(x);                                
  }                                                                                
}                                                                               
                                                                                
function getStartPositionForShip(x){                                            
  console.log('processing start positions...');                                 
  /* Arrancando en cada casillero de la fila,                                   
    contar cuantos casilleros necesito hasta sumar la cantidad de puntos        
    mayor o igual a los que tiene el barco.                                     
    El casillero que me de la cantidad mas grande,                              
    gana la posicion para el barco                                              
  */                                                                            
  var currentStart;                                                             
  var definitiveStartPosition = 0;                                              
  var maxBoxesHeld = 0;                                                         
  for(currentStart = 0; currentStart < board[x].length; ++currentStart){        
    var accumulatedPoints = 0;                                                  
    var movingPointer = currentStart;                                           
    var currentDispMaxBoxHeld = 0;                                              
    while(accumulatedPoints < ships[x]){                                        
      accumulatedPoints += parseInt(board[x][movingPointer]);
      if(movingPointer == (board[x].length - 1)){                               
        movingPointer = 0;                                                      
      } else {                                                                  
        ++movingPointer;                                                        
      }                                                                         
      ++currentDispMaxBoxHeld;                                                  
    }                                                                           
    if(currentDispMaxBoxHeld > maxBoxesHeld){                                   
      maxBoxesHeld = currentDispMaxBoxHeld;                                     
      definitiveStartPosition = currentStart;                                   
    }                                                                           
  }                                                                             
  return definitiveStartPosition;                                               
}
