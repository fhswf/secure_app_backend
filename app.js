// Imports
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const port = 3000
const url = 'mongodb://localhost:27017/api_testDB'

const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-dqjyvzmz.eu.auth0.com/.well-known/jwks.json`
  }),

    // Validate the audience and the issuer.
    audience: 'http://127.0.0.1:3000/api/private',
    issuer: `https://dev-dqjyvzmz.eu.auth0.com/`,
    algorithms: ['RS256']
  });

app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Willkommen im Bereich für regristrierte Nutzer. Wie es aussieht, haben Sie einen gültigen Account.'
  });
});

//Mit der MongoDB verbinden und Meldungen ausgeben
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.once('open', _ => {
  console.log('Datenbank verbunden:', url)
})
db.on('error', err => {
    console.error('Verbindungsfehler:', err)
})

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//Route zur API deklarieren
const messageRouter = require('./routes/messages')
app.use('/messages', messageRouter)


// Static Files deklarieren
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// views deklarieren
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
   res.render('index', {text: 'Index.html zum Testen von JavaScript'})
})

app.get('/insecure_communication_test', (req, res) => {
  res.render('insecure_communication_test', {text: 'Seite zum Testen von HTTPS'})
})

//Fehlermeldungen für die Statuscodes 401 und 404
app.use(function(req, res, next) {
    res.status(404).send('Diese Seite existiert nicht!');
  });

app.use(function(req, res, next) {
    res.status(401).send('Diese Seite existiert nicht!');
});
  
  
// Konsolenausgaben
app.listen(port, () => console.info(`Backend laueft auf Port ${port}`))