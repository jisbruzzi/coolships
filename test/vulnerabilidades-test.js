const assert=require("chai").assert
const vulnerabilidades=require("../vulnerabilidades")

describe("Probar la creacion de ocultamiento de vulnerabilidades",function(){
    it("un solo turno",function(){
        let fila=[4,5]
        let v=vulnerabilidades([fila])

        //fila 0
        assert.equal(v(0)(0)(0),4)
        assert.equal(v(0)(1)(0),5)
        assert.equal(v(0)(2)(0),4)
        assert.equal(v(0)(3)(0),5)

        //fila 0, desplaza 1
        assert.equal(v(0)(0)(1),4)
        assert.equal(v(0)(1)(1),5)
        assert.equal(v(0)(2)(1),4)
        assert.equal(v(0)(3)(1),5)

        //fila 1
        assert.equal(v(1)(0)(0),4)
        assert.equal(v(1)(1)(0),5)
        assert.equal(v(1)(2)(0),4)
        assert.equal(v(1)(3)(0),5)

        //fila 2
        assert.equal(v(2)(0)(0),4)
        assert.equal(v(2)(1)(0),5)
        assert.equal(v(2)(2)(0),4)
        assert.equal(v(2)(3)(0),5)
    })

    it("un solo barco",function(){
        let v=vulnerabilidades([[4],[8],[15]])

        //barco 0 
        assert.equal(v(0)(0)(0),4)
        assert.equal(v(1)(0)(0),8)
        assert.equal(v(2)(0)(0),15)

        //barco 0 
        assert.equal(v(0)(0)(300),4)
        assert.equal(v(1)(0)(300),8)
        assert.equal(v(2)(0)(300),15)

        //barco 15
        assert.equal(v(0)(15)(0),4)
        assert.equal(v(1)(15)(0),8)
        assert.equal(v(2)(15)(0),15)
        
    })

    it("2 turnos y 2 barcos",function(){
        let v=vulnerabilidades([[0,1],[7,8]])

        //fila 0
        assert.equal(v(0)(0)(0),0)
        assert.equal(v(0)(1)(0),1)
        assert.equal(v(0)(2)(0),0)
        assert.equal(v(0)(3)(0),1)

        //fila 0, desplazado 1
        assert.equal(v(0)(0)(1),7)
        assert.equal(v(0)(1)(1),8)
        assert.equal(v(0)(2)(1),7)
        assert.equal(v(0)(3)(1),8)

        //fila 1
        assert.equal(v(1)(0)(0),7)
        assert.equal(v(1)(1)(0),8)
        assert.equal(v(1)(2)(0),7)
        assert.equal(v(1)(3)(0),8)

        //fila 2
        assert.equal(v(2)(0)(0),0)
        assert.equal(v(2)(1)(0),1)
        assert.equal(v(2)(2)(0),0)
        assert.equal(v(2)(3)(0),1)

        //fila 3
        assert.equal(v(3)(0)(0),7)
        assert.equal(v(3)(1)(0),8)
        assert.equal(v(3)(2)(0),7)
        assert.equal(v(3)(3)(0),8)
    })
})
