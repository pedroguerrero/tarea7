// Import our custom CSS
import '../scss/main.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

const button = document.querySelector('.abrir-agenda');

button.addEventListener('click', () => {
  console.log('abriendo la agenda');
});

const cerrarbutton = document.querySelector('.cerrar-agenda');

cerrarbutton.addEventListener('click', () => {
  console.log('cerrar la agenda');
});

const inputs = document.querySelectorAll('.reservar');

inputs.forEach((input) => {
  input.addEventListener('click', (e) => {
    const message = e.currentTarget.getAttribute('data-message');
    const value = prompt(message);

    const regex = e.currentTarget.getAttribute('data-regex');

    if (!regex) {
      return;
    }

    const regexObk = new RegExp(regex);

    if (!regexObk.test(value)) {
      alert('El valor ingresado no es válido');
      return;
    }

    input.value = value;
  });
});
