console.log('contacto');

const contactForm = document.querySelector('#contact');

contactForm.addEventListener('submit', (event) => {
  event.stopPropagation();
  event.preventDefault();

  alert('Formulario enviado');
});
