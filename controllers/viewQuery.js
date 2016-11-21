const commonFunctions = require('../functions/common')
const log             = commonFunctions.log
const u               = require('underscore')
const filter          = commonFunctions.filter
const findDoc         = require('../functions/mongo').find
const createQuery     = commonFunctions.createMongoJson

module.exports = function (req, res) {
	const body = filter(req.body)

	findDoc(body.viewType, createQuery(body), null, function (err, results) {
			if (err) return res.send(500)

			const id   = results[0]._id

			results[0] = u.omit(results[0], '_id')
			results[0] = u.omit(results[0], '__v')
			results[0] = u.omit(results[0], 'senha')
			results[0] = u.omit(results[0], 'created_at')

			res.status(302).render('../views/viewQuery.ejs', { type : body.viewType, id : id, results : results[0] })
		})
}