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
	return o
}
module.exports=barco
