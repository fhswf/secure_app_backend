/**
 * Backend zur SecureApp.
 * Diese Datei implementiert den Webserver mit Hilfe von NodeJS.
 * 
 * @author Marcel Hopp 
 */

const express = require('express')
const app = express()
const port = 3000
<<<<<<< HEAD
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

/**
 * Implementiert die Auth0.com-Funktionen.
 */
var jwtCheck = jwt({
   secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-dqjyvzmz.eu.auth0.com/.well-known/jwks.json'
 }),
  audience: 'http://127.0.0.1:3000/api/private', 
  issuer: 'https://dev-dqjyvzmz.eu.auth0.com/',
  algorithms: ['RS256']
 });
=======
const fs = require('fs');
//let date = new Date;
>>>>>>> bc41aab... Docker (#1)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

<<<<<<< HEAD

/**
 * Implementiert einen öffentlichen API-Endpunkt, der beim Aufruf das aktuelle Datum mit aktueller Uhrzeit ausgibt.
 */
app.get('/api/public', (req, res) => {
  let date = new Date();

  let wochentage_array = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  let wochentag = wochentage_array[date.getDay()];

  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day   = date.getDate().toString().padStart(2, "0");
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let seconds = date.getSeconds().toString().padStart(2, "0");
  
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

/**
 * Implementiert einen privaten API-Endpunkt. Um diesen aufzurufen, ist ein JWT nötig.
 */
app.get('/api/private', jwtCheck, function(req, res) {
  res.json({
    message: 'Hello World vom privaten Endpunkt des Backends!'
  });
});

/**
 * Fehlermeldung für den Statuscode 404
 */
app.use(function (req, res, next) {
  res.status(404).send('Diese Seite existiert nicht!');
});

/**
 * Konsolenausgabe
 */
=======
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
>>>>>>> bc41aab... Docker (#1)
app.listen(port, () => console.info(`Backend laueft auf Port ${port}`))