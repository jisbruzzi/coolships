function barco(vida,posicion=0){
	let o={}
	o.vive=function(){
		return vida >0;
	}
	o.conDanio=function(danio){
		return barco(vida-danio,posicion)
	}
	o.obtenerSalud=function(){
		return vida
	}
	o.obtenerPosicion=function(){
		return posicion
	}
	return o
}
module.exports=barco
