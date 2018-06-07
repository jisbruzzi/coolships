const assert=require("chai").assert
const barco=require("../barco")

describe("Vida del barco",function(){
	it("El barco de vida 2 muere luego de 2 disparos de 1",function(){
		let b=barco(2)
		assert.isTrue(b.vive())
		let b1=b.conDanio(1)
		assert.isTrue(b1.vive())
		let m=b1.conDanio(1)
		assert.isFalse(m.vive())
	})
	it("El barco de vida 2 muere luego de 1 disparos de 2",function(){
		let b=barco(2)
		assert.isTrue(b.vive())
		let m=b.conDanio(2)
		assert.isFalse(m.vive())
	})
	it("El barco de vida 2 muere luego de 1 disparos de 5",function(){
		let b=barco(2)
		assert.isTrue(b.vive())
		let m=b.conDanio(5)
		assert.isFalse(m.vive())
	})
	it("El barco de vida 6 sobrevive 1 disparos de 5",function(){
		let b=barco(6)
		assert.isTrue(b.vive())
		let m=b.conDanio(5)
		assert.isTrue(m.vive())
	})
})
