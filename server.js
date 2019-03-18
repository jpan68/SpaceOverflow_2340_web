const express = require('express');
const app = express();
const partials = require('express-partials');
const path = require('path');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// load the express-partials middleware
app.use(partials());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// imports controllers/index.js
app.use(require('./controllers'));

app.listen(port, () => {
  console.log('listening on http://localhost:' + port);
});

module.exports = app;
