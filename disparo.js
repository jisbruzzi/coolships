funtion Disparo(barcos,disparan){
	this.disparos=(new Array(barcos)).map(()=>disparan)
	this.conDisparoInicial=function(){
		return this.conInicial(true)
	}
	this.sinDisparoInicial=function(){
		return this.conInicial(false)
	}
	this.conInicial=function(v){
		let n=new Disparo(barcos,disparan)
		n.disparos=[v].concat(this.disparos)
		return n
	}

}
function DisparoNulo(barcos){
	return new Disparo(barcos, false)
}

funtcion DisparoTodos(barcos){
	return new Disparo(barcos, true)
}

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


module.exports.DisparoNulo=DisparoNulo
module.exports.DisparoTodos=DisparoTodos

