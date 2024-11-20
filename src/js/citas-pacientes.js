// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { Stack } from './Stack';
import { Queue } from './Queue';

console.log('Pagina de cita de pacientes');

console.log('Creando pacientes');

const patients = new Stack();
patients.push({
  name: 'paciente 1',
  date: '01-08-2021',
  hour: '09:00',
});

patients.push({
  name: 'paciente 2',
  date: '01-08-2021',
  hour: '08:00',
});

patients.push({
  name: 'paciente 3',
  date: '01-08-2021',
  hour: '07:00',
});

patients.push({
  name: 'paciente 4',
  date: '01-08-2021',
  hour: '06:00',
});

const patientsQueue = new Queue();

const patientTable = document.querySelector('#reserved-hours tbody');
let tableContent = '';

while (!patients.isEmpty()) {
  const patient = patients.pop();
  tableContent += `
    <tr>
      <td scope="col">${patient.name}</td>
      <td scope="col">${patient.date}</td>
      <td scope="col">${patient.hour}</td>
    </tr>
  `;
}

patientTable.innerHTML = tableContent;

const addPatientModal = new bootstrap.Modal('#agregar-paciente-modal');

const btnAddPatient = document.querySelector('#pending-button');

btnAddPatient.addEventListener('click', () => {
  document.querySelector('#nombre-paciente').value = '';
  document.querySelector('#fecha-paciente').value = '';
  addPatientModal.show();
});

const btnAddPatientModal = document.querySelector('#btn-agregar-paciente');

btnAddPatientModal.addEventListener('click', () => {
  const patientName = document.querySelector('#nombre-paciente');
  const patientDate = document.querySelector('#fecha-paciente');
  let hasError = false;

  if (!patientName.value.length) {
    patientName.parentElement.querySelector('span').innerText =
      'Campo inválido';

    hasError = true;
  } else {
    patientName.parentElement.querySelector('span').innerText = '';
  }

  if (!patientDate.value.length) {
    patientDate.parentElement.querySelector('span').innerText =
      'Campo inválido';

    hasError = true;
  } else {
    patientDate.parentElement.querySelector('span').innerText = '';
  }

  if (hasError) {
    return;
  }

  let [date, hour] = patientDate.value.split('T');
  date = date.split('-').reverse().join('-');

  const patient = {
    name: patientName.value,
    date,
    hour,
  };

  patientsQueue.enqueue(patient);

  const pendingPatientTable = document.querySelector('#pending-patients tbody');
  pendingPatientTable.innerHTML += `
    <tr>
      <td scope="col">${patient.name}</td>
      <td scope="col">${patient.date}</td>
      <td scope="col">${patient.hour}</td>
    </tr>
  `;

  document.querySelector('#total-agendados').innerHTML = patientsQueue.length();

  addPatientModal.hide();
});
