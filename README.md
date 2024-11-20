# Modulo 3 Laboratorio virtual 1

## Algoritmo de busqueda implementado

Fragmento de codigo encargado de filtrar los medicos

```
searchText.addEventListener('keyup', (event) => {
  try {
    const searchTerm = event.target.value.trim();

    const filteredDoctors = doctors.filter(
      ({ name, description }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    renderDoctors(filteredDoctors);
  } catch (error) {
    alert(`Error al buscar: ${error.message}`);
  }
});
```

Por cada tecla presionada por el usuario se utiliza el metodo filter de los arreglos el cual tiene complejidad **O(n)** (lineal)

Fragmento de codigo para ordenar datos

```
function sortByFn(data, fn) {
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (fn(data[i], data[j]) > 0) {
        [data[i], data[j]] = [data[j], data[i]];
      } else if (fn(data[j], data[i]) < 0) {
        [data[j], data[i]] = [data[i], data[j]];
      }
    }
  }
}
```

Funcion utilizada para implementar el ordenamiento de los datos, en este caso se uso el algoritmo **Bubble sort** para ordenar los datos el cual tiene complejidad de **O(n^2)**

Ejemplo de uso

```
const datos = [1, 2, 3, 4, 5];
sortByFn(datos, (a, b) => b - a);
console.log(datos);
```

La ejecucion de ese fragmento de codigo nos daria [5, 4, 3, 2, 1] que seria un ordenamiento de mayor a menor

## Clonacion del objeto de medicos

Para clonar el objeto de medicos se realizo de la siguiente manera

```
const clonedDocs = [...doctors.map((doc) => ({ ...doc }))];
```

Debido a que los datos del arreglo de doctores son del tipo referenciados (objetos) se debe utilizar el operador **...** para extraer la data

## Merge del objeto de medicos

Para realizar el merge del arreglo de medicos con el arreglo de servicios se realizo de la siguiente manera

```
const mergedData = [...doctors, ...services];
```

## Recorrer arreglo mergeado de doctores y servicios

Para recorrer y mostrar el objeto mergeado de doctores y servicios se realizo de la siguiente manera

```
for (const merged of mergedData) {
  console.log('Datos mergeados', merged);
}

```

## Estructuras de datos utilizados

### Arreglos

Se utilizaron los arreglos de JavaScript para almacenar informacion de doctores, pacientes y citas reservadas.

### Pilas (Stack)

Se implemento una pila con la siguiente clase, la cual tiene los siguientes metodos: **push**, **pop** y **isEmpty**

```
export class Stack {
  data = [];

  push(item) {
    this.data.push(item);
  }

  pop() {
    return this.data.pop();
  }

  isEmpty() {
    return this.data.length === 0;
  }
}

```

### Colas

Se implemento una cola con la siguiente clase, la cual tiene los siguientes metodos: **enqueue**, **dequeue**, **isEmpty** y **length**

```
export class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(item) {
    this.queue.push(item);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  length() {
    return this.queue.length;
  }
}

```
