const disparo = require("./disparo")
const partida = require("./partida")
//caso general
function mejoresPartidasGeneral(turno,disparoSiguiente,lanzaderas,vulnerabilidades,barcos){
    //obtener todas las alternativas posibles
    let alternativas = 
    disparo.posibles(lanzaderas,barcos.length)
    .map(d=>
        mejoresPartidas(turno-1,d,lanzaderas,vulnerabilidades,barcos)
    )
    .reduce(
        (x,y)=>
            x.concat(y),
        []
    )
    //evaluar puntaje al agregar el disparo
    .map((a)=>
        a.conDanios(vulnerabilidades(turno),disparoSiguiente)
    )

    //quedarme con las alternativas no superadas
    let mejorPuntaje=0
    let mejores=[]
    for (let a of alternativas){
        if(mejores.length==0 || mejorPuntaje>a.obtenerPuntaje()){
            mejores=[a]
            mejorPuntaje=a.obtenerPuntaje()
        }else if(mejorPuntaje==a.obtenerPuntaje()){
            mejores.push(a)
        }
    }
    return mejores
}

//caso base
function mejoresPartidas(turno,disparo,lanzaderas,vulnerabilidades,barcos){
    if(turno==0){
        return [partida(barcos,0)]
    }else{
        return mejoresPartidasGeneral(turno,disparo,lanzaderas,vulnerabilidades,barcos)
    }
}

//versión memoizad
/*a
let mejoresPartidasNormal=mejoresPartidas
let argsAnteriores={}
function mejoresPartidas(turno,disparo,lanzaderas,vulnerabilidades,barcos){
    let args=JSON.stringify({turno,disparo,lanzaderas,vulnerabilidades,barcos})
    if(! argsAnteriores[args]){
        argsAnteriores[args]=mejoresPartidasNormal(turno,disparo,lanzaderas,vulnerabilidades,barcos)
    }
    return argsAnteriores[args]
}
*/


//interfaz
function dinamico(lanzaderas,vulnerabilidades,barcos) {
    let t=0;
    let partidas=[]
    let turnos=0
    while (partidas.length==0 || !partidas.some((p)=>p.obtenerBarcosVivos()==0)){
        partidas=mejoresPartidas(turnos,disparo.vacio(barcos.length),lanzaderas,vulnerabilidades,barcos)//este es un buen caso inicial? o sería turno+1 ?
	turnos+=1
    }

    return partidas.filter((p)=>p.obtenerBarcosVivos()==0)
}


module.exports=dinamico
