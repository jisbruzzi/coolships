const assert=require("chai").assert
const DisparoTodos=require("../disparo").DisparoTodos
const DisparoNulo=require("../disparo").DisparoNulo

describe("disparo completo",function(){
	it("disparo completo +1 = disparo competo m√s largo",function(){
		assert.equal(new DisparoTodos(3), (new DisparoTodos(2)).conDisparoInicial())
	})
})
