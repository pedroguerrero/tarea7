# Modulo 3 Laboratorio virtual 2

## Uso de currying

Se utilizo currying para calcular el costo total de los servicios de los pacientes con la siguiente funcion

```
const calculateCost = (price) => (qty) => price * qty;
```

Y se mostro la informacion por pantalla de la siguiente manera

```
let output = '';
for (const patient in patients) {
  const fn = calculateCost(patients[patient].price);
  output += `Paciente: ${patient} - Total a pagar: ${fn(
    patients[patient].qty
  ).toLocaleString()}\n`;
}

alert(output);
```

## Uso de la funcion flecha

Se usaron arrow function para calcular el tiempo de espera promedio de los pacientes de la siguiene manera

```
const waitTimes = document.querySelectorAll(
  '#reserved-hours tbody td:last-child'
);

waitTimes.forEach(
  (waitTime) => (totalWaitTime += Number(waitTime.innerText))
);

const average = totalWaitTime / waitTimes.length;

alert(`Tiempo promedio de espera: ${average} minutos`);
```

## Uso de recursividad

El uso de recursividad se realizo en la funcion encargada de calcular el total de horas por doctor de la siguiente manera

```
function calculateTotalHours(doctors, doctorList) {
  if (doctorList.length === 0) {
    return;
  }

  const doctor = doctorList.pop();

  if (!(doctor in doctors)) {
    doctors[doctor] = 0;
  }

  doctors[doctor] += 1;

  return calculateTotalHours(doctors, doctorList);
}
```

## Composicion de funciones

Se utilizo la composicion de funciones de la siguiente manera

```
function discountByFn(price, discountFn) {
  return price - discountFn();
}

function discountByPercentage(price, percentage) {
  return () => Math.floor(price * percentage);
}

patients.push({
  name: 'paciente 1',
  date: '01-08-2021',
  hour: '09:00',
  doctorName: doctorList[randIndex].name,
  doctorId: doctorList[randIndex].id,
  price,
  waitTime: 10,
  discount: discountByFn(price, discountByPercentage(price, 0.1)),
});
```

## Programacion funcional aplicada

Se utilizaron metodos de programacion funcional como **filter** para la busqueda de elementos en un arreglo como en el siguiente fragmento de codigo:

```
const filteredDoctors = doctors.filter(
  ({ name, description }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    description.toLowerCase().includes(searchTerm.toLowerCase())
);
```

En donde se itera por unos elementos HTML y se extrae el texto

## Descripcion de eventos

### Captura del evento del formulario

Se capturo el evento del formulario de contacto y se mostro un **alert** indicando que este se envio correctamente de la siguiente manera

```
const contactForm = document.querySelector('#contact');

contactForm.addEventListener('submit', (event) => {
  event.stopPropagation();
  event.preventDefault();

  alert('Formulario enviado');
});
```

### Evento de ingreso de paciente

Se utilizaron eventos como la captura del evento submit en el formulario de contacto, click en los botones y
se creo un evento nuevo llamado **newPatient** para informar un nuevo paciente y se captura en el **document**

Ejecucion del evento **newPatient**

```
const customEvent = new CustomEvent('newPatient', {
  detail: patient,
});
```

Captura del evento **newPatient**

```
document.addEventListener('newPatient', (event) => {
  ...
});
```

## Uso de asincronia

Se hizo uso de la asincronia para realizar un request HTTP a una API para obtener usuarios (doctores)
junto con un callback que se usa en caso de error

```
async function getDoctors(cbError) {
  try {
    const doctorsUrl = 'https://jsonplaceholder.typicode.com/users';
    const { data } = await axios.get(doctorsUrl);

    return data;
  } catch (error) {
    cbError('Error al cargar la lista de doctores');

    return [];
  }
}
```

## Clases, herencia y encapsulacion

Se crearon las clases **Cirujano**, **Doctor**, **Paciente**, **Qeueue** y **Stack**
La herencia se implemento en la clase **Cirujano** que hereda los atributos de **Doctor**
se sobrecargo el metodo llamado **mostarDatos** en la clase **Cirujano**.
Se "protegio" el atributo experiencia a traves de un **getter** y **setter**
Se creo un **setter** y **getter** del atributo experiencia de la siguiente manera

```
get experiencia() {
  return this._experiencia;
}

set experiencia(experience) {
  this._experiencia = experience;
}
```

Se instancio la clase **Doctor** y se utilizo el **setter** y **getter** creado de la siguiente manera

```
const dr = new Doctor('Dr. Juan', 'Cirujano', 10);

console.log(`Experiencia del doctor ${dr.nombre}: ${dr.experiencia}`);

dr.experiencia = 15;

console.log(`Experiencia del doctor ${dr.nombre}: ${dr.experiencia}`);
```
