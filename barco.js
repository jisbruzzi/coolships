function barco(vida,posicion=0){
	let o={}
	o.vive=function(){
		return vida >0;
	}
	o.conDanio=function(danio){
		return barco(vida-danio(posicion),posicion)
	}
	o.obtenerSalud=function(){
		return vida
	}
	o.obtenerPosicion=function(){
		return posicion
	}
	o.desplazado=function(dx){
		return barco(vida,posicion+dx)
	}
	o.obtenerDesplazamiento=function(){
		return posicion
	}
	o.supervivenciaMinima=function(danio){
		let desplazado=o.conDanio(danio).desplazado(1)
		if(desplazado.vive()){
			return 1 + desplazado.supervivenciaMinima(danio)
		}else{
			return 0
		}
	}
	return o
}
module.exports=barco
