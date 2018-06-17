const STRATEGY_ARGV = 3;
const FILE_ARGV = 2;
const readline = require('readline');
const fs = require('fs');
const greedo = require("./greedo.js")
const dinamico = require("./dinamico.js")

/* ships' points */
var ships = [];
var shipsPositions = [];
var numOfShips = 0;
var board = [];

main();
function main(){
  if(process.argv.length <= 3){
    console.log("Por favor, indicar como argumento: \n"
        + "\tarchivo de informacion de juego\n"
        + "\testrategia a utilizar: 'greedo' o 'dinamico'");
    return;
  }

	readFile(process.argv[FILE_ARGV]);

  //TODO indicar lanzaderas en la llamada a greedo y dinamico
  if(process.argv[STRATEGY_ARGV] == "greedo"){
    console.log("greedo chosen");
    greedo(,board,ships);
  } else if(process.argv[STRATEGY_ARGV] == "dinamico"){
    console.log("dinamico chosen");
    dinamico(,board,ships);
  }
}

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
