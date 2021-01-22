/**
 * Backend zur SecureApp.
 * Diese Datei implementiert den Webserver mit einem öffentlichen und einem privaten API-Endpunkt.
 * 
 * @author Marcel Hopp
 * @version 1.0
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
  audience: 'https://jupiter.fh-swf.de/secureapp/api/private',
  issuer: 'https://dev-dqjyvzmz.eu.auth0.com/',
  algorithms: ['RS256']
 });

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


/**
 * Implementiert einen öffentlichen API-Endpunkt, der beim Aufruf das aktuelle Datum mit aktueller Uhrzeit ausgibt.
 */
app.get('/api/public', (req, res) => {
  // Erstellt beim Aufruf der API ein neues Datum
  let date = new Date();

  // Array für die einzelnen Wochentage, als spätere Ausgabe im JSON-Format
  let wochentage_array = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  
  // Gibt den aktuellen Wochentag zurück
  let aktueller_wochentag = wochentage_array[date.getDay()];

  // Konvertiert Jahr, Monat, Tag, Stunden, Minuten und Sekunden in einen String und fügt mit Hilfe der padStart()-Methode führende Nullen ein, sobald die Werte < 10 sind.
  let aktuelles_jahr = date.getFullYear().toString();
  let aktueller_monat = (date.getMonth() + 1).toString().padStart(2, "0");
  let aktueller_tag   = date.getDate().toString().padStart(2, "0");
  let aktuelle_stunden = date.getHours().toString().padStart(2, "0");
  let aktuelle_minuten = date.getMinutes().toString().padStart(2, "0");
  let aktuelle_sekunden = date.getSeconds().toString().padStart(2, "0");
  
  // Gibt den Datensatz im JSON-Format aus.
  res.json({
    wochentag: aktueller_wochentag,
    tag: aktueller_tag,
    monat: aktueller_monat,
    jahr: aktuelles_jahr, 
    stunden: aktuelle_stunden, 
    minuten: aktuelle_minuten,
    sekunden: aktuelle_sekunden
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