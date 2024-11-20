import { services } from './data/services';
import { patients } from './data/patients';

console.log('home');

const servicesElement = document.querySelector('.services-row');

let serviceHtmlContent = '';

for (const { image, title, description } of services) {
  serviceHtmlContent += `
    <div class="col-md-4 mb-5">
      <div class="card text-center">
        <img src="${image}" class="card-img-top" alt="" />
        <div class="card-body">
          <h3 class="card-title">${title}</h3>
          <p class="card-text">
            ${description}
          </p>
        </div>
      </div>
    </div>`;
}

servicesElement.innerHTML = serviceHtmlContent;

const patientsElement = document.querySelector('.patients-row');

let patientsHtmlContent = '';

for (const { image, name, description } of patients) {
  patientsHtmlContent += `
    <div class="col-md-4 mb-5">
      <div class="card text-center">
        <img src="${image}" class="card-img-top" alt="" />
        <div class="card-body">
          <h3 class="card-title">${name}</h3>
          <p class="card-text">
            ${description}
          </p>
        </div>
      </div>
    </div>`;
}

patientsElement.innerHTML = patientsHtmlContent;
