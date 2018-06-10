function barco(vida){
	let o={}
	o.vive=function(){
		return vida >0;
	}
	o.conDanio=function(danio){
		return barco(vida-danio)
	}
	o.obtenerSalud=function(){
		return vida
	}
	return o
}
module.exports=barco
