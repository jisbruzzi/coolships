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
	})
})
