const assert=require("chai").assert
const vulnerabilidades=require("../vulnerabilidades")

describe("Probar la creacion de ocultamiento de vulnerabilidades",function(){
    it("un solo turno",function(){
        let fila=[4,5]
        let v=vulnerabilidades([fila])

        //fila 0
        assert.equal(v(0)(0),4)
        assert.equal(v(0)(1),5)
        assert.equal(v(0)(2),4)
        assert.equal(v(0)(3),5)

        //fila 1
        assert.equal(v(1)(0),4)
        assert.equal(v(1)(1),5)
        assert.equal(v(1)(2),4)
        assert.equal(v(1)(3),5)

        //fila 2
        assert.equal(v(2)(0),4)
        assert.equal(v(2)(1),5)
        assert.equal(v(2)(2),4)
        assert.equal(v(2)(3),5)
    })

    it("un solo barco",function(){
        let v=vulnerabilidades([[4],[8],[15]])

        //barco 0 
        assert.equal(v(0)(0),4)
        assert.equal(v(1)(0),8)
        assert.equal(v(2)(0),15)

        //barco 15
        assert.equal(v(0)(15),4)
        assert.equal(v(1)(15),8)
        assert.equal(v(2)(15),15)
        
    })

    it("2 turnos y 2 barcos",function(){
        let v=vulnerabilidades([[0,1],[7,8]])

        //fila 0
        assert.equal(v(0)(0),0)
        assert.equal(v(0)(1),1)
        assert.equal(v(0)(2),0)
        assert.equal(v(0)(3),1)

        //fila 1
        assert.equal(v(1)(0),7)
        assert.equal(v(1)(1),8)
        assert.equal(v(1)(2),7)
        assert.equal(v(1)(3),8)

        //fila 2
        assert.equal(v(2)(0),0)
        assert.equal(v(2)(1),1)
        assert.equal(v(2)(2),0)
        assert.equal(v(2)(3),1)

        //fila 3
        assert.equal(v(3)(0),7)
        assert.equal(v(3)(1),8)
        assert.equal(v(3)(2),7)
        assert.equal(v(3)(3),8)
    })
})
