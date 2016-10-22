const cronFunctions       = require('./functions/job.js')
const serverFunctions     = require('./functions/express.js')
const commonFunctions     = require('./functions/common.js')
const requireDir          = require('require-dir')
const log                 = commonFunctions.log
const request             = require('request')
const async               = require('async')
const mongo               = require('./functions/mongo.js')

process.on('uncaught exception', function(err){
    log(err)
    process.exit(1);
})

requireDir('functions')
requireDir('routes')
requireDir('views')

mongo.connect(function(){

	serverFunctions.startServer(function(){

		cronFunctions.initializeCronJobs()

		log('Bert Jobs initialized!')

	})

})