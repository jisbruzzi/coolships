const assert=require("chai").assert
const posicionar=require("../posicionadorGreedy")
const barco = require("../barco")
const vulnerabilidades=require("../vulnerabilidades")
const disparo=require("../disparo")
const partida=require("../partida")

describe("Probando salidas de PosiciondorGreedy",function(){
	it("varios barcos",function(){
		let barcos=[barco(5),barco(5)]
		let v = vulnerabilidades([
			//los barcos navegan hacia abajo
			[8,0],
			[1,0],
			[1,8],
			[1,0]
		])
		let barcosPosicionados=posicionar(v,barcos)

		//los barcos deben resistir 4 disparos
		let p=partida(barcosPosicionados,0)

		assert.equal(p.obtenerBarcosVivos(),2)
		p=p.conDanios(v(0),disparo.completo(2))

		assert.equal(p.obtenerBarcosVivos(),2)
		p=p.conDanios(v(1),disparo.completo(2))

		assert.equal(p.obtenerBarcosVivos(),2)
		p=p.conDanios(v(2),disparo.completo(2))

		assert.equal(p.obtenerBarcosVivos(),2)
		p=p.conDanios(v(3),disparo.completo(2))

		assert.equal(p.obtenerBarcosVivos(),0)
	})
})
