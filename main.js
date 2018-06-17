const FILE_ARGV = 2;
const STRATEGY_ARGV = 3;
const CANTIDAD_LANZADERAS = 4;
const POSITION_SHIPS = 5;
const readline = require('readline');
const fs = require('fs');
const greedo = require("./greedo.js")
const dinamico = require("./dinamico.js")
const posicionador = require("./posicionadorGreedy.js");
const barco = require("./barco.js");
const vulnerabilidades = require("./vulnerabilidades.js");

/* ships' points */
var ships = [];
var shipsPositions = [];
var numOfShips = 0;
var board = [];
var output;

main();
function main(){
  if(process.argv.length <= 2){
    console.log("Por favor, indicar como argumento: \n"
        + "\tarchivo de informacion de juego\n");
    return;
  }

	readFile(process.argv[FILE_ARGV]);

  if(process.argv[POSITION_SHIPS] == "true"){
    posicionadosGreedy(board, ships);
  }

  if(process.argv[STRATEGY_ARGV] == "greedo"){
    console.log("greedo chosen");
    console.log(process.argv[CANTIDAD_LANZADERAS]);
    console.log(vulnerabilidades(board));
    console.log(ships);
    output = greedo(process.argv[CANTIDAD_LANZADERAS],vulnerabilidades(board),ships);
  } else if (process.argv[STRATEGY_ARGV] == "dinamico"){
    console.log("dinamico chosen");
    output = dinamico(process.argv[CANTIDAD_LANZADERAS],vulnerabilidades(board),ships);
  }
  printOutput(output);
}

function readFile(path){
  console.log('reading file...');
  const rl = readline.createInterface({
    input: fs.createReadStream(path)
  });
	rl.on('line', (line) => {
    var splitValues = line.split(' ');
    var ship = new barco(splitValues.shift());
    ships.push(ship);
    board.push(splitValues);
    ++numOfShips;
  });
}

function printOutput(out){
  console.log(out.obtenerHistorial());
}

