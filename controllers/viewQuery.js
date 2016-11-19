const commonFunctions = require('../functions/common')
const log             = commonFunctions.log
const u               = require('underscore')
const filter          = commonFunctions.filter
const findDoc         = require('../functions/mongo').find

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

function createQuery(body) {
	var query = {}
	switch (body.viewType) {
		case 'clientes':
			query = {
				_id          : body.id,
				nome_contato : body.nomeContato,
				nome_empresa : body.nomeEmpresa,
				email        : body.email,
				cnpj         : body.cnpj
			}
			break

		case 'filiais':
			query = {
				_id         : body.id,
				nome        : body.nome,
				cidade_base : body.cidadeBase,
			}
			break

		case 'funcionarios':
			query = {
				_id   : body.id,
				nome  : body.nome,
				email : body.email,
				rg    : body.rg,
				cpf   : body.cpf
			}
			break

		case 'pedidos':
			query = {
				_id : body.id
			}
			break

		case 'produtos':
			query = {
				_id  : body.id,
				nome : body.nome
			}
			break
	}
	return u.compact(query)
}