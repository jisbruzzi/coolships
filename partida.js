function partida(barcos,puntajeAcumulado){
    let o={}
    o.agregarDanios=function(danioEn,disparo){
        return partida(barcos.map((b,i)=>{
            if(disparo.dispara(i)){
                return b.conDanio(danioEn(i))
            }else{
                return b
            }
        }), o.obtenerPuntaje())
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
}

module.exports=partida