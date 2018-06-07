function ocultadorDeVulnerabilidades(arrayDeArrays){
    return function deTurno(turno){
        let filaElegida=arrayDeArrays[turno % arrayDeArrays.length]
        return function deBarco(barco){
            return filaElegida[barco % filaElegida.length]
        }
    }
}

module.exports=ocultadorDeVulnerabilidades