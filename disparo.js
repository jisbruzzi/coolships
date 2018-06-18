function disparo(arrayDeDisparos){
    let o={}
    function conInicial(v){
        return disparo([v].concat(arrayDeDisparos))
    }
    o.conDisparoInicial=function(){
        return conInicial(true)
    }
    o.sinDisparoInicial=function(){
        return conInicial(false)
    }
    o.dispara=function(v){
        return arrayDeDisparos[v]
    }
    o.descripcion=function(){
        return arrayDeDisparos.concat([])
    }
    return o;
}

function disparoIgual(barcos,disparan){
    let disparos=Array.apply(null,Array(barcos)).map((d,i)=>disparan)
    
	return disparo(disparos)
}

function disparoNulo(){
	return disparo([])
}

function disparoVacio(barcos){
	return disparoIgual(barcos,false)
}

function disparoCompleto(barcos){
	return disparoIgual(barcos,true)
}

function disparosPosibles(lanzaderas,barcos){
    if(barcos==0){
        return [disparoNulo()]
    }
    if(lanzaderas==0){
        return [disparoVacio(barcos)]
    }
    if(lanzaderas==barcos){
        return [disparoCompleto(barcos)]
    }

    let disparosDisparoAhora=disparosPosibles(lanzaderas-1,barcos-1)
    disparosDisparoAhora=disparosDisparoAhora.map((d)=>d.conDisparoInicial())

    let disparosNoDisparoAhora=disparosPosibles(lanzaderas,barcos-1)
    disparosNoDisparoAhora=disparosNoDisparoAhora.map((d)=>d.
        sinDisparoInicial())
    
    return disparosDisparoAhora.concat(disparosNoDisparoAhora)
}


module.exports.nulo=disparoNulo
module.exports.vacio=disparoVacio
module.exports.completo=disparoCompleto
module.exports.posibles=disparosPosibles

