/**
 * Backend zur SecureApp.
 * Diese Datei implementiert den Webserver mit Hilfe von NodeJS.
 * 
 * @author Marcel Hopp 
 */

const express = require('express')
const app = express()
const port = 3000
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

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


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
app.listen(port, () => console.info(`Backend laueft auf Port ${port}`))