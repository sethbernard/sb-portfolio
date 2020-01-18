const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.port || 5000;
const bodyParser = require('body-parser');
require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

app.post('/', (req, res) => {
  const message = {
    to: process.env.MY_EMAIL,
    from: req.body.email,
    subject: `Portfolio Contact: ${req.body.name}`,
    text: req.body.message,
    html: `<strong>${req.body.message}</strong>`
  };

  sgMail.send(message);
  console.log(req.body);
  res
    .status(204)
    .send('Thank you for getting in touch. I will contact you soon!');
});
