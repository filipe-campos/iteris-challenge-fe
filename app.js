const express = require('express')

var http = require('http');
//var https = require('https');

/* Certificados HTTPS
var privateKey  = fs.readFileSync('sslcert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
*/


//const appHttps = express()
const appHttp = express()

const baseDir = `${__dirname}/build/`

/* HTTPS CONFIGURATION
appHttps.use(express.static(`${baseDir}`))
appHttps.get('*', (req,res) => res.sendFile('index.html' , { root : baseDir }))

const portHttps = 3001

var httpsServer = https.createServer(credentials, appHttps);
httpsServer.listen(portHttps, () => console.log(`Servidor subiu com sucesso em https://localhost:${portHttps}`));
*/

// HTTP CONFIGURATION
appHttp.get('*', (req,res) => res.sendFile('index.html' , { root : baseDir }))

const portHttp = 3000

var httpServer = http.createServer(appHttp);
httpServer.listen(portHttp, () => console.log(`Servidor subiu com sucesso em http://localhost:${portHttp}`));