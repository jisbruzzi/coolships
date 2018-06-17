function posicionadosGreedy(vulnerabilidades,barcos){
    return barcos.map((b,i)=>{
        let desp = mejorDesplazamientoGreedy(b,vulnerabilidades(0)(i))
        return b.desplazado(desp)
    })
}

function mejorDesplazamientoGreedy(barco,danios){
    let mejorSupervivencia=0
    let mejorPosicion=-1
    for(let i=0;i<danios.tamanio();i+=1){
        let supervivenciaI=barco.desplazado(i).supervivenciaMinima(danios)
        if(supervivenciaI>mejorSupervivencia || mejorPosicion==-1){
            mejorSupervivencia=supervivenciaI
            mejorPosicion=i
        }
    }
    
    return mejorPosicion
}

module.exports=posicionadosGreedy

