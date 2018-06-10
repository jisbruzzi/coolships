const assert=require("chai").assert
const dinamico=require("../dinamico")
const vulnerabilidades=require("../vulnerabilidades")
const barco = require("../barco")

describe("Dinamico llega a alguna solucion",function(){
	it("Un solo barco, una sola lanzadera, vulnerabilidades unitarias",function(){
		let v=vulnerabilidades([[1]])
		let b=[barco(5)]
		partidas=dinamico(1,v,b)
		assert.equal(5,partidas[0].obtenerPuntaje())
		console.log(partidas[0].obtenerHistorial())
		assert.equal(1,partidas.length)
	})
	it("Varios barcos, una lanzadera, vulnerabilidades unitarias",function(){
		let v=vulnerabilidades([[1]])
		let b=[barco(2),barco(2)]
		partidas=dinamico(1,v,b)
		for(let p of partidas){
			console.log(p.obtenerHistorial())
		}
		console.log(partidas[0]===partidas[1])
		console.log(partidas[0]===partidas[2])
		console.log(partidas[0]===partidas[3])
		assert.equal(6,partidas[0].obtenerPuntaje())
		assert.equal(2,partidas.length)
	})
})
