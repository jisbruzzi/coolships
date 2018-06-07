//caso general
function mejoresPartidas(turno,disparo,lanzaderas,vulnerabilidades,barcos){
    

    //obtener todas las alternativas posibles
    let alternativas = 
    disparosPosibles(lanzaderas,barcos.length)
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
        a.conDanios(vulnerabilidades.enTurno(turno),disparo)
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
let mejoresPartidasGeneral=mejoresPartidas
function mejoresPartidas(turno,disparo,lanzaderas,vulnerabilidades,barcos){
    if(turno==0){
        return partida(barcos,0)
    }else{
        return mejoresPartidasGeneral(turno,disparo,lanzaderas,vulnerabilidades,barcos)
    }
}

//versión memoizada
let mejoresPartidasNormal=mejoresPartidas
let argsAnteriores={}
function mejoresPartidas(turno,disparo,lanzaderas,vulnerabilidades,barcos){
    let args=JSON.stringify({turno,disparo,lanzaderas,vulnerabilidades,barcos})
    if(! argsAnteriores[args]){
        argsAnteriores[args]=mejoresPartidasNormal(turno,disparo,lanzaderas,vulnerabilidades,barcos)
    }
    return argsAnteriores[args]
}


//interfaz
function dinamico(lanzaderas,vulnerabilidades,barcos) {
    let t=0;
    let partidas=[]
    while (partidas.length==0 || !partidas.some((p)=>p.obtenerBarcosVivos()==0)){
        partidas=mejoresPartidas(turno,ningunDisparo(lanzaderas,barcos),lanzaderas,vulnerabilidades,barcos)//este es un buen caso inicial? o sería turno+1 ?
    }

    return partidas.filter((p)=>p.obtenerBarcosVivos()==0)
}


module.exports=dinamico