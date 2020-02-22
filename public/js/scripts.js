import '../scss/style.scss';
import axios from 'axios';

// Cache Dom
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessages = document.getElementById('error-messages');

//Handle Form on client-side
function handleForm(e) {
  e.preventDefault();
  successMessage.textContent = '';
  errorMessages.innerHTML = '';

  let body = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    text: document.getElementById('text').value
  };

  axios
    .post('/', {
      name: body.name,
      email: body.email,
      text: body.text
    })
    .then((response) => {
      successMessage.textContent = response.data.message;
      contactForm.reset();
    })
    .catch((error) => {
      const errors = error.response.data.errors
        .map((error) => {
          return `<li>${error.msg}</li>`;
        })
        .join('');

      errorMessages.innerHTML = errors;
    });
}

contactForm.addEventListener('submit', handleForm);

// Get current year for footer
let date = new Date().getFullYear();
document.getElementById('current-year').innerHTML = date;

//Mobile menu
const mainMenu = document.querySelector('.main-menu');
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const menuItems = document.querySelectorAll('nav ul li a');

mobileMenuButton.addEventListener('click', () => {
  mainMenu.classList.toggle('mobile-menu');
});

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    mainMenu.classList.toggle('mobile-menu');
  });
});
