const express         = require('express')
const bodyParser      = require('body-parser')
const http            = require('http')
const commonFunctions = require('./common')
const log             = commonFunctions.log
const app             = express()
const cookieParser    = require('cookie-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())

module.exports = {
	startServer : startServer,
	app         : app
}


http.globalAgent.maxSockets = 10000

function startServer (callback) {
	var serverPort = process.env.OPENSHIFT_NODEJS_PORT || 8080
	var ip         = process.env.OPENSHIFT_NODEJS_IP   || "127.0.0.1";
  http.createServer(app).listen(serverPort, ip, null, function(){
    log("Listening to http port " + serverPort)
    callback()
  })
}