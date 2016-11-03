const mongoose        = require('mongoose')
const commonFunctions = require('./common.js')
const log             = commonFunctions.log
const u               = require('underscore')
const schemas         = require('../assets/mongoSchemas')

var uri = 'mongodb://<dbuser>:<dbpassword>@ds023714.mlab.com:23714/main_first'
uri     = uri.replace('<dbuser>',     process.env.MONGO_MAIN_USER)
uri     = uri.replace('<dbpassword>', process.env.MONGO_MAIN_PASSWORD)

var db          = mongoose.createConnection(uri)

module.exports = {
	connect     : connect,
	collections : {},
	persist     : persistDoc
}

function connect(callback) {

	db.on('error', console.error.bind(console, 'connection error:'))

	db.once('open', function () {
	  
	  u.each(schemas, function (schema, collection) {

	  	module.exports.collections[collection] = db.model(collection, schema)

	  })

	  log("MongoDB Connected")
	  callback()

	})

}

function persistDoc(collection, data, callback) {
	
	const docToBePersisted = new collections[collection](data)

	docToBePersisted.save(function (err) {
		if (err) return callback(err)
		callback()
	})

}