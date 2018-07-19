const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const calcAge = require('./calc_age');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const { name, date_of_birth } = req.body;

  const date = date_of_birth
    .split('/')
    .reverse()
    .join('-');

  const age = calcAge(date);

  if (age >= 18) {
    res.redirect(`/major?nome=${name}`);
  } else {
    res.redirect(`/minor?nome=${name}`);
  }
  res.send();
});

app.get('/major', (req, res) => {
  res.render('major', { name: req.query.nome });
});

app.get('/minor', (req, res) => {
  res.render('minor', { name: req.query.nome });
});

app.listen(3000);
