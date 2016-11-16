const commonFunctions = require('../functions/common')
const log             = commonFunctions.log
const u               = require('underscore')
const filter          = commonFunctions.filter
const findDoc         = require('../functions/mongo').findDoc

module.exports = function (req, res) {
	const body = filter(req.body)

	findDoc(body.viewType, createQuery(body), null, function (err, results) {
		if (err) return res.send(500)
		res.render('../views/viewQuery.ejs', { type : body.viewType, results : results[0] })
	})
}

function createQuery(body) {
	switch (body.viewType) {
		case 'clientes':
			return {
				_id          : body.id,
				nome_contato : body.nomeContato,
				nome_empresa : body.nomeEmpresa,
				email        : body.email,
				cnpj         : body.cnpj
			}
			break

		case 'filiais':
			return {
				_id         : body.id,
				nome        : body.nome,
				cidade_base : body.cidadeBase,
			}
			break

		case 'funcionarios':
			return {
				_id   : body.id,
				nome  : body.nome,
				email : body.email,
				rg    : body.rg,
				cpf   : body.cpf
			}
			break

		case 'pedidos':
			return {
				_id : body.id
			}
			break

		case 'produtos':
			return {
				_id  : body.id,
				nome : body.nome
			}
			break
	}
}