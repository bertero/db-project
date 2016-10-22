const mongoose        = require('mongoose')
const commonFunctions = require('./common.js')
const log      = commonFunctions.log
const u        = require('underscore')
const strftime = require('strftime')
const sendMail = require('./mailer.js').sendMail
const schemas  = {
	tracker_summaries : new mongoose.Schema({
    ip            : String,
    route_address : String,
    created_at    : Date,
    user_agent    : String
	})
}

var uri = 'mongodb://<dbuser>:<dbpassword>@ds023714.mlab.com:23714/main_first'
uri     = uri.replace('<dbuser>',     process.env.MONGO_MAIN_USER)
uri     = uri.replace('<dbpassword>', process.env.MONGO_MAIN_PASSWORD)

var db          = mongoose.createConnection(uri)
var collections = {}

module.exports = {
	connect     : connect,
	collections : collections,
	summarize   : summarize
}

function connect (callback) {

	db.on('error', console.error.bind(console, 'connection error:'))

	db.once('open', function () {
	  
	  u.each(schemas, function(schema, collection){

	  	collections[collection] = db.model(collection, schema)

	  })

	  log("MongoDB Connected")
	  callback()

	})

}

function summarize (route, req) {
	
	var summaryDoc = {
		route      : route,
		ip         : req.headers['x-forwarded-for'] instanceof Array ? req.headers['x-forwarded-for'][1] : req.headers['x-forwarded-for'],
		user_agent : req.headers['user-agent'],
		created_at : new Date()
	}

	var docToBePersisted = new collections.tracker_summaries(summaryDoc)

	docToBePersisted.save(function(err){
		if (err) {
			sendMail(
			  'Bert\'s Main App', 
			  'guilherme.bertero@gmail.com', 
			  'MongoDB saving error - ' + strftime("%Y/%m/%d", new Date()), 
			  JSON.stringify(summaryDoc) + '\n\n\n' + err,
			  function(error, body){
			  	log(error)
			  	log(body)
			  }
			)
		}
	})

}