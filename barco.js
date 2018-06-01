function barco(vida){
	let o={}
	o.vive=function(){
		return vida >0;
	}
	o.conDanio=function(danio){
		return barco(vida-danio)
	}
	return o

}
