const commonFunctions = require('../functions/common')
const log             = commonFunctions.log
const u               = require('underscore')
const findDoc         = require('../functions/mongo').find
const persistUpdate   = require('../functions/mongo').persistUpdate

module.exports = function (req, res) {
	const body       = req.body
	const collection = body.viewType
	const id         = body.id

	if (collection === 'pedidos') body.lista_produtos = JSON.parse(body.lista_produtos)

	body = cleanStrings(body)

	persistUpdate(collection, id, u.omit(body, 'viewType'), function (err) {
		if (err) return res
			.status(200)
			.render('../views/error.ejs', {
				type : 500, 
				message : 'Ocorreu um problema com a edição do documento, por favor tente novamente!' 
			})

		findDoc(collection, { _id : id }, null, function (err, results) {
			if (err) return res
				.status(200)
				.render('../views/error.ejs', {
					type : 500, 
					message : 'Ocorreu um problema com a edição do documento, por favor tente novamente!' 
				})

			const id   = results[0]._id

			results[0] = u.omit(results[0], '_id')
			results[0] = u.omit(results[0], '__v')
			results[0] = u.omit(results[0], 'senha')
			results[0] = u.omit(results[0], 'created_at')

			res.status(302).render('../views/viewQuery.ejs', { type : body.viewType, id : id, results : results[0] })
		})
	})

	
}

function cleanStrings(body) {
	u.each(body, function (value, key) {
		log('before: ' + value)
		if (key !== 'lista_produtos') {
			body[key] = value.replace(/"/g, '')
		}
		log('after: ' + body[key])
	})
}