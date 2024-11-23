import axios from 'axios';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { Stack } from './Stack';
import { Queue } from './Queue';

async function getDoctors() {
  const doctorsUrl = 'https://jsonplaceholder.typicode.com/users';
  const { data } = await axios.get(doctorsUrl);

  return data;
}

function generatePrice() {
  return Math.floor(Math.random() * 10000 + 15000);
}

function generateRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

console.log('Pagina de cita de pacientes');

console.log('Creando pacientes');

(async () => {
  const doctorList = await getDoctors();

  const patients = new Stack();

  let randIndex = generateRandomIndex(doctorList.length);

  patients.push({
    name: 'paciente 1',
    date: '01-08-2021',
    hour: '09:00',
    doctorName: doctorList[randIndex].name,
    doctorId: doctorList[randIndex].id,
    price: generatePrice(),
  });

  randIndex = generateRandomIndex(doctorList.length);

  patients.push({
    name: 'paciente 2',
    date: '01-08-2021',
    hour: '08:00',
    doctorName: doctorList[randIndex].name,
    doctorId: doctorList[randIndex].id,
    price: generatePrice(),
  });

  randIndex = generateRandomIndex(doctorList.length);

  patients.push({
    name: 'paciente 3',
    date: '01-08-2021',
    hour: '07:00',
    doctorName: doctorList[randIndex].name,
    doctorId: doctorList[randIndex].id,
    price: generatePrice(),
  });

  randIndex = generateRandomIndex(doctorList.length);

  patients.push({
    name: 'paciente 4',
    date: '01-08-2021',
    hour: '06:00',
    doctorName: doctorList[randIndex].name,
    doctorId: doctorList[randIndex].id,
    price: generatePrice(),
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
        <td scope="col" data-doctor-id="${patient.doctorId}">${patient.doctorName}</td>
        <td scope="col">${patient.price}</td>
      </tr>
    `;
  }

  patientTable.innerHTML = tableContent;

  const addPatientModal = new bootstrap.Modal('#agregar-paciente-modal');

  const btnAddPatient = document.querySelector('#pending-button');
  const doctorListSelect = document.querySelector('#lista-doctores');

  btnAddPatient.addEventListener('click', async () => {
    document.querySelector('#nombre-paciente').value = '';
    document.querySelector('#fecha-paciente').value = '';
    document.querySelector('#valor').value = '';
    doctorListSelect.innerHTML = `<option value="" disabled selected>Seleccione un doctor</option>`;

    try {
      for (const { id, name } of doctorList) {
        doctorListSelect.innerHTML += `<option value="${id}">${name}</option>`;
      }
    } catch (error) {
      alert('Error al cargar la lista de doctores');
    }

    addPatientModal.show();
  });

  const btnAddPatientModal = document.querySelector('#form-agendar');

  btnAddPatientModal.addEventListener('submit', (event) => {
    event.stopPropagation();
    event.preventDefault();

    const patientName = document.querySelector('#nombre-paciente');
    const patientDate = document.querySelector('#fecha-paciente');
    const selectedDoctor = document.querySelector('#lista-doctores');
    const price = document.querySelector('#valor');
    let hasError = false;

    const inputs = document.querySelectorAll(
      '#form-agendar input, #form-agendar select'
    );

    for (const input of inputs) {
      if (!input.value.length) {
        input.parentElement.querySelector('span').innerText = 'Campo inválido';
        hasError = true;
      } else {
        input.parentElement.querySelector('span').innerText = '';
      }
    }

    if (hasError) {
      return;
    }

    let [date, hour] = patientDate.value.split('T');
    date = date.split('-').reverse().join('-');
    const doctorId = selectedDoctor.options[selectedDoctor.selectedIndex].value;
    const doctorName =
      selectedDoctor.options[selectedDoctor.selectedIndex].text;

    const patient = {
      name: patientName.value,
      date,
      hour,
      doctorName,
      doctorId,
      price: price.value,
    };

    patientsQueue.enqueue(patient);

    const pendingPatientTable = document.querySelector(
      '#pending-patients tbody'
    );
    pendingPatientTable.innerHTML += `
      <tr>
        <td scope="col">${patient.name}</td>
        <td scope="col">${patient.date}</td>
        <td scope="col">${patient.hour}</td>
        <td scope="col" data-doctor-id="${patient.doctorId}">${patient.doctorName}</td>
        <td scope="col">${patient.price}</td>
      </tr>
    `;

    document.querySelector('#total-agendados').innerHTML =
      patientsQueue.length();

    addPatientModal.hide();
  });
})();
