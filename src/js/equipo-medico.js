// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import { doctors } from './data/doctors';
import { services } from './data/services';
import { Doctor } from './classes/Doctor';

function fixIndex() {
  const btns = document.querySelectorAll('.doctors-row .btn-close');

  btns.forEach((btn, index) => {
    btn.setAttribute('data-index', index);
  });
}

function removeDoctor(event) {
  event.stopPropagation();
  const index = event.target.getAttribute('data-index');

  doctors.splice(index, 1);

  console.log('Doctor eliminado', index);
  console.log('Doctores restantes', doctors);

  const btn = event.target;

  btn.parentElement.parentElement.parentElement.parentElement.remove();

  fixIndex();
}

// ordenar data por la funcion pasada
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

console.log('Ordernando doctores por años de experiencia');
sortByFn(doctors, (a, b) => b.experience - a.experience);

const dr = new Doctor('Dr. Juan', 'Cirujano', 10);

console.log(`Experiencia del doctor ${dr.nombre}: ${dr.experiencia}`);

dr.experiencia = 15;

console.log(`Experiencia del doctor ${dr.nombre}: ${dr.experiencia}`);

window.removeDoctor = removeDoctor;

function generateDoctorCard(doctor, index) {
  const { image, name, description, experience, available } = doctor;

  return `
    <div class="col-3 mb-5">
      <div class="card text-center">
        <img src="${image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h3 class="card-title">${name}</h3>
          <p class="card-text">
            ${description}
            <br>
            ${experience} años de experiencia
            <br>
            <strong>${
              available ? 'Disponible' : 'No disponible'
            }</strong><button type="button" class="btn-close remove-doctor" aria-label="Close" data-index="${index}" onclick="removeDoctor(event)"></button>
          </p>
        </div>
      </div>
    </div>`;
}

function renderDoctors(docs) {
  const doctorsElement = document.querySelector('.doctors-row');

  let doctorsHtmlContent = '';

  docs.forEach((doc) => {
    const { image, name, description, experience, available } = doc;
    const index = doctors.indexOf(doc);

    doctorsHtmlContent += generateDoctorCard(
      { image, name, description, experience, available },
      index
    );
  });

  doctorsElement.innerHTML = doctorsHtmlContent;
}

console.log('equipo-medico');

renderDoctors(doctors);

const clonedDocs = [...doctors.map((doc) => ({ ...doc }))];
clonedDocs[0].name = 'Doctor Modificado';
console.log('Cloned docs', clonedDocs);
console.log('Original docs', doctors);

console.log(
  'doctor original',
  doctors[0].name,
  'doctor clonado',
  clonedDocs[0].name
);

const mergedData = [...doctors, ...services];

console.log('Merged docs', mergedData);

for (const merged of mergedData) {
  console.log('Datos mergeados', merged);
}

console.log('Objeto serializado', JSON.stringify(mergedData));

const searchText = document.querySelector('.search-box');

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

const showModal = document.querySelector('#modal-doctor');
const doctorModal = new bootstrap.Modal('#agregar-doctor-modal');

showModal.addEventListener('click', () => {
  const modalInputs = document.querySelectorAll('#agregar-doctor-modal input');
  modalInputs.forEach((input) => (input.value = ''));
  document.querySelector('#disponibilidad-doctor').value = 'disponible';
  document
    .querySelectorAll('#agregar-doctor-modal span')
    .forEach((el) => (el.innerText = ''));

  doctorModal.show();
});

const btnAddDoctor = document.querySelector('#btn-agregar-doctor');

btnAddDoctor.addEventListener('click', () => {
  const modalInputs = document.querySelectorAll('#agregar-doctor-modal input');
  let hasError = false;

  for (const modalInput of modalInputs) {
    const regexValidation = modalInput.getAttribute('data-regex');
    const regex = new RegExp(regexValidation);
    const errorMessage = modalInput.parentElement.querySelector('span');

    if (!regex.test(modalInput.value)) {
      errorMessage.innerText = 'Campo inválido';
      hasError = true;
    } else {
      errorMessage.innerText = '';
    }
  }

  if (hasError) {
    return;
  }

  const doctor = {};

  modalInputs.forEach((input) => {
    const field = input.getAttribute('data-field');
    doctor[field] = input.value;
  });

  const available = document.querySelector('#disponibilidad-doctor').value;

  console.log(available);

  doctor.experience = Number(doctor.experience);
  doctor.available = available === 'disponible';
  doctor.image = 'img/doc-1.png';

  console.log('Doctor a agregar', doctor);

  doctors.push(doctor);

  document.querySelector('.doctors-row').innerHTML += generateDoctorCard(
    doctor,
    doctors.length - 1
  );

  doctorModal.hide();
});
