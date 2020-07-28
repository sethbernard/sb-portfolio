const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

// Sends contact form information to email
app.post(
  '/',
  [
    check('name')
      .notEmpty()
      .trim()
      .escape()
      .withMessage('Your name is required.'),
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Your email is required.'),
    check('text')
      .notEmpty()
      .trim()
      .escape()
      .withMessage('Please write a message for me.'),
  ],

  (req, res) => {
    const sgMessage = {
      to: process.env.MY_EMAIL,
      from: req.body.email,
      subject: `Portfolio Contact: ${req.body.name}`,
      text: req.body.text,
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() });
    }

    sgMail.send(sgMessage);

    return res.status(201).send({
      message: 'Thank you for getting in touch. I will contact you soon!',
    });
  }
);
