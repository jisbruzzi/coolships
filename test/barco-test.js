const assert=require("chai").assert
const barco=require("../barco").barco

describe("Vida del barco",function(){
	it("El barco de vida 2 muere luego de 2 disparos de 1",function(){
		let b=barco(2)
		assert.true(b.vive())
		let b1=b.conDanio(1)
		assert.true(b.vive())
		let m=b1.conDanio(1)
		assert.false(b.vive())
	})
})
