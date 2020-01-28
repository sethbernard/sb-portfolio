// Cache Dom
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessages = document.getElementById('error-messages');

//Handle Form on client-side
function handleForm(e) {
  e.preventDefault();

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
    .then(response => {
      const success = response.data.message;
      successMessage.insertAdjacentHTML('beforebegin', success);
      contactForm.reset();
    })
    .catch(error => {
      const errors = error.response.data.errors
        .map(error => {
          return `<li>${error.msg}</li>`;
        })
        .join('');

      errorMessages.insertAdjacentHTML('beforebegin', errors);
    });
}

contactForm.addEventListener('submit', handleForm);
