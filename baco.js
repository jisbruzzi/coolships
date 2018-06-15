const partida=require("./partida")
const disparo=require("./disparo")

/**
 * Construye la solución hacia adelante, minimizando una función de pérdida a cada paso. Al contrario de greedo, recuerda todas sus decisiones y explora un subárbol de las mejores decisiones posibles
 * @param {number} lanzaderas 
 * @param {function} vulnerabilidades 
 * @param {array} barcos 
 */
function baco(lanzaderas,vulnerabilidades,barcos){
    let inicial=partida(barcos,0)
    return obtenerMejoresDesde(inicial,0,vulnerabilidades,disparo.posibles(lanzaderas,barcos.length))
}


function obtenerMejoresDesde(partida,turno,vulnerabilidades,disparosPosibles){

    if(partida.obtenerBarcosVivos()==0){
        return [partida]
    }

    let alternativas=disparosPosibles
    .filter((d)=>partida.impactaVivos(d))
    .map((d)=>partida.conDanios(vulnerabilidades(turno),d))
    
    //quedarme con las alternativas no superadas COPY-PASTE DE dinamico.js. REFACTORIZAR?
    let mejorPuntaje=0
    let mejores=[]
    for (let a of alternativas){
        let mejorPuntajeA=a.mejorPuntajePosible(vulnerabilidades(turno))
        if(mejores.length==0 || mejorPuntaje>mejorPuntajeA){
            mejores=[a]
            mejorPuntaje=mejorPuntajeA
        }else if(mejorPuntaje==mejorPuntajeA){
            mejores.push(a)
        }
    }

    return mejores.map((a)=>{
        return obtenerMejoresDesde(a,turno+1,vulnerabilidades,disparosPosibles)
    }).reduce((a,b)=>a.concat(b),[])
}

module.exports=greedo