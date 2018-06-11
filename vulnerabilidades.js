function ocultadorDeVulnerabilidades(arrayDeArrays){
    let f = function deTurno(turno){
        let filaElegida=arrayDeArrays[turno % arrayDeArrays.length]
        return function deBarco(barco){
            return filaElegida[barco % filaElegida.length]
        }
    }
    f.descripcion=function(){
        return arrayDeArrays
    }
    return f
}

module.exports=ocultadorDeVulnerabilidades