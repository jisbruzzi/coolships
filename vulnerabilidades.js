function ocultadorDeVulnerabilidades(arrayDeArrays){ 
  let fDeTurno = function deTurno(turno){ 
    return function deBarco(barco){ 
      let fConDesplazamiento= function conDesplazamiento(desplazamiento){ 
        let filaElegida=arrayDeArrays[(turno+desplazamiento) % 
          arrayDeArrays.length] 
          return filaElegida[barco % filaElegida.length] 
      } 
      fConDesplazamiento.tamanio=function(){ 
        return arrayDeArrays.length 
      } 
      return fConDesplazamiento 
    } 
  } 
  fDeTurno.descripcion=function(){ 
    return arrayDeArrays 
  } 
  return fDeTurno 
}

module.exports=ocultadorDeVulnerabilidades
