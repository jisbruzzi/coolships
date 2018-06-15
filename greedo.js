const partida=require("./partida")
const disparo=require("./disparo")

/**
 * Construye la solución hacia adelante, minimizando una función de pérdida a cada paso
 * @param {number} lanzaderas 
 * @param {function} vulnerabilidades 
 * @param {array} barcos 
 */
function greedo(lanzaderas,vulnerabilidades,barcos){
    let inicial=partida(barcos,0)
    return obtenerMejorDesde(inicial,0,vulnerabilidades,disparo.posibles(lanzaderas,barcos.length))
}


function obtenerMejorDesde(partida,turno,vulnerabilidades,disparosPosibles){

    if(partida.obtenerBarcosVivos()==0){
        return partida
    }

    let mejorPartida=disparosPosibles
    .filter((d)=>partida.impactaVivos(d))
    .map((d)=>partida.conDanios(vulnerabilidades(turno),d))
    .map((p)=>{
        return {
            puntaje:p.mejorPuntajePosible(vulnerabilidades(turno)),
            partida:p
        }
    })
    .reduce((a,b)=>{
        if(a.puntaje <= b.puntaje){
            return a
        }else{
            return b
        }
    }).partida
    
    //quedarme con las alternativas no superadas COPY-PASTE DE dinamico.js. REFACTORIZAR?
    return obtenerMejorDesde(mejorPartida,turno+1,vulnerabilidades,disparosPosibles)
}

module.exports=greedo