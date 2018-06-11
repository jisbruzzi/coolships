function ocultadorDeVulnerabilidades(arrayDeArrays){
    let fDeTurno = function deTurno(turno){
        return function deBarco(barco){
            return function conDesplazamiento(desplazamiento){
                //console.log((turno+desplazamiento),barco)
                let filaElegida=arrayDeArrays[(turno+desplazamiento) % arrayDeArrays.length]
                return filaElegida[barco % filaElegida.length]
            }
        }
    }
    fDeTurno.descripcion=function(){
        return arrayDeArrays
    }
    return fDeTurno
}

module.exports=ocultadorDeVulnerabilidades