const assert=require("chai").assert
const dinamico=require("../dinamico")
const vulnerabilidades=require("../vulnerabilidades")
const barco = require("../barco")

describe("Dinamico llega a alguna solucion",function(){
	it("Un solo barco, una sola lanzadera, vulnerabilidades unitarias",function(){
		let v=vulnerabilidades([[1]])
		let b=[barco(5)]
		let partidas=dinamico(1,v,b)
		assert.equal(5,partidas[0].obtenerPuntaje())
		
		assert.equal(1,partidas.length)
	})
	it("2 barcos de vida 2, una lanzadera, vulnerabilidades unitarias",function(){
		let v=vulnerabilidades([[1]])
		let b=[barco(2),barco(2)]
		let partidas=dinamico(1,v,b)
		
		assert.equal(6,partidas[0].obtenerPuntaje())
		assert.equal(2,partidas.length)
	})
	it("5 barcos de vida 1, una lanzadera, vulnerabilidades unitarias",function(){
		let v=vulnerabilidades([[1]])
		let b=[barco(1),barco(1),barco(1),barco(1),barco(1)]
		let partidas=dinamico(1,v,b)
		
		assert.equal(5+4+3+2+1,partidas[0].obtenerPuntaje())
		assert.equal(5*4*3*2*1,partidas.length)
	})
	it("1 barcos de vida 1, otro de vida 2, una lanzadera, vulnerabilidades unitarias",function(){
		let v=vulnerabilidades([[1]])
		let b=[barco(1),barco(2)]
		let partidas=dinamico(1,v,b)
		
		assert.equal(2+1+1,partidas[0].obtenerPuntaje())
		assert.equal(1,partidas.length)
	})
	it("Dos soluciones posibles",function(){
		let v=vulnerabilidades([[1]])
		let b=[barco(1),barco(1)]
		let partidas=dinamico(1,v,b)
		
		assert.equal(3,partidas[0].obtenerPuntaje())
		assert.equal(2,partidas.length)
	})
})
