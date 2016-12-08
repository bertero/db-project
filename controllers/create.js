const commonFunctions = require('../functions/common')
const log             = commonFunctions.log
const u               = require('underscore')
const filter          = commonFunctions.filter
const createDoc       = require('../functions/mongo').createJson
const persistDoc      = require('../functions/mongo').persistNew

module.exports = function (req, res) {
	const body = req.body

	createDoc(body, true, function (err, doc) {
		if (err) {
			log(err)
			return res
			.status(200)
			.render('../views/error.ejs', {
				type : 500, 
				message : 'Ocorreu um problema com a criação do documento, por favor tente novamente!'
			})
		}
		persistDoc(body.viewType, doc, function (err, result) {
				if (err) {
					log(err)
					return res
					.status(200)
					.render('../views/error.ejs', {
						type : 500, 
						message : 'Ocorreu um problema com a criação do documento, por favor tente novamente!'
					})
				}

				result = JSON.parse(JSON.stringify(result))

				log(result)
				
				const id   = result._id

				if (body.viewType !== 'pedidos') result = u.omit(result, '_id')
				result = u.omit(result, '__v')
				result = u.omit(result, 'senha')
				result = u.omit(result, 'created_at')

				res.status(200).render('../views/viewQuery.ejs', { type : body.viewType, id : id, results : result })
			})
	})
}