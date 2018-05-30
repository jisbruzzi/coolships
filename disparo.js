DisparoNulo ...

DisparoTodos ...

function disparosPosibles(lanzaderas,barcos){
    if(barcos==0){
        return [DisparoNulo(0)]
    }
    if(lanzaderas==0){
        return [DisparoNulo(barcos)]
    }
    if(lanzaderas==barcos){
        return [DisparoTodos(barcos)]
    }

    let disparosDisparoAhora=disparosPosibles(lanzaderas-1,barcos-1)
    disparosDisparoAhora=disparosDisparoAhora.map((d)=>d.conDisparoInicial())

    let disparosNoDisparoAhora=disparosPosibles(lanzaderas,barcos-1)
    disparosNoDisparoAhora=disparosNoDisparoAhora.map((d)=>d.sinDisparoInicial())
    
    return disparosDisparoAhora.concat(disparosNoDisparoAhora)
}