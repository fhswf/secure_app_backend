/**
 * Backend zur SecureApp.
 * Diese Datei implementiert den Webserver mit Hilfe von NodeJS.
 * 
 * @author Marcel Hopp 
 */

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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

  var wochentage_array = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var wochentag = wochentage_array[date.getDay()];

  year = date.getFullYear().toString();
  month = (date.getMonth() + 1).toString().padStart(2, "0");
  day   = date.getDate().toString().padStart(2, "0");
  hours = date.getHours().toString().padStart(2, "0");
  minutes = date.getMinutes().toString().padStart(2, "0");
  seconds = date.getSeconds().toString().padStart(2, "0");
  
  res.json({
    wochentag: wochentag,
    tag: day,
    monat: month,
    jahr: year, 
    stunden: hours, 
    minuten: minutes,
    sekunden: seconds
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