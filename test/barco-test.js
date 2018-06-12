const assert=require("chai").assert
const barco=require("../barco")

describe("Vida del barco",function(){
	function n(x){

		return ()=>x;
	}
	it("El barco de vida 2 muere luego de 2 disparos de 1",function(){
		let uno=function(){return 1}
		let b=barco(2)
		assert.isTrue(b.vive())
		let b1=b.conDanio(n(1))
		assert.isTrue(b1.vive())
		let m=b1.conDanio(n(1))
		assert.isFalse(m.vive())
	})
	it("El barco de vida 2 muere luego de 1 disparos de 2",function(){
		let dos=function(){return 2}
		let b=barco(2)
		assert.isTrue(b.vive())
		let m=b.conDanio(n(2))
		assert.isFalse(m.vive())
	})
	it("El barco de vida 2 muere luego de 1 disparos de 5",function(){
		let b=barco(2)
		assert.isTrue(b.vive())
		let m=b.conDanio(n(5))
		assert.isFalse(m.vive())
	})
	it("El barco de vida 6 sobrevive 1 disparos de 5",function(){
		let b=barco(6)
		assert.isTrue(b.vive())
		let m=b.conDanio(n(5))
		assert.isTrue(m.vive())
	})
	it("Desplazamientos distintos dañan distinto",function(){
		function danioPos(posicion){
			return posicion
		}
		let b=barco(6,1)
		assert.isTrue(b.conDanio(danioPos).vive())
		assert.isTrue(b.desplazado(4).conDanio(danioPos).vive())
		assert.isFalse(b.desplazado(5).conDanio(danioPos).vive())
		assert.isFalse(b.desplazado(6).conDanio(danioPos).vive())
	})
})
