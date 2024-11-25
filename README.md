# Modulo 3 Laboratorio virtual 2

## Programacion funcional aplicada

Se utilizaron metodos de programacion funcional como **forEach** como en el siguiente fragmento de codigo:

```
waitTimes.forEach(
  (waitTime) => (totalWaitTime += Number(waitTime.innerText))
);
```

En donde se itera por unos elementos HTML y se extrae el texto

## Descripcion de eventos

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
