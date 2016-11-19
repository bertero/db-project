const mongoose        = require('mongoose')
const commonFunctions = require('./common.js')
const log             = commonFunctions.log
const u               = require('underscore')
const schemas         = require('../assets/mongoSchemas')
const ObjectId        = mongoose.Schema.Types.ObjectId

var uri = 'mongodb://<dbuser>:<dbpassword>@ds023714.mlab.com:23714/main_first'
uri     = uri.replace('<dbuser>',     process.env.MONGO_MAIN_USER)
uri     = uri.replace('<dbpassword>', process.env.MONGO_MAIN_PASSWORD)

var db          = mongoose.createConnection(uri)

module.exports = {
	connect       : connect,
	collections   : {},
	persistNew    : persistNewDoc,
	persistUpdate : persistUpdatedDoc,
	find          : findDoc,
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

function persistNewDoc(collection, data, callback) {

	data.created_at = new Date()

	const docToBePersisted = new module.exports.collections[collection](data)

	docToBePersisted.save(callback)

}

function persistUpdatedDoc(collection, id, data, callback) {

	module.exports.collections[collection].update({ _id : id}, data).exec(callback)

}

function findDoc(collection, query, infoRequested, callback) {

	if (!query)         query         = {}
	if (!infoRequested) infoRequested = {}

	module.exports.collections[collection]
		.find(query, infoRequested)
		.lean(true)
		.exec(callback)
}