const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.port || 5000;
const bodyParser = require('body-parser');
require('dotenv').config();
const hbs = require('express-hbs');
const { check, validationResult } = require('express-validator');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Set view engine
app.engine('hbs', hbs.express4());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

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
      .withMessage('Your name is required'),
    check('email')
      .isEmail()
      .withMessage('Your email is required'),
    check('message')
      .notEmpty()
      .withMessage('Please write a message for me')
  ],

  (req, res) => {
    const message = {
      to: process.env.MY_EMAIL,
      from: req.body.email,
      subject: `Portfolio Contact: ${req.body.name}`,
      text: req.body.message,
      html: `<strong>${req.body.message}</strong>`
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);
      res.render('index', { errors: errors.array() });
      console.log(errors);
    } else {
      // sgMail.send(message);

      console.log(req.body);
      res.status(204).render('index', {
        message: 'Thank you for getting in touch. I will contact you soon!'
      });
    }
  }
);
