import axios from 'axios';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { Stack } from './classes/Stack';
import { Queue } from './classes/Queue';

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

function generatePrice() {
  return Math.floor(Math.random() * 10000 + 15000);
}

function generateRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function discountByFn(price, discountFn) {
  return price - discountFn();
}

function discountByPercentage(price, percentage) {
  return () => Math.floor(price * percentage);
}

const calculateCost = (price) => (qty) => price * qty;

console.log('Pagina de cita de pacientes');

console.log('Creando pacientes');

document.addEventListener('newPatient', (event) => {
  const alert = document.querySelector('#new-patient-alert');
  const {
    detail: { name, doctorName },
  } = event;

  alert.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Nuevo Paciente </strong>Se agendo un nuevo paciente: <strong>${name}</strong> con el <strong>Dr ${doctorName}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  setTimeout(() => {
    alert.innerHTML = '';
  }, 3500);
});

(async () => {
  const doctorList = await getDoctors(alert);

  const patients = new Stack();

  let randIndex = generateRandomIndex(doctorList.length);
  let price = generatePrice();

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

  price = generatePrice();

  randIndex = generateRandomIndex(doctorList.length);

  patients.push({
    name: 'paciente 2',
    date: '01-08-2021',
    hour: '08:00',
    doctorName: doctorList[randIndex].name,
    doctorId: doctorList[randIndex].id,
    price,
    waitTime: 20,
    discount: discountByFn(price, discountByPercentage(price, 0.1)),
  });

  price = generatePrice();

  randIndex = generateRandomIndex(doctorList.length);

  patients.push({
    name: 'paciente 3',
    date: '01-08-2021',
    hour: '07:00',
    doctorName: doctorList[randIndex].name,
    doctorId: doctorList[randIndex].id,
    price,
    waitTime: 30,
    discount: discountByFn(price, discountByPercentage(price, 0.1)),
  });

  price = generatePrice();

  randIndex = generateRandomIndex(doctorList.length);

  patients.push({
    name: 'paciente 4',
    date: '01-08-2021',
    hour: '06:00',
    doctorName: doctorList[randIndex].name,
    doctorId: doctorList[randIndex].id,
    price,
    waitTime: 10,
    discount: discountByFn(price, discountByPercentage(price, 0.1)),
  });

  randIndex = generateRandomIndex(doctorList.length);

  patients.push(patients.data[1]);

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
        <td scope="col" data-doctor-id="${patient.doctorId}">${
      patient.doctorName
    }</td>
        <td scope="col">${patient.price.toLocaleString()}</td>
        <td scope="col">${patient.waitTime}</td>
        <td scope="col">${patient.discount.toLocaleString()}</td>
      </tr>
    `;
  }

  const totalTimeByPatient = document.querySelector('#total-patient-button');

  totalTimeByPatient.addEventListener('click', () => {
    const patientsTable = document.querySelectorAll('#reserved-hours tbody tr');
    const patients = {};

    patientsTable.forEach((row) => {
      const patient = row.querySelector('td:nth-child(1)').innerHTML;
      const price = Number(
        row.querySelector('td:nth-child(7)').innerHTML.replace(/[^\d]+/, '')
      );

      if (!(patient in patients)) {
        patients[patient] = { price, qty: 0 };
      }

      patients[patient].qty++;
    });

    let output = '';
    for (const patient in patients) {
      const fn = calculateCost(patients[patient].price);
      output += `Paciente: ${patient} - Total a pagar: ${fn(
        patients[patient].qty
      ).toLocaleString()}\n`;
    }

    alert(output);
  });

  const totalTimeByDr = document.querySelector('#total-dr-button');

  totalTimeByDr.addEventListener('click', () => {
    const allDoctors = [];
    document
      .querySelectorAll('#reserved-hours tbody td:nth-child(4)')
      .forEach((doctor) => allDoctors.push(doctor.innerHTML));
    const totalDrs = {};
    calculateTotalHours(totalDrs, allDoctors);

    let output = '';

    for (const [doctor, totalHours] of Object.entries(totalDrs)) {
      output += `Doctor: ${doctor} - Total de horas: ${totalHours}\n`;
    }

    alert(output);
  });

  const averageTime = document.querySelector('#average-button');

  averageTime.addEventListener('click', () => {
    let totalWaitTime = 0;
    const waitTimes = document.querySelectorAll(
      '#reserved-hours tbody td:last-child'
    );

    waitTimes.forEach(
      (waitTime) => (totalWaitTime += Number(waitTime.innerText))
    );

    const average = totalWaitTime / waitTimes.length;

    alert(`Tiempo promedio de espera: ${average} minutos`);
  });

  patientTable.innerHTML = tableContent;

  const addPatientModal = new bootstrap.Modal('#agregar-paciente-modal');

  const btnAddPatient = document.querySelector('#pending-button');
  const doctorListSelect = document.querySelector('#lista-doctores');

  btnAddPatient.addEventListener('click', async () => {
    const inputs = document.querySelectorAll(
      '#form-agendar input, #form-agendar select'
    );

    for (const input of inputs) {
      input.value = '';
      console.log('limpiando span');
      input.parentElement.querySelector('span').innerText = '';
    }

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
      price: Number(price.value),
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
        <td scope="col" data-doctor-id="${patient.doctorId}">${
      patient.doctorName
    }</td>
        <td scope="col">${patient.price.toLocaleString()}</td>
      </tr>
    `;

    document.querySelector('#total-agendados').innerHTML =
      patientsQueue.length();

    const customEvent = new CustomEvent('newPatient', {
      detail: patient,
    });

    document.dispatchEvent(customEvent);

    addPatientModal.hide();
  });
})();
