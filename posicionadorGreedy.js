function posicionadosGreedy(vulnerabilidades,barcos){
    return barcos.map((b,i)=>{
        let desp = mejorDesplazamientoGreedy(b,vulnerabilidades(0)(i))
        return b.desplazado(desp)
    })
}

function mejorDesplazamientoGreedy(barco,danios){
    let mejorSupervivencia=0
    let mejorPosicion=-1
    for(let i=0;i<danios.tamanio();i+=1){
        let supervivenciaI=barco.desplazado(i).supervivenciaMinima(danios)
        if(supervivenciaI>mejorSupervivencia || mejorPosicion==-1){
            mejorSupervivencia=supervivenciaI
            mejorPosicion=i
        }
    }
    
    return mejorPosicion
}

module.exports=posicionadosGreedy

/*
function getStartPositions(){                                                      
    console.log('getting start positions...');                                       
    var x;                                                                           
    for (x in board){                                                                
      shipsPositions[x] = getStartPositionForShip(x);                                
    }                                                                                
  }                                                                               
                                                                                  
  function getStartPositionForShip(x){                                            
    console.log('processing start positions...');                                 
    //Arrancando en cada casillero de la fila,                                   
    //contar cuantos casilleros necesito hasta sumar la cantidad de puntos        
    //mayor o igual a los que tiene el barco.                                     
    //El casillero que me de la cantidad mas grande,                              
    //gana la posicion para el barco                                              

    
    var currentStart;                                                             
    var definitiveStartPosition = 0;                                              
    var maxBoxesHeld = 0;                                                         
    for(currentStart = 0; currentStart < board[x].length; ++currentStart){        
      var accumulatedPoints = 0;                                                  
      var movingPointer = currentStart;                                           
      var currentDispMaxBoxHeld = 0;                                              
      while(accumulatedPoints < ships[x]){                                        
        accumulatedPoints += parseInt(board[x][movingPointer]);
        if(movingPointer == (board[x].length - 1)){                               
          movingPointer = 0;                                                      
        } else {                                                                  
          ++movingPointer;                                                        
        }                                                                         
        ++currentDispMaxBoxHeld;                                                  
      }                                                                           
      if(currentDispMaxBoxHeld > maxBoxesHeld){                                   
        maxBoxesHeld = currentDispMaxBoxHeld;                                     
        definitiveStartPosition = currentStart;                                   
      }                                                                           
    }                                                                             
    return definitiveStartPosition;                                               
  }
  */