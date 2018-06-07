const assert=require("chai").assert
const disparo=require("../disparo")

function disparaComo(disparo,array){
    return array
        .map((v,i)=>v==disparo.dispara(i))
        .reduce((a,b)=>a && b)
}
describe("creacion de disparos",function(){
    it("disparo completo OK",function(){
        assert.isTrue(disparaComo(disparo.completo(3),[true,true,true]))
        assert.isUndefined(disparo.completo(3).dispara(4))
    })
    it("disparo vacio OK",function(){
        assert.isTrue(disparaComo(disparo.vacio(3),[false,false,false]))
        assert.isUndefined(disparo.vacio(3).dispara(4))
    })
    it("disparo nulo OK",function(){
        assert.isUndefined(disparo.nulo().dispara(8))
        assert.isUndefined(disparo.nulo().dispara(0))
    })
})
describe("evolucion de disparos",function(){
    it("disparo completo OK",function(){
        let d = disparo.completo(2).conDisparoInicial().sinDisparoInicial()
        assert.isFalse(d.dispara(0))
        assert.isTrue(d.dispara(1))
        assert.isTrue(d.dispara(2))
        assert.isTrue(d.dispara(3))
        assert.isUndefined(d.dispara(4))
    })
    it("disparo vacio OK",function(){
        assert.isTrue(
            disparaComo(
                disparo.vacio(3)
                    .conDisparoInicial()
                    .sinDisparoInicial(),
                [false,true,false,false,false]
            )
        )
    })
    it("disparo nulo OK",function(){
        let d=disparo.nulo().conDisparoInicial().sinDisparoInicial()
        assert.isTrue(d.dispara(1))
        assert.isFalse(d.dispara(0))
        assert.isUndefined(d.dispara(2))
        
    })
})



describe("disparos posibles",function(){
    it("3, sin lanzaderas",function(){
        let ds = disparo.posibles(0,3)
        assert.lengthOf(ds,1)
        assert.isTrue(disparaComo(ds[0],[false,false,false]))
    })
    it("3, lleno de lanzaderas",function(){
        let ds = disparo.posibles(3,3)
        assert.lengthOf(ds,1)
        assert.isTrue(disparaComo(ds[0],[true,true,true]))
    })
    it("0, sin lanzaderas",function(){
        let ds = disparo.posibles(0,0)
        assert.lengthOf(ds,1)
        assert.isUndefined(ds[0].dispara(0))
    })
    it("3, una lanzadera",function(){
        let ds = disparo.posibles(1,3)
        assert.lengthOf(ds,3)
        assert.isTrue(ds.some((v)=>disparaComo(v,[false,false,true])))
        assert.isTrue(ds.some((v)=>disparaComo(v,[false,true,false])))
        assert.isTrue(ds.some((v)=>disparaComo(v,[true,false,false])))
    })
})