const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.port || 5000;
const bodyParser = require('body-parser');
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Serve static assets
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

// Render homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Sends contact form information to my email
app.post(
  '/',
  [
    check('name')
      .notEmpty()
      .withMessage('Your name is required.'),
    check('email')
      .isEmail()
      .withMessage('Your email is required.'),
    check('text')
      .notEmpty()
      .withMessage('Please write a message for me.')
  ],

  (req, res) => {
    const sgMessage = {
      to: process.env.MY_EMAIL,
      from: req.body.email,
      subject: `Portfolio Contact: ${req.body.name}`,
      text: req.body.text,
      html: `<strong>${req.body.text}</strong>`
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() });
    }

    // sgMail.send(sgMessage);

    return res.status(201).send({
      message: 'Thank you for getting in touch. I will contact you soon!'
    });
  }
);
