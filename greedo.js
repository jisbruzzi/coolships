const partida=require("./partida")
const disparo=require("./disparo")

/**
 * Construye la solución hacia adelante, minimizando una función de pérdida a cada paso
 * @param {number} lanzaderas 
 * @param {function} vulnerabilidades 
 * @param {array} barcos 
 */
function dinamica(lanzaderas,vulnerabilidades,barcos){
    let inicial=partida(barcos,0)
    return obtenerMejoresDesde(inicial,0,vulnerabilidades,disparo.posibles(lanzaderas,barcos.length))
}


function obtenerMejoresDesde(partida,turno,vulnerabilidades,disparosPosibles){
    let alternativas=disparosPosibles.map((d)=>partida.conDanios(vulnerabilidades(0)))
    
    //quedarme con las alternativas no superadas COPY-PASTE DE dinamico.js. REFACTORIZAR?
    let mejorPuntaje=0
    let mejores=[]
    for (let a of alternativas){
        if(mejores.length==0 || mejorPuntaje>a.mejorPuntajePosible()){
            mejores=[a]
            mejorPuntaje=a.mejorPuntajePosible()
        }else if(mejorPuntaje==a.mejorPuntajePosible()){
            mejores.push(a)
        }
    }


    return mejores.map((a)=>{
        return obtenerMejoresDesde(a,turno+1,vulnerabilidades,disparosPosibles)
    }).reduce((a,b)=>a.concat(b),[])
}

module.exports=dinamica