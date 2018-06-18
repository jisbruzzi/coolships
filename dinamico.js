const disparo = require("./disparo")
const partida = require("./partida")
//caso general
function mejoresPartidasGeneral(turno,disparoSiguiente,lanzaderas,
    vulnerabilidades,barcos){
    //obtener todas las alternativas posibles
    let alternativas = 
    disparo.posibles(lanzaderas,barcos.length)
    .map(d=>
        mejoresPartidasMemoizada(turno-1,d,lanzaderas,vulnerabilidades,barcos)
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
function mejoresPartidasConBase(turno,disparo,lanzaderas,
    vulnerabilidades,barcos){
    if(turno==0){
        return [partida(barcos,0).conDanios(vulnerabilidades(turno),disparo)]
    }else{
        return mejoresPartidasGeneral(turno,disparo,lanzaderas,
            vulnerabilidades,barcos)
    }
}

//versión memoizada
var map=new Map()
function mejoresPartidasMemoizada(turno,disparo,lanzaderas,
    vulnerabilidades,barcos){
    let llamada=[turno,disparo.descripcion(),lanzaderas,vulnerabilidades.
      descripcion(),barcos.map((b)=>b.obtenerSalud())].toString()
    if(map.has(llamada)){
        return map.get(llamada)
    }else{
        let resultado=mejoresPartidasConBase(turno,disparo,lanzaderas,
            vulnerabilidades,barcos)
        map.set(llamada,resultado)
        return resultado
    }

}


//interfaz
function dinamico(lanzaderas,vulnerabilidades,barcos) {
    let t=0;
    let partidas=[]
    let partidasAnteriores=[]
    let turnos=0
    while (partidas.length==0 || 
        !partidas.some((p)=>p.obtenerBarcosVivos()==0)){
        partidas=mejoresPartidasMemoizada(turnos,disparo.vacio(barcos.length),
            lanzaderas,vulnerabilidades,barcos)
	    turnos+=1
    }
    
    return partidas.filter((p)=>p.obtenerBarcosVivos()==0)
    
}


module.exports=dinamico
