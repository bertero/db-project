const commonFunctions = require('../functions/common')
const log             = commonFunctions.log
const u               = require('underscore')
const filter          = commonFunctions.filter
const findDoc         = require('../functions/mongo').find
const createQuery     = require('../functions/mongo').createJson

module.exports = function (req, res) {
	const body = filter(req.body)

	createQuery(body, false, function (err, query) {
		if (err) {
			log(err)
			return res
			.status(200)
			.render('../views/error.ejs', {
				type : 500, 
				message : 'Ocorreu um problema com a criação do documento, por favor tente novamente!'
			})
		}
		findDoc(body.viewType, query, null, function (err, results) {
				if (err) {
					log(err)
					return res
					.status(200)
					.render('../views/error.ejs', {
						type : 500, 
						message : 'Ocorreu um problema com a criação do documento, por favor tente novamente!'
					})
				}

				if (!results.length) 
					return res
					.status(200)
					.render('../views/error.ejs', {
						type : 400, 
						message : 'Nenhum documento foi encontrado, por favor revise sua pesquisa!' 
					})

				const id   = results[0]._id

				var result = JSON.parse(JSON.stringify(results[0]))

				result = u.omit(result, '_id')
				result = u.omit(result, '__v')
				result = u.omit(result, 'senha')
				result = u.omit(result, 'created_at')

				if (!u.keys(result).length) return res.status(500)

				res.status(200).render('../views/viewQuery.ejs', { type : body.viewType, id : id, results : result })
			})
	})
}