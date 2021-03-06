function partida(barcos,puntajeAcumulado,anterior=null,disparoAnterior=null){
    let o={}
    o.conDanios=function(danioEn,disparo){
        return partida(barcos.map((b,i)=>{
            if(disparo.dispara(i)){
                return b.conDanio(danioEn(i))
            }else{
                return b
            }
        }), o.obtenerPuntaje(),o,disparo)
    }
    o.impactaVivos=function(disparo){
        return barcos.map((b,i)=>disparo.dispara(i) && b.vive()).reduce((a,b)=>a||b,false)
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
        let descripcionDisparo=[]
        if (disparoAnterior!=null){
            descripcionDisparo=disparoAnterior.descripcion()

        }
        let miHistorial={
            ba:barcos.map((b)=>b.obtenerSalud()),
            pos:barcos.map((b)=>b.obtenerPosicion()),
            pun:o.obtenerPuntaje(),
            disp:descripcionDisparo
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
    o.mejorPuntajePosible=function(danioEn){
        return o.obtenerPuntaje()+barcos.map((b)=>b.supervivenciaMinima(danioEn)).reduce((a,b)=>a+b,0)
    }
    return o
}

module.exports=partida
