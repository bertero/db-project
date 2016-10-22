const serverFunctions     = require('./functions/server')
const commonFunctions     = require('./functions/common.js')
const log                 = commonFunctions.log
const mongo               = require('./functions/mongo.js')
const initRoutes          = require('./routes/routes').init

commonFunctions.listenToUncaughtException()

mongo.connect(function(){

	initRoutes()

	serverFunctions.startServer(function(){

		log('Bert Jobs initialized!')

	})

})