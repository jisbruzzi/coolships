Modificaciones que hay que hacer al informe:
-El bottleneck no es eso :( (ultimo párrafo antes de la figura 1)
-Está mal tomar esas suposiciones :( (párrafo posterior a la figura 1, y el que le sigue)

La suposición que hay que hacer es que KAOS quiere disminuir nuestro flujo lo más posible

Algoritmo propuesto:

```javascript
R=FordFulkerson(G)
aristasCorte=obtenerAristasCorte(R)//hay que obtener todas las aristas conexas a s (la fuente) (recordar que R es un grafo dirigido). Sea ese subgrafo G'. Tengo que conseguir todas las aristas que entran a G' y que no vienen de G'. Esas son las aristas del corte. La suma de las capacidades de esas aristas es igual al flujo máximo.
primeraVictima=max_{e in aristasCorte} \{ capacidad_e \}
ataques=[{flujo:flujo(R)-capacidad_primeravictima,atacada:primeraVictima}]

victima=primeraVictima
while true:
    R.cambiarCapacidad(victima,infinito) //hago infinita la capacidad de la arista que me limitaba antes
    R.repetirFlujoPor(victima)//elije uno de los augmenting path que pasan por victima y lo repite, (ya que, la vez anterior, la arista que ahora está en victima era la que causaba el bottleneck de ese augmenting path. Ahora eso no es posible)
    aristasCorte = obtenerAristasCorte(R)//acá se puede seguir recorriendo desde aristasCorte anterior, ya que el subgrafo fuertemente conexo solamente puede crecer (siempre va a haber una flecha saliente en el grafo residual, con capacidad infinita, en donde frenábamos antes) (CAPAZ, CREO QUE NO!!)(osea mirá el contraejemplo...)
    victima = max_{e in aristasCorte} \{ capacidad_e \}
    flujoNuevo = flujo(R) - capacidad_victima

    ataques.add({flujo:flujoNuevo,atacada:victima})

    if flujoNuevo es mayor a algun flujo del conjunto de ataques://(osea que va a haber 2 como mínimo)
        break
    
    if len(ataques)>2:
        ataques=los 2 mejores ataques //esto asegura que la condición de arriba sea O(1)

return los dos ataques con menor flujo del conjunto de ataques
```

# Explicacion del algoritmo propuesto
La fundamentación principal del algoritmo es el llamado _max flow-min cut theorem_, enunciado en "Algorithm Design" de Kleinberg y Tardos como la afirmación 7.9. Este teorema establece que el flujo máximo es igual a la suma de las capacidades de las aristas del corte mínimo. Así, removiendo una arista de tal corte nos aseguramos que la capacidad del corte mínimo disminuye, y por lo tanto también el flujo máximo de la red [ESTO ESTARÍA BUENO Y ES FACIL DEMOSTRARLO].

Se elige remover, en cada caso, la arista que tiene un efecto más dramático sobre el flujo máximo, es decir, aquella arista del corte mínimo con mayor capacidad. Sin embargo, remover esta arista no asegura que el flujo decaiga lo más posible, ya que podría existir un corte que -sin ser el mínimo- pueda tener todavía menor capacidad al remover la arista de mayor capacidad que posee [EXPRESAR ESTO MATEMÁTICAMENTE PQ ES UN TRABALENGUAS]. El algoritmo construído intenta apalear esta situación averiguando el menor corte mínimo que sea mayor al analizado: imposibilita que el corte analizado sea mínimo asignando una capacidad infinita a la arista atacada, y luego continúa la ejecución de Ford-Fulkerson, para luego encontrar el siguiente corte mínimo. Se especula que el siguiente corte mínimo no sea demasiado mayor al encontrado antes, y se vuelve a proceder como antes, con la esperanza de que la nueva remoción sea mejor -o no demasiado peor- respecto de la anterior.

Se procede de esta manera de forma de obtener al menos dos soluciones. Sin embargo, sin se encuentra que la siguiente solución es mejor, se continúan procesando más soluciones, con la esperanza de mejorar más a cada iteración.

## Naturaleza de heurística del algoritmo construído

El algoritmo construído no descubre las aristas que causan la mayor disminución del flujo, como muestra el siguiente ejemplo:

[ACÁ PONER contraejemplo-network-flow.jpg PERO MÁS PROLIJO]

En este caso, el algoritmo primero eliminaría el vértice de valor 30, y luego, en vez a de priorizar el corte de capacidad 66, que llevaría a un flujo máximo de 35 al remover la arista correspondiente, prioriza el corte de capacidad 62, que lleva a uno de 40.


## Complejidad de la ejecución del algoritmo

En el caso de que el algoritmo encuentre cada vez mejores aristas para remover, el ciclo terminará con la solución de flujo infinito, es decir, hará infinitas las capacidades de todas las aristas. Como el infinito es mayor que cualquier mínimo corte que se encuentre, esta es la última situación analizada posible. En este caso, itera tantas veces como aristas tenga el grafo.

Los cálculos llevados adelante en cada iteración tienen una complejidad temporal O(1), excepto por obtenerAristasCorte. obtenerAristasCorte es un recorrido BFS, con lo cual su complejidad es O(V+E). Así, la complejidad temporal del algoritmo es O((V+E)*E), es decir, O(E^2).