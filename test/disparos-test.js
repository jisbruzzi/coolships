const assert=require("chai").assert
const DisparoTodos=require("../disparo").DisparoTodos
const DisparoNulo=require("../disparo").DisparoNulo
const Disparo=require("../disparo").Disparo

describe("disparo completo",function(){
	it("disparo completo +1 = disparo competo más largo",function(){
		assert.deepEqual(new DisparoTodos(3).disparos, (new DisparoTodos(2)).conDisparoInicial().disparos)
	})
})
