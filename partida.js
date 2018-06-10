function partida(barcos,puntajeAcumulado,anterior=null){
    let o={}
    o.conDanios=function(danioEn,disparo){
        return partida(barcos.map((b,i)=>{
            if(disparo.dispara(i)){
                return b.conDanio(danioEn(i))
            }else{
                return b
            }
        }), o.obtenerPuntaje(),o)
    }
    o.obtenerBarcosVivos=function(){
        return barcos.map(b=>{
            if(b.vive()){
                return 1
            }else{
                return 0
            }
        }).reduce((a,b)=>{
            return a+b
        },0)
    }
    o.obtenerPuntaje=function(){
	return o.obtenerBarcosVivos()+puntajeAcumulado;
    }
    o.obtenerHistorial=function(){
	let miHistorial={
		barcos:barcos.map((b)=>b.obtenerSalud()),
		puntaje:o.obtenerPuntaje()
	}
	if(anterior==null){
		return [miHistorial]
	}else{
		return anterior.obtenerHistorial().concat([miHistorial])
	}
    }
    o.obtenerAnterior=function(){
	return anterior
    }
    return o
}

module.exports=partida
