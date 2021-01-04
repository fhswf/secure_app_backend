// Imports
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const fs = require('fs');
//let date = new Date;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Route zur API deklarieren

// Static Files deklarieren
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// views deklarieren
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/api/public/uhrzeit', (req, res) => {
  let date = new Date();
  res.json({
    jahr: date.getUTCFullYear(),
    monat: date.getUTCMonth() + 1,
    tag: date.getUTCDate(),
    stunden: date.getUTCHours() + 1,
    minuten: date.getUTCMinutes(),
    sekunden: date.getUTCSeconds()
  });
})

app.get('/index.html', (req, res) => {
  res.render('index', { text: 'Startseite des Backends' })
})


//Fehlermeldungen für die Statuscodes 401 und 404
app.use(function (req, res, next) {
  res.status(404).send('Diese Seite existiert nicht!');
});

app.use(function (req, res, next) {
  res.status(401).send('Fehlende Rechte für diesen Bereich!');
});

// Konsolenausgaben
app.listen(port, () => console.info(`Backend laueft auf Port ${port}`))