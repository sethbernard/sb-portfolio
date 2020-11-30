import '../scss/style.scss';
import axios from 'axios';

// Cache Dom
const contactForm = document.querySelector('#contact-form');
const successMessage = document.querySelector('#success-message');
const errorMessages = document.querySelector('#error-messages');

//Handle Form on client-side
function handleForm(e) {
    e.preventDefault();
    successMessage.textContent = '';
    errorMessages.innerHTML = '';

    let body = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        text: document.querySelector('#text').value
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
