function ocultadorDeVulnerabilidades(arrayDeArrays){
    let f = function deTurno(turno){
        return function deBarco(barco,desplazamiento=0){
            //console.log((turno+desplazamiento),barco)
            let filaElegida=arrayDeArrays[(turno+desplazamiento) % arrayDeArrays.length]
            return filaElegida[barco % filaElegida.length]
        }
    }
    f.descripcion=function(){
        return arrayDeArrays
    }
    return f
}

module.exports=ocultadorDeVulnerabilidades