const commonFunctions = require('../functions/common')
const log             = commonFunctions.log
const u               = require('underscore')
const filter          = commonFunctions.filter
const createDoc       = commonFunctions.createMongoJson
const persistDoc      = require('../functions/mongo').persistNew

module.exports = function (req, res) {
	const body = req.body

	persistDoc(body.viewType, createDoc(body), function (err, results) {
			if (err) {
				log(err)
				return res.send(500)
			}

			log(results)
			res.send('ok')
			// const id   = results[0]._id

			// results[0] = u.omit(results[0], '_id')
			// results[0] = u.omit(results[0], '__v')
			// results[0] = u.omit(results[0], 'senha')
			// results[0] = u.omit(results[0], 'created_at')

			// res.status(302).render('../views/viewQuery.ejs', { type : body.viewType, id : id, results : results[0] })
		})
}