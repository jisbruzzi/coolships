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
const math = require('mathjs')

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
    output = greedo(process.argv[CANTIDAD_LANZADERAS],vulnerabilidades(board),ships);
  } else if (process.argv[STRATEGY_ARGV] == "dinamico"){
    console.log("dinamico chosen");
    output = dinamico(process.argv[CANTIDAD_LANZADERAS],vulnerabilidades(board),ships);
  }
  printOutput(output.obtenerHistorial());
}

function readFile(path){ 
  let data = fs.readFileSync(path, 'utf-8');

  let lines = data.split('\n'); 
  lines = lines.filter((line) => line.length);

  lines.forEach((line) => parseInputLine(line)); 
  board = math.transpose(board);
}

function parseInputLine(line, grafo) { 
  let values = line.split(' '); 
  var ship = new barco(values.shift());
  ships.push(ship);
  board.push(values);
}

function printOutput(out){ 
  for(i = 0; i < out.length; ++i){
    turno = i + 1;
    console.log("Turno: " + turno);
    console.log("salud barcos: " + out[i].ba);
    console.log("posicion barcos: " + out[i].pos);
    console.log("puntaje: " + out[i].pun);
    console.log("descripcion disparo: " + out[i].disp + "\n");
  }
}

