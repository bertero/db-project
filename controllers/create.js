const commonFunctions = require('../functions/common')
const log             = commonFunctions.log
const u               = require('underscore')
const filter          = commonFunctions.filter
const createDoc       = commonFunctions.createMongoJson
const persistDoc      = require('../functions/mongo').persistNew

module.exports = function (req, res) {
	const body = req.body

	persistDoc(body.viewType, createDoc(body), function (err, result) {
			if (err) {
				log(err)
				return res
				.status(200)
				.render('../views/error.ejs', {
					type : 500, 
					message : 'Ocorreu um problema com a criação do documento, por favor tente novamente!' 
				})
			}

			log(result)

			const id   = result._id

			result = u.omit(result, '_id')
			result = u.omit(result, '__v')
			result = u.omit(result, 'senha')
			result = u.omit(result, 'created_at')

			res.status(200).render('../views/viewQuery.ejs', { type : body.viewType, id : id, results : result })
		})
}