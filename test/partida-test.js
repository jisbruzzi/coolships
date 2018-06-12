const partida=require("../partida")
const assert=require("chai").assert
const barco=require("../barco")
const vulnerabilidades=require("../vulnerabilidades")
const disparo=require("../disparo")

describe("Partidas",function(){
    it("Los barcos mueren este turno",function(){
        let barcos=[
            barco(1),
            barco(1),
            barco(1),
            barco(1)
        ]
        let v=vulnerabilidades([
            [1,1,1,1]
        ])

        let p=partida(barcos,0)
        assert.equal(p.obtenerPuntaje(),4)
        assert.equal(p.obtenerBarcosVivos(),4)

        p=p.conDanios(v(0),disparo.completo(4))
        assert.equal(p.obtenerPuntaje(),4)
        assert.equal(p.obtenerBarcosVivos(),0)
    })

    

    it("Muere la mitad, porque la mitad se dispara",function(){
        let barcos=[
            barco(1),
            barco(1),
            barco(1),
            barco(1)
        ]
        let v=vulnerabilidades([
            [1,1,1,1]
        ])
        let d=disparo.completo(2).sinDisparoInicial().sinDisparoInicial()

        let p=partida(barcos,0)
        assert.equal(p.obtenerPuntaje(),4)
        assert.equal(p.obtenerBarcosVivos(),4)

        p=p.conDanios(v(0),d)
        assert.equal(p.obtenerPuntaje(),6)
        assert.equal(p.obtenerBarcosVivos(),2)

        p=p.conDanios(v(0),d)
        assert.equal(p.obtenerPuntaje(),8)
        assert.equal(p.obtenerBarcosVivos(),2)
    })

    it("Ya perdio",function(){
        let barcos=[
            barco(0),
            barco(0),
            barco(0),
            barco(0)
        ]
        let v=vulnerabilidades([
            [1,1,1,1]
        ])

        let p=partida(barcos,27)
        assert.equal(p.obtenerPuntaje(),27)
        assert.equal(p.obtenerBarcosVivos(),0)
    })
    it("Mueren la mitad, todo se dispara",function(){
        let barcos=[
            barco(5),
            barco(6),
            barco(7),
            barco(8)
        ]
        let v=vulnerabilidades([
            [8,7,6,5]
        ])

        let p=partida(barcos,1)
        assert.equal(p.obtenerPuntaje(),5)
        assert.equal(p.obtenerBarcosVivos(),4)
        
        p=p.conDanios(v(0),disparo.completo(4))
        assert.equal(p.obtenerPuntaje(),7)
        assert.equal(p.obtenerBarcosVivos(),2)

        p=p.conDanios(v(0),disparo.completo(4))
        assert.equal(p.obtenerPuntaje(),7)
        assert.equal(p.obtenerBarcosVivos(),0)
    })

    it("Mueren todos salvo el desplazado",function(){
        let barcos=[
            barco(5,1),
            barco(5),
            barco(5),
            barco(5)
        ]
        let v=vulnerabilidades([
            [10],[2],
        ])

        let p=partida(barcos,1)
        assert.equal(p.obtenerPuntaje(),5)
        assert.equal(p.obtenerBarcosVivos(),4)
        
        p=p.conDanios(v(0),disparo.completo(4))
        assert.equal(p.obtenerPuntaje(),6)
        assert.equal(p.obtenerBarcosVivos(),1)

        p=p.conDanios(v(0),disparo.completo(4))
        assert.equal(p.obtenerPuntaje(),7)
        assert.equal(p.obtenerBarcosVivos(),1)

        p=p.conDanios(v(0),disparo.completo(4))
        assert.equal(p.obtenerPuntaje(),7)
        assert.equal(p.obtenerBarcosVivos(),0)
    })
})
